<?php

function field_value_rel($values, $key) {
	if (!empty(old($key))) {
		return old($key);
	}

	$expKey = explode('.', $key);

	switch(count($expKey)) {
		case 1 : 
			return (isset($values) && isset($values->$expKey[0]) ) ? 
			$values->$expKey[0] : ''; 
		break;
		case 2 : 
			return (isset($values) && isset($values->$expKey[0]) && isset($values->$expKey[0]->$expKey[1]) ) ? 
			$values->$expKey[0]->$expKey[1] : ''; 
		break;
		case 3 : 
			return (isset($values) && isset($values->$expKey[0]) && isset($values->$expKey[0]->$expKey[1]) && isset($values->$expKey[0]->$expKey[1]->$expKey[2]) ) ? 
			$values->$expKey[0]->$expKey[1]->$expKey[2] : ''; 
		break;
		case 4 : 
			return (isset($values) && isset($values->$expKey[0]) && isset($values->$expKey[0]->$expKey[1]) && isset($values->$expKey[0]->$expKey[1]->$expKey[2]) && isset($values->$expKey[0]->$expKeykey[1]->$expKey[2]->$expKey[3]) ) ? 
			$values->$expKey[0]->$expKey[1]->$expKey[2]->$expKey[3] : '';
		break;
	}

	if(!empty(session($key))) {
		return session($key);
	}

	return '';
}

function field_value($values, $key) {
	if(strpos('.', $key) > 0) {
		return field_value_rel($values, $key);
	}

	if (!empty(old($key))) {
		return old($key);
	} 

	if (isset($values) && isset($values->$key)) {
		return $values->$key;
	}

	if(!empty(session($key))) {
		return session($key);
	}

	return '';
}

function actions($id, $routes, $type = 'html') {
	$template = <<<HTM
	<div id="actions" style="float:left; height: 30px;">                                    
		<a data-id="{id}" href="{route.edit}" class="btn btn-primary" id="btn-grid-edit" name="btn-grid-edit" title="{{ __('messages.edit') }}">
			<i class="fa fa-pencil-square"></i>
		</a> &nbsp;
										
		<a data-id="{id}" class="btn btn-success" id="btn-grid-activate" name="btn-grid-activate"  title="{{ __('messages.activate') }}">
			<i class="fa fa-thumbs-up"></i>
		</a> &nbsp;
										
		<a data-id="{id}" class="btn btn-warning" id="btn-grid-inactivate" name="btn-grid-inactivate"  title="{{ __('messages.inactivate') }}">
			<i class="fa fa-thumbs-down"></i>
		</a> &nbsp;
										
		<a data-id="{id}" href="#" class="btn btn-inverse" id="btn-grid-delete" name="btn-grid-delete"  title="{{ __('messages.delete') }}">
			<i class="fa fa-trash"></i> 
		</a> &nbsp;                                    
	</div>
HTM;

$template_js = <<<TJS
	<script type="text/javascript">
		$(function(){
			// DELETE
			$('#actions > #btn-grid-delete').click(function(e) {
				e.preventDefault();
				var item = $(this);

				window.MessageBox.confirm(
                    "{deletetitle}",
                    "{deleteconfirmation}",
                    
                    function() {                    
                        app.showLoading();

                        $.ajax({
                            type: 'DELETE',
                            url: "{route.delete}?id=" + item.attr('data-id'),
                            dataType: 'json',
                            
							beforeSend: function(xhr) {
								xhr.setRequestHeader('X-RESPONSE-TYPE', 'json');
							},

                            success: function(result) {
                                app.hideLoading();
                                
                                window.MessageBox.alert(
                                    "{deletetitle}",
                                    result.message,
                                    {
                                        icon:  result.success ? window.MessageBox.SUCCESS : window.MessageBox.ERROR,
                                        height: 120,
                                        handler: function () {        
											if(result.success) {                                    
                                            	window.location.reload();
											}
                                        }
                                    }
                                );
                            },
                            
                            error: function(a,b,c) {
                                app.ajaxError(a,b,c);
                            }
                        }); 
                    } 
                );
			});

			//ACTIVATE
			$('#actions > #btn-grid-activate').click(function(e) {
				e.preventDefault();
				app.showLoading();
				var item = $(this);

				$.ajax({
					type: 'POST',
					url: "{route.activate}",
					dataType: 'json',

					data: {
						id: item.attr('data-id')
					},
					
					beforeSend: function(xhr) {
						xhr.setRequestHeader('X-RESPONSE-TYPE', 'json');
					},

					success: function(result) {
						app.hideLoading();
						
						window.MessageBox.alert(
							"{activatetitle}",
							result.message,
							{
								icon:  result.success ? window.MessageBox.SUCCESS : window.MessageBox.ERROR,
								height: 120,
								handler: function () {        
									if(result.success) {                                    
										window.location.reload();
									}
								}
							}
						);
					},
					
					error: function(a,b,c) {
						app.ajaxError(a,b,c);
					}
				}); 
			});

			//INACTIVATE
			$('#actions > #btn-grid-inactivate').click(function(e) {
				e.preventDefault();
				app.showLoading();
				var item = $(this);

				$.ajax({
					type: 'POST',
					url: "{route.inactivate}",
					dataType: 'json',

					data: {
						id: item.attr('data-id')
					},
					
					beforeSend: function(xhr) {
						xhr.setRequestHeader('X-RESPONSE-TYPE', 'json');
					},

					success: function(result) {
						app.hideLoading();
						
						window.MessageBox.alert(
							"{inactivatetitle}",
							result.message,
							{
								icon:  result.success ? window.MessageBox.SUCCESS : window.MessageBox.ERROR,
								height: 120,
								handler: function () {        
									if(result.success) {                                    
										window.location.reload();
									}
								}
							}
						);
					},
					
					error: function(a,b,c) {
						app.ajaxError(a,b,c);
					}
				}); 
			});
		});
	</script>
TJS;
	
	switch($type) {
		case 'html':
			$html = str_replace('{id}', $id, $template);
			$html = str_replace('{route.edit}', route($routes['edit'], [ 'id' => $id ]), $html);

			return $html;

		case 'js':
			$js = str_replace('{deletetitle}', __('messages.deletetitle'), $template_js);
			$js = str_replace('{activatetitle}', __('messages.activatetitle'), $js);
			$js = str_replace('{inactivatetitle}', __('messages.inactivatetitle'), $js);
			$js = str_replace('{deleteconfirmation}', __('messages.deleteconfirmation'), $js);
			$js = str_replace('{route.delete}', route($routes['delete']), $js);
			$js = str_replace('{route.activate}', route($routes['activate']), $js);
			$js = str_replace('{route.inactivate}', route($routes['inactivate']), $js);

			return $js;			

		case 'both':
			$html = str_replace('{id}', $id, $template);
			$html = str_replace('{route.edit}', route($routes['edit'], [ 'id' => $id ]), $html);

			$js = str_replace('{deletetitle}', __('messages.deletetitle'), $template_js);
			$js = str_replace('{activatetitle}', __('messages.activatetitle'), $js);
			$js = str_replace('{inactivatetitle}', __('messages.inactivatetitle'), $js);
			$js = str_replace('{deleteconfirmation}', __('messages.deleteconfirmation'), $js);
			$js = str_replace('{route.delete}', route($routes['delete']), $js);
			$js = str_replace('{route.activate}', route($routes['activate']), $js);
			$js = str_replace('{route.inactivate}', route($routes['inactivate']), $js);
			
			return [
				'html' => $html,
				'js' => $js
			];

		default:
			return null;
	}
}

function status($status) {
	$template = <<<HTM
	<td style="width: 60px; text-align:center;">
    	{status}
    </td>
HTM;

	$statustext = ($status !== 'A' ? __('messages.statusinactivate') : __('messages.statusactivate'));
	$html = str_replace('{status}', $statustext, $template);	
	return $html;
}

function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
	$val = substr($val,0,-1);
    switch($last) 
    {
        case 'g':
        	$val *= 1073741824;
		break;
        case 'm':
        	$val *= 1048576;
		break;
        case 'k':
        	$val *= 1024;
		break;
    }
    return $val;
}

function max_file_upload_in_bytes() {
    //select maximum upload size
    $max_upload = return_bytes(ini_get('upload_max_filesize'));

    //select post limit
    $max_post = return_bytes(ini_get('post_max_size'));

    //select memory limit
    $memory_limit = return_bytes(ini_get('memory_limit'));
	
	// $memory_limit = 1073741824;
    // return the smallest of them, this defines the real limit
    return min($max_upload, $max_post, $memory_limit) - 65536;
}

function nome_cultivar($cultivar) {
	$nome = "";

	if($cultivar->germoplasma) {
		if($cultivar->germoplasma->obtentor) {
			if($cultivar->germoplasma->obtentor->sigla) {
				$nome = $nome . $cultivar->germoplasma->obtentor->sigla;
			} else {
				$nome = $nome . $cultivar->germoplasma->obtentor->nm_pessoa;
			}
		}
		
		$nome = $nome . " " . $cultivar->germoplasma->nm_germoplasma . " ";
	}

	if($cultivar->biotecnologia) {
		$nome = $nome . $cultivar->biotecnologia->nm_biotecnologia;
	}

	return $nome;
}