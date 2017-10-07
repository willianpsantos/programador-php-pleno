(function($) {
    var BEFORESAVE = "beforeSave",
        AFTERSAVE = "afterSave",
        BEFOREDELETE = "beforeDelete",
        AFTERDELETE = "afterDelete",
        DATABINDING = "dataBinding",
        DATABOUND = "dataBound",
        INIT = "init",
        BEFORERENDER = "beforeRender",
        AFTERRENDER = "afterRender",
        BEFOREACTIVATE = "beforeActivate",
        AFTERACTIVATE = "afterActivate",
        BEFOREINACTIVATE = "beforeInactivate",
        AFTERINACTIVATE = "afterInactivate",
        BEFOREAPPROVE = "beforeApprove",
        AFTERAPPROVE = "afterApprove",
        CANCEL = "cancel",
        EDIT = "edit",
        INSERT = "insert";    
            
    require(['app', 'kendo'], function(app, kendo) {
        
        var Widget = kendo.ui.Widget;
        
        window.Form = Widget.extend({
            templates: {
                group: '<div class="container-fluid container-group"> ' +
                       '    <div class="widget {colorcssclass}"> ' +
                       '        <div class="widget-title group-title font-white"> ' +
                       '            <h4> ' +
                       '                <i class="{icon}"></i> ' +
                       '                {grouptitle} ' +
                       '            </h4> ' +
                       '        </div> ' +

                       '        <div class="widget-body group-body"> ' +                                              
                       '        </div> ' +
                       '    </div> ' +
                       '</div>',

                form: '<div class="form-vertical"></div>',
                
                row: '<div class="row-fluid"></div>',
                
                control: '<div class="span{span}" {permission} {approvation_visible}> ' +
                         '    <div class="control-group"> ' +
                         '        <label class="control-label {.required}">{title}</label> ' +
                         
                         '        <div class="controls controls-row"> ' +
                         '            <input type="{type}" class="input-block-level" id="{id}" {editor} {value-primitive} {text-field} {value-field} {required} {maxlength} {format} {validator} {min} {max} {table} data-bind="{binder}: {field}, enabled: {editable} {datasource}" /> ' +
                         '        </div> ' +
                         '    </div> ' +
                         '</div>',
                 
                controlText: '<div class="span{span}" {permission} {approvation_visible}> ' +
                             '    <div class="control-group"> ' +
                             '        <label class="control-label {.required}">{title}</label> ' +
                             
                             '        <div class="controls controls-row"> ' +
                             '            <textarea style="width:100%; height: 100px;" id="{id}" {editor} {value-primitive} {text-field} {value-field} {required} {validator} {table} data-bind="value: {field}, enabled: {editable} {datasource}"></textarea> ' +
                             '        </div> ' +
                             '    </div> ' +
                             '</div>',
                 
                buttonsWhenEnabled : '<div class="row-fluild buttons center-block" data-bind="visible: formEnabled"> ' +  
                                    '    <a id="btnSave" class="icon-btn btn-primary span2" href="#" data-bind="visible: showSaveButton, events: { click: save }"> ' +
                                    '        <i class="fa fa-floppy-o"></i> ' +
                                    '        <div> {savebutton} </div> <br>' +
                                    '    </a> ' +
                          
                                    '    <a id="btnCancel" class="icon-btn btn-danger span2" href="#" data-bind="visible: showCancelButton, events: { click: cancel }"> ' +
                                    '        <i class="fa fa-ban"></i> ' +
                                    '        <div> {cancelbutton} </div> <br> ' +
                                    '    </a> &nbsp;' +
                                    '</div>',
                            
                buttonsWhenDisabled : '<div class="row-fluild buttons center-block" data-bind="invisible: formEnabled"> ' +  
                                      '    <a id="btnEdit" class="icon-btn btn-primary span2" href="#" data-bind="visible: showEditButton, events: { click: edit }"> ' +
                                      '        <i class="fa fa-floppy-o"></i> ' +
                                      '        <div> {editbutton} </div> <br>' +
                                      '    </a> ' +
                           
                                      '    <a id="btnDelete" class="icon-btn btn-danger span2" href="#" data-bind="visible: showDeleteButton, events: { click: delete }"> ' +
                                      '        <i class="fa fa-times"></i> ' +
                                      '        <div> {deletebutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      
                                      '    <a id="btnActivate" class="icon-btn btn-success span2" href="#" data-bind="visible: showActivateButton, events: { click: activate }"> ' +
                                      '        <i class="fa fa-check-circle"></i> ' +
                                      '        <div> {activatebutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      
                                      '    <a id="btnInactivate" class="icon-btn btn-warning span2" href="#" data-bind="visible: showInactivateButton, events: { click: inactivate }"> ' +
                                      '        <i class="fa fa-ban"></i> ' +
                                      '        <div> {inactivatebutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      
                                      '    <a id="btnApprove" class="icon-btn btn-success span2" href="#" data-bind="visible: showApproveButton, events: { click: approve }"> ' +
                                      '        <i class="fa fa-thumbs-up"></i> ' +
                                      '        <div> {approvebutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      
                                      '    <a id="btnVerify" class="icon-btn btn-info span2" href="#" data-bind="visible: showVerifyButton, events: { click: approve }"> ' +
                                      '        <i class="fa fa-check"></i> ' +
                                      '        <div> {verifybutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      
                                      '    <a id="btnDisapprove" class="icon-btn btn-warning span2" href="#" data-bind="visible: showDisapproveButton, events: { click: disapprove }"> ' +
                                      '        <i class="fa fa-thumbs-down"></i> ' +
                                      '        <div> {disapprovebutton} </div> <br> ' +
                                      '    </a> &nbsp;' +
                                      '</div>'         
            },
            
            options:  {
                name: 'Form',                
                model: undefined,
                rows: undefined,
                initEnabled: false,

                saveButtonText: app.translate('saveButton'),
                cancelButtonText: app.translate('cancelButton'),
                editButtonText: app.translate('editButton'),
                deleteButtonText: app.translate('deleteButton'),
                activateButtonText: app.translate('activateButton'),
                inactivateButtonText: app.translate('inactivateButton'),
                approveButtonText: app.translate('approveButton'),
                disapproveButtonText: app.translate('disapproveButton'),
                verifyButtonText: app.translate('verifyButton'),
                
                showSaveButton: true,
                showEditButton: true,                
                showDeleteButton: true,                
                showCancelButton: true,
                showActivateButton: true,
                showInactivateButton: true,
                showApproveButton: false,
                showDisapproveButton: false,
                showVerifyButton: false,

                fetchAllDropDownListOnEdit: true,
                fetchAllDropDownListOnInsert: true,
                
                statusField: 'situacao',
                
                status: {
                    active: 'A',
                    inactive: 'I'
                },
                
                approvation: false,
                approvationField: 'aprovado',
                negativeField: 'idnegativa_cadastro',
                reasonField: 'motivo_reprovacao',
                
                approvationStatus: {
                    approve: 'S',
                    disapprove: 'N',
                    pendent: 'P'
                },
                
                url: {
                    save: undefined,
                    delete: undefined,
                    activate: undefined,
                    inactivate: undefined,
                    approve: undefined,
                    disapprove: undefined
                },
                
                dotReplaceChar: 'Z',
                messages: app.translate('formMessages')
            },
            
            _events: [
                BEFORESAVE,
                AFTERSAVE,
                DATABINDING,
                DATABOUND,
                INIT,
                BEFORERENDER,
                AFTERRENDER,
                BEFOREDELETE,
                AFTERDELETE,
                CANCEL,
                EDIT,
                INSERT,
                BEFOREACTIVATE,
                AFTERACTIVATE,
                BEFOREINACTIVATE,
                AFTERINACTIVATE,
                BEFOREAPPROVE,
                AFTERAPPROVE
            ],
            
            createModel: function(item) {
                var that = this;
                return new that.options.model(item);                    
            },
            
            dataItem: function() {      
                var that = this;
                
                if(that.observableObject)
                    return that.observableObject;        
                
                that.observableObject = kendo.observable(that.model.toJSON());
                return that.observableObject;
            },
            
            treatNumberFields: function(item) {
                var that = this;
                
                if(!that.numberFields || that.numberFields.length === 0) {
                   return item;
               }
               
               var isfloat = false;
               
               for(var i = 0; i < that.numberFields.length; i++) {
                   var nField = that.numberFields[i],
                       number = item[nField.field];
               
                   if(!number) 
                       continue;
                   
                   var strNumber = "",
                       newNumber;
                   
                   strNumber = number.toString();
                   
                   if(strNumber.indexOf('.') > 0) {
                       isfloat = true;
                   }
                    
                   newNumber = strNumber.replace(',', '.');   
                                      
                   item[nField.field] = isfloat ?  parseFloat(newNumber).toFixed(nField.decimals ? nField.decimals : 2) : parseInt(newNumber);
               }
               
               return item;
            },
            
            prepareToPost: function(item) {
               var that = this,
                   regex = /^inner|Enabled$|Values$|Visible$/i;
               
               for(var i in item) {
                   if(regex.test(i)) {
                       delete item[i];
                   }
                   
                   var value = item[i];
                   
                   if(value instanceof Date && value.toJSON) {
                       item[i] = value.toJSON();
                   }
               }
               
               delete item.showSaveButton;
               delete item.showEditButton;
               delete item.showDeleteButton;
               delete item.showCancelButton;
               delete item.showActivateButton;
               delete item.showInactivateButton;
               delete item.showApproveButton;
               delete item.showVerifyButton;
               delete item.showDisapproveButton;
               
               return that.treatNumberFields(item);
            },
            
            save: function() {
                var that = this;
                
                if(!that.validate()) {
                    return;
                }
                
                var dataItem = that.dataItem();

                if(that.innerViewModels) {
                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];

                        if(vm && vm.flushItems) {
                            vm.flushItems(dataItem);
                        }
                    }
                }
                
                that.trigger(BEFORESAVE, { item: dataItem });
                app.showLoading();
                
                var successCallback = function(result) {
                    app.hideLoading();

                    if(result.success) {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            that.options.messages.save,
                            {
                                icon: window.MessageBox.SUCCESS,
                                height: 120,
                                handler: function () {                                    
                                    that.bindDataItem(result.entity);
                                    that.disable();                                    
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                    that.operation = "reading";
                                    app.hideLoading();
                                }
                            }
                        );
                    } 
                    else {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            result.message ? result.message : that.options.messages.error,
                            {
                                icon: window.MessageBox.ERROR,
                                height: 120,
                                handler: function () {
                                    app.hideLoading();
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                }
                            }
                        );
                    }
                };
                
                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    if(editor.enabled) {
                        if(!editor.options.url) {
                            editor.options.url = {};
                        }
                        
                        editor.options.url.save = that.options.url.save;
                        editor.options.model = that.options.model;

                        editor.save({
                            dataItem: that.prepareToPost(dataItem.toJSON()),
                            callback: successCallback
                        });
                        
                        return;
                    }
                }
                
                $.ajax({
                    type: 'POST',
                    url: that.options.url.save,
                    dataType: 'json',                    
                    
                    data: {
                        data: that.prepareToPost(dataItem.toJSON())
                    },
                    
                    success: successCallback,
                    
                    error: function(a,b,c) {                        
                        app.ajaxError(a,b,c);
                    }
                });
            },
            
            delete: function() {
                var that = this,
                    dataItem = that.dataItem();
                            
                that.operation = "deleting";
                that.trigger(BEFOREDELETE, { item: dataItem.toJSON() });
            
                window.MessageBox.confirm(
                    that.options.messages.deleteTitle,
                    that.options.messages.deleteConfirmation,
                    
                    function() {
                        that.trigger(BEFOREDELETE, { item: dataItem });
                        app.showLoading();

                        $.ajax({
                            type: 'DELETE',
                            url: that.options.url.delete + '?id=' + dataItem.get(that.model.idField),
                            dataType: 'json',
                            
                            success: function(result) {
                                app.hideLoading();
                                
                                window.MessageBox.alert(
                                    that.options.messages.deleteTitle,
                                    result.message ? result.message : that.options.messages.error,
                                    {
                                        icon: result.success ? window.MessageBox.SUCCESS : window.MessageBox.ERROR,
                                        height: 120,
                                        handler: function () {                                            
                                            that.trigger(AFTERDELETE, { item: dataItem.toJSON(), result: result });
                                            that.operation = "reading";
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
            },
            
            activate: function() {
                var that = this,
                    dataItem = that.dataItem();            
                          
                that.operation = "activating";
                that.trigger(BEFOREACTIVATE, { item: dataItem });
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: that.options.url.activate,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(that.model.idField)
                    },
                            
                    success: function(result) {
                        app.hideLoading();
                                
                        if(result.success) {
                            window.MessageBox.alert(
                                that.options.messages.activateTitle,
                                that.options.messages.activate,
                                {
                                    icon: window.MessageBox.SUCCESS,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.active);
                                        that.trigger(AFTERACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                        that.toggleButtons(dataItem);
                                    }
                                }
                            );
                        }
                        else {
                            window.MessageBox.alert(
                                that.options.messages.activateTitle,
                                result.message ? result.message : that.options.messages.error,
                                {
                                    icon: window.MessageBox.ERROR,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.inactive);
                                        that.trigger(AFTERACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                        that.toggleButtons(dataItem);
                                    }
                                }
                            );                            
                        }
                    },
                            
                    error: function(a,b,c) {
                        app.ajaxError(a,b,c);
                    }
                }); 
            },
            
            inactivate: function() {
                var that = this,
                    dataItem = that.dataItem();            
                          
                that.operation = "inactivating";
                that.trigger(BEFOREINACTIVATE, { item: dataItem });
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: that.options.url.inactivate,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(that.model.idField)
                    },
                            
                    success: function(result) {
                        app.hideLoading();
                                
                        if(result.success) {
                            window.MessageBox.alert(
                                that.options.messages.inactivateTitle,
                                that.options.messages.inactivate,
                                {
                                    icon: window.MessageBox.SUCCESS,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.inactive);
                                        that.trigger(AFTERINACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                        that.toggleButtons(dataItem);
                                    }
                                }
                            );
                        }
                        else {
                            window.MessageBox.alert(
                                that.options.messages.inactivateTitle,
                                result.message ? result.message : that.options.messages.error,
                                {
                                    icon: window.MessageBox.ERROR,
                                    height: 120,
                                    handler: function () {
                                        dataItem.set(that.options.statusField, that.options.status.active);
                                        that.trigger(AFTERINACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                        that.toggleButtons(dataItem);
                                    }
                                }
                            );                            
                        }
                    },
                            
                    error: function(a,b,c) {
                        app.ajaxError(a,b,c);
                    }
                });                 
            },
            
            approve: function() {
                var that = this,
                    dataItem = that.dataItem();            
                          
                that.operation = "approving";
                that.trigger(BEFOREAPPROVE, { item: dataItem });
                app.showLoading();

                var fnCallback = function(result) {
                    app.hideLoading();

                    if(result.success) {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            that.options.messages.save,
                            {
                                icon: window.MessageBox.SUCCESS,
                                height: 120,
                                handler: function () {                                    
                                    that.bindDataItem(result.entity);
                                    that.disable();                                    
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                    that.operation = "reading";
                                    app.hideLoading();
                                }
                            }
                        );
                    } 
                    else {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            result.message ? result.message : that.options.messages.error,
                            {
                                icon: window.MessageBox.ERROR,
                                height: 120,
                                handler: function () {
                                    app.hideLoading();
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                }
                            }
                        );
                    }
                };

                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    
                    if(!editor.options.url) {
                        editor.options.url = {};
                    }
                    
                    editor.options.url.save = that.options.url.approve;
                    editor.options.model = that.options.model;

                    editor.save({
                        dataItem: that.prepareToPost(dataItem.toJSON()),
                        callback: fnCallback
                        
                    });
                    
                    return;
                }

                $.ajax({
                    type: 'POST',
                    url: that.options.url.approve,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(that.model.idField),
                        iddocumento: dataItem.get('iddocumento')
                    },
                            
                    success: fnCallback,
                            
                    error: function(a,b,c) {
                        app.ajaxError(a,b,c);
                    }
                });
            },

            clone: function(id) {
                var that = this,
                    dataItem = that.dataItem();            
                          
                that.operation = "clonning";
                app.showLoading();

                var fnCallback = function(result) {
                    app.hideLoading();

                    if(result.success) {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            that.options.messages.save,
                            {
                                icon: window.MessageBox.SUCCESS,
                                height: 120,
                                handler: function () {                                    
                                    that.bindDataItem(result.entity);
                                    that.disable();                                    
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                    that.operation = "reading";
                                    app.hideLoading();
                                }
                            }
                        );
                    } 
                    else {
                        window.MessageBox.alert(
                            that.options.messages.saveTitle,
                            result.message ? result.message : that.options.messages.error,
                            {
                                icon: window.MessageBox.ERROR,
                                height: 120,
                                handler: function () {
                                    app.hideLoading();
                                    that.trigger(AFTERSAVE, { item: dataItem, result: result });
                                }
                            }
                        );
                    }
                };

                var args = {
                    filter: {
                        logic: 'and',
                        filters: [
                            {
                                field: that.model.idField,
                                operator: 'eq',
                                value: id
                            }
                        ]
                    }
                };

                args[that.model.idField] = id;

                $.ajax({
                    type: 'POST',
                    url: that.options.url.clone,
                    dataType: 'json',
                    
                    data: args,
                            
                    success: fnCallback,
                            
                    error: function(a,b,c) {
                        app.ajaxError(a,b,c);
                    }
                });
            },
            
            disapprove: function() {
                var that = this,
                    element = $('div#disapprove-popup'),
                    popup;
                
                if(element.length > 0) {
                    var popup = element.data('kendoReprovacaoPopup');
                    
                    if(popup) {
                        popup.destroy();
                    }
                    
                    element.each(function() {
                        this.remove();
                    });
                }
                
                element = $('<div id="disapprove-popup"></div>').appendTo( $('body') );
                
                var dataItem = that.dataItem();
                
                popup = element.kendoReprovacaoPopup({
                    id: dataItem.get(that.model.idField),                    
                    url: that.options.url.disapprove,
                    
                    afterDisapprove: function(e) {
                        if(!e.result.success) {
                            return;
                        }
                        
                        dataItem.set(that.options.approvationField, that.options.approvationStatus.disapprove);
                        dataItem.set(that.options.negativeField, e.item.negative);
                        dataItem.set(that.options.reasonField, e.item.reason);
                        that.toggleButtons(dataItem);
                    }
                }).data('kendoReprovacaoPopup');
                
                popup.center().open();
            },

            removeAllErrors: function() {
                var that = this,
                    items = that.formElement.find('[data-required], [data-validator], .k-grid.k-error');

                items.each(function() {                    
                    var item = $(this);

                    if(item.is('[data-previous-validated]')) {
                        return;
                    }

                    app.removeClassError(item);
                    app.removeIconError(item);
                });                
            },
            
            performEdit: function(){
                var that = this;
                that.removeAllErrors();
                that.operation = 'updating';

                if(that.options.fetchAllDropDownListOnEdit === undefined || that.options.fetchAllDropDownListOnEdit === true) {
                    that.fetchAllDropDownList();
                }

                that.enable();

                if(that.innerViewModels) {
                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];

                        if(!vm.options) {
                            continue;
                        }

                        switch(vm.options.formMode) {
                            case 'inner':
                                vm && vm.form && vm.form.performInsert();
                                vm && vm.grid && vm.grid.showColumn('actions');
                                break;
                            case 'popup':
                                vm && vm.newButton && vm.newButton.show();
                                vm && vm.grid && vm.grid.showColumn('actions');
                                break;
                        }                        
                    }
                }

                that.trigger(EDIT);
            },
            
            performCancel: function(){
                var that = this;
                var items = that.formElement.find('[data-previous-validated]');
                items.removeAttr('data-previous-validated');
                that.operation = "cancelling";
                that.removeAllErrors();         
                that.disable();                                
                that.bindDataItem(that.backupObject);

                if(that.innerViewModels) {
                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];
                        vm && vm.newButton && vm.newButton.hide();
                        vm && vm.grid && vm.grid.hideColumn('actions'); 
                    }
                }

                that.trigger(CANCEL);
                that.operation = "reading";
            },
            
            performInsert: function() {
                var that = this; 
                that.removeAllErrors();
                that.operation = "inserting"; 
                
                if(that.options.fetchAllDropDownListOnInsert === undefined || that.options.fetchAllDropDownListOnInsert === true) {
                    that.fetchAllDropDownList();
                }

                that.bindDataItem();
                that.enable();

                if(that.innerViewModels) {
                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];

                        if(!vm.options) {
                            continue;
                        }

                        switch(vm.options.formMode) {
                            case 'inner':
                                vm && vm.form && vm.form.performInsert();
                                vm && vm.grid && vm.grid.showColumn('actions');
                                break;
                            case 'popup':
                                vm && vm.newButton && vm.newButton.show();
                                vm && vm.grid && vm.grid.showColumn('actions');
                                break;
                        }
                    }
                }

                that.trigger(INSERT);
            },
            
            prepare: function(item){
                var that = this,
                    rows = that.options.rows;
                    
                var fields = that.model.fields,                
                    dataItem = that.dataItem(),
                    permissions = [],
                    masks = [];

                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = fields[s.field],
                                type, editor;

                            if(s.field.indexOf('.') > 0) {
                                var parts = s.field.split('.'),
                                    first = parts[0];

                                field = fields[parts[0]];

                                if(!dataItem.get(parts[0])) {
                                    dataItem.set(parts[0], field.defaultValue);
                                }
                            }

                            if(field.type === 'array') {
                                var vm = that.innerViewModels[s.field];

                                var innerName = vm.getInnerName(),
                                    innerItem = vm.dataItem();

                                dataItem.set(innerName, innerItem);
                                return;                               
                            }  
                        
                            var valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Enabled';                        
                            dataItem.set('formEnabled', that.options.initEnabled);  

                            var functionName = 'fn' + valuesName,
                                readOnly = (s.readOnly === true || field.readOnly === true),
                                editable = ((s.editable === undefined || s.editable === true) ||
                                            (field.editable === undefined || field.editable === true));
                                
                            if(!readOnly) {
                                dataItem.set(valuesName, editable);
                                
                                dataItem.set(functionName, new Function(
                                '    var name = "' + valuesName + '"; ' +
                                '    return this.get(name) && this.get("formEnabled"); '
                                ));
                            }
                            else {
                                dataItem.set(valuesName, false);
                            }
                            
                            dataItem.set('fnApprovationVisible', function() {
                                if(!that.options.approvation) {
                                    return false;
                                }
                                    
                                var value = dataItem.get(that.options.approvationField);                                
                                return value === that.options.approvationStatus.disapprove;
                            });                                
                            
                            if(s.values && s.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, s.values);
                            }
                            else if(field.values && field.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, field.values);
                            }
                        });
                    });
                };
            
                prepareRows(rows);

                if(that.numberFields && that.numberFields.length > 0) {
                    for(var i = 0; i < that.numberFields.length; i++) {
                        var nField = that.numberFields[i],
                            editor = that.getEditor(nField.field);

                        editor.options.decimals = nField.decimals ? nField.decimals : 2;
                        editor.options.currency = nField.currency ? nField.currency : "R$";
                        editor.options.onlyNumbers = nField.onlyNumbers ? nField.onlyNumbers : false;
                        editor.options.allowMinus = nField.allowMinus ? nField.allowMinus : false;
                        editor.options.min = nField.min ? nField.min : -99999999999999;
                        editor.options.max = nField.max ? nField.max : 99999999999999;
                    }
                }

                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    editor.options.multiple = that.uploadFieldConfig.multiple;
                }

                dataItem.set('showSaveButton', that.options.showSaveButton);
                dataItem.set('showEditButton', that.options.showEditButton);
                dataItem.set('showDeleteButton', that.options.showDeleteButton);
                dataItem.set('showCancelButton', that.options.showCancelButton);
                dataItem.set('showActivateButton', that.options.showActivateButton);
                dataItem.set('showInactivateButton', that.options.showInactivateButton);
                dataItem.set('showApproveButton', (that.options.approvation && that.options.showApproveButton));
                dataItem.set('showVerifyButton', (that.options.approvation && that.options.showVerifyButton));
                dataItem.set('showDisapproveButton', (that.options.approvation && that.options.showDisapproveButton));
                
                dataItem.set('save', $.proxy(that.save, that));
                dataItem.set('edit', $.proxy(that.performEdit, that));
                dataItem.set('delete', $.proxy(that.delete, that));
                dataItem.set('cancel', $.proxy(that.performCancel, that));
                dataItem.set('activate', $.proxy(that.activate, that));
                dataItem.set('inactivate', $.proxy(that.inactivate, that));
                dataItem.set('approve', $.proxy(that.approve, that));
                dataItem.set('verify', $.proxy(that.verify, that));
                dataItem.set('disapprove', $.proxy(that.disapprove, that));
            },
            
            bindDataItem: function(item) {                
                var that = this; 

                that.observableObject = undefined;
                that.backupObject = undefined;
                kendo.unbind(that.formElement);
                
                that.model = that.createModel(item);
                that.observableObject = kendo.observable(that.model.toJSON());
                that.backupObject = that.observableObject;
                
                that.prepare();  
                that.trigger(DATABINDING, { sender: that, dataItem: that.observableObject});
                kendo.bind(that.formElement, that.observableObject);

                if(that.innerViewModels) {
                    var formEnabled = that.observableObject.get('formEnabled');

                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];

                        if(vm && vm.loadItems) {
                            vm.loadItems(that.observableObject.get(i)); 

                            switch(vm.options.formMode) {
                                case 'inner':
                                    vm && vm.form && vm.form.clear();

                                    if(formEnabled) {
                                        vm && vm.form && vm.form.enable();
                                    }
                                    else {
                                        vm && vm.form && vm.form.disable();
                                    }
                                    break;

                                case 'popup':
                                    if(formEnabled) {
                                        vm && vm.newButton && vm.newButton.show();
                                    }
                                    else {
                                        vm && vm.newButton && vm.newButton.hide();
                                    }
                                    break;
                            }                            
                        }
                    }
                }                
                
                that.toggleButtons(that.observableObject);
                that.trigger(DATABOUND, { sender: that, dataItem: that.observableObject });
            },
            
            toggleButtons: function(dataItem) {
                var that = this,
                    formEnabled = dataItem.get('formEnabled'),
                    status = dataItem.get(that.options.statusField),
                    approvation = dataItem.get(that.options.approvationField);
                
                if(formEnabled === false) {
                    switch(status) {
                        case that.options.status.active:
                            that.formElement.find('.buttons > #btnActivate').addClass('hidden');
                            that.options.showInactivateButton && that.formElement.find('.buttons > #btnInactivate').removeClass('hidden');
                            that.options.showEditButton && that.formElement.find('.buttons > #btnEdit').removeClass('hidden');
                            that.options.showDeleteButton && that.formElement.find('.buttons > #btnDelete').removeClass('hidden');
                            break;
                        case that.options.status.inactive:
                            that.formElement.find('.buttons > #btnInactivate').addClass('hidden');
                            that.options.showEditButton && that.formElement.find('.buttons > #btnEdit').addClass('hidden');
                            that.options.showDeleteButton && that.formElement.find('.buttons > #btnDelete').addClass('hidden');
                            that.options.showActivateButton && that.formElement.find('.buttons > #btnActivate').removeClass('hidden');
                            break;
                    }
                    if(that.model.id == 0) {
                        that.formElement.find('.buttons > #btnInactivate').addClass('hidden');
                        that.formElement.find('.buttons > #btnDelete').addClass('hidden');
                        that.formElement.find('.buttons > #btnActivate').addClass('hidden');
                    }
                }
                
                if(!approvation) {
                    that.formElement.find('.buttons > #btnApprove').addClass('hidden');
                    that.formElement.find('.buttons > #btnDisapprove').addClass('hidden');
                    that.formElement.find('.buttons > #btnVerify').addClass('hidden');
                }
                else {
                    switch(approvation) {
                        case that.options.approvationStatus.pendent:
                            that.options.showApproveButton    && that.formElement.find('.buttons > #btnApprove').removeClass('hidden');
                            that.options.showVerifyButton    && that.formElement.find('.buttons > #btnVerify').removeClass('hidden');
                            that.options.showDisapproveButton && that.formElement.find('.buttons > #btnDisapprove').removeClass('hidden');
                            break;
                        case that.options.approvationStatus.approve:
                            that.formElement.find('.buttons > #btnApprove').addClass('hidden');
                            that.formElement.find('.buttons > #btnDisapprove').addClass('hidden');
                            that.formElement.find('.buttons > #btnVerify').addClass('hidden');
                            // that.options.showDisapproveButton && that.formElement.find('.buttons > #btnDisapprove').removeClass('hidden');
                            break;
                        case that.options.approvationStatus.disapprove:
                            that.options.showApproveButton && that.formElement.find('.buttons > #btnApprove').removeClass('hidden');
                            that.options.showVerifyButton && that.formElement.find('.buttons > #btnVerify').removeClass('hidden');
                            that.formElement.find('.buttons > #btnDisapprove').addClass('hidden');
                            break;
                    }
                }
            }, 
            
            verifyPermissions: function(permissions) {
                var that = this,
                    obj = new window.Permission(permissions);
                
                var removeControlbyPermission = function(permission) {
                    var control = that.formElement.find('[data-permission=' + permission + ']');
                    
                    control.each(function(){
                       this.remove(); 
                    });
                };
                
                if(!$.isArray(obj.permissions)) {
                    if(!obj.permissions.allowed) {
                        removeControlbyPermission(obj.permissions.permission);
                    }
                    
                    return;
                }
                
                for(var i = 0; i < obj.permissions.length; i++) {
                    var p = obj.permissions[i];
                    
                    if(p.allowed) {
                        removeControlbyPermission(p.permission);
                    }
                }
            },
            
            translateFormat: function(format) {
                switch(format) {
                    case 'currency':
                        return 'c2';
                    case 'percent':
                    case 'percentual':
                    case '%':
                        return 'p2';
                    default:
                        return format;
                }
            },

            renderInnerViewModel: function(viewmodel, field, element, required = false) {
                var that = this,
                    item = that.dataItem();

                if(!that.innerViewModels) {
                    that.innerViewModels = [];
                }

                require([viewmodel], function(vm) {
                    vm.load(element, {
                        flushField: field,
                        owner: that,
                        required: required
                    });

                    var innerItem = vm.dataItem();
                    item.set(vm.getInnerName(), innerItem);
                    that.innerViewModels[field] = vm;
                    that.innerViewModels[field].owner = that;
                    that.innerViewModels[field].form.owner = vm;

                    if(that.bound === true) {
                        kendo.bind(that.formElement, item);
                    }
                });
            },

            makeRequireMessage: function(require, title) {
                if(typeof require === 'string') {
                    return require;
                }

                var message = 'O campo <b> {title} </b> é obrigatório!';
                return message.replace(/\{title\}/g, title.toUpperCase());
            },
            
            render: function() {
                var that = this,
                    rows = that.options.rows;
            
                if(that.numberFields) {
                    delete that.numberFields;
                }
                
                that.hasUploadEditor = false;
                that.uploadField = undefined;
                that.numberFields = [];
            
                if(!rows || rows.length === 0) {
                    return;
                }
                
                that.formElement = $(that.templates.form).appendTo(that.element);                
                
                var fields = that.model.fields,                
                    dataItem = that.dataItem(),
                    permissions = [],
                    masks = [];
            
                that.trigger(BEFORERENDER);
                that.bound = false;

                var renderRows = function(rows, group) {
                    var element = that.formElement,
                        rowElement = undefined;

                    if(group) {
                        rowElement = $(that.templates.row).appendTo(that.formElement);

                        var html = that.templates
                                       .group
                                       .replace(/\{grouptitle\}/g, group.group)
                                       .replace(/\{icon\}/g, group.icon ? group.icon : 'fa fa-reorder')
                                       .replace(/\{colorcssclass\}/g, group.color ? group.color : '');

                        var item = $(html).appendTo(rowElement);
                        element = item.find('.widget-body');
                    }      

                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            var group = undefined;

                            if(v.group) {
                                group = { group: v.group, color: v.color, icon: v.icon };
                            }

                            renderRows(v.rows, group);
                            return;
                        }

                        var row = v.row;
                        
                        rowElement = $(that.templates.row).appendTo(element);
                        
                        $.each(row, function(j, s) {
                            var field = fields[s.field],
                                type, editor;

                            if(s.field.indexOf('.') > 0) {
                                var parts = s.field.split('.'),
                                    first = parts[0];

                                field = fields[parts[0]];

                                if(!dataItem.get(parts[0])) {
                                    dataItem.set(parts[0], field.defaultValue);
                                }
                            }  

                            if(s.permission) {
                                permissions.push(s.permission);
                            } else if(field.permission) {
                                permissions.push(field.permission);
                            }
                            
                            if(s.mask) {
                                masks.push({
                                    field: s.field,
                                    mask: s.mask
                                });
                            }
                            else if(field.mask) {
                                masks.push({
                                    field: s.field,
                                    mask: field.mask
                                });
                            }

                            var fieldType = s.type;

                            if(!fieldType) {
                                fieldType = field.type;
                            }
                            
                            switch(fieldType) {
                                case 'array':
                                    if(field.viewmodel || s.viewmodel) {
                                        that.renderInnerViewModel(field.viewmodel, s.field, rowElement, (s.required || field.required));
                                        return;
                                    }

                                    type = 'array';

                                    editor = s.editor 
                                            ? s.editor.toLowerCase() 
                                            : field.editor
                                                ? field.editor.toLowerCase()
                                                : null;
                                    break;

                                case 'password':
                                    type = 'password';

                                    editor = s.editor 
                                            ? s.editor.toLowerCase() 
                                            : field.editor
                                                ? field.editor.toLowerCase()
                                                : null;
                                    break;

                                case 'bool':
                                case 'boolean':
                                    type = 'checkbox';
                                    editor = 'switch';
                                    break;

                                case 'number':
                                    if(field.editor === 'numericeditor') {
                                        that.numberFields.push({ 
                                            field: s.field, 
                                            format: (s.format || field.format),
                                            decimals: (s.decimals || field.decimals),
                                            currency: (s.currency || field.currency),
                                            onlyNumbers: (s.onlyNumbers || field.onlyNumbers),
                                            allowMinus: (s.allowMinus || field.allowMinus),
                                            min: (s.min || field.min),
                                            max: (s.max || field.max)
                                        });

                                        type = 'text';                                    
                                    }
                                    else {
                                        type = "number";
                                    }

                                    editor = s.editor 
                                               ? s.editor.toLowerCase() 
                                               : field.editor
                                                   ? field.editor.toLowerCase()
                                                   : null;
                                    break;                            
                                default:
                                    if(field.editor === 'numericeditor') {
                                        that.numberFields.push({ 
                                            field: s.field, 
                                            format: (s.format || field.format),
                                            decimals: (s.decimals || field.decimals),
                                            currency: (s.currency || field.currency)
                                        });
                                    }
                                    
                                    type = 'text';

                                    editor = s.editor 
                                               ? s.editor.toLowerCase() 
                                               : field.editor
                                                  ? field.editor.toLowerCase()
                                                  : null;
                                    break;                            
                            }
                            
                            var fnApprovation = function(field) {
                                return [
                                    that.options.negativeField,
                                    that.options.reasonField
                                ].indexOf(field) > -1;
                            };
                            
                            if(field.editor === 'uploadeditor') {
                                that.hasUploadEditor = true;
                                that.uploadField = s.field;
                                that.uploadFieldConfig = {
                                    multiple: s.multiple || field.multiple
                                };
                            }
                        
                            var html = field.type === 'text' 
                                        ? that.templates.controlText
                                        : that.templates
                                              .control
                                              .replace(/\{type\}/g, type)
                                              .replace(/\{binder\}/g, s.binder 
                                                                        ? s.binder 
                                                                        : field.binder 
                                                                            ? field.binder
                                                                            : 'value')

                                              .replace(/\{format\}/g, s.format 
                                                                        ? 'data-format="' + that.translateFormat(s.format) + '"' 
                                                                        : field.format 
                                                                            ? that.translateFormat(field.format)
                                                                            : '')
                                                                            
                                              .replace(/\{max\}/g, s.max 
                                                                    ? 'max="' + s.max + '"' 
                                                                    : field.max 
                                                                        ? 'max="' + field.max + '"'
                                                                        : "")

                                              .replace(/\{min\}/g, s.max 
                                                                    ? 'min="' + s.min + '"' 
                                                                    : field.max 
                                                                        ? 'min="' + field.min + '"'
                                                                        : "");
                        
                            html =  html.replace(/\{title\}/g, (s.title 
                                                                  ? s.title 
                                                                  : field.title 
                                                                      ? field.title
                                                                      : ""))

                                        .replace(/\{table\}/g, s.table 
                                                                ? 'data-table="' + s.table + '"' 
                                                                : field.table
                                                                    ? 'data-table="' + field.table + '"' 
                                                                    : "")

                                        .replace(/\{span\}/g, (s.span ? s.span : 3))
                                        .replace(/\{id\}/g, s.field.replace('.', that.options.dotReplaceChar))
                                        .replace(/\{field\}/g, s.field)

                                        .replace(/\{validator\}/g, s.validator 
                                                                     ? 'data-validator="' + s.validator + '"' 
                                                                     : field.validator
                                                                         ? 'data-validator="' + field.validator + '"' 
                                                                         : "")

                                        .replace(/\{approvation_visible\}/g, fnApprovation(s.field) ? 'data-bind="visible: fnApprovationVisible()"' : "")
                                        .replace(/\{editor\}/g, editor ? 'data-role="' + editor + '"' : '')

                                        .replace(/\{permission\}/g, s.permission 
                                                                      ? 'data-permission="' + s.permission + '"' 
                                                                      : field.permission 
                                                                          ? 'data-permission="' + field.permission + '"' 
                                                                          : '')

                                        .replace(/\{required\}/g, s.required !== undefined && s.required !== false
                                                                    ? 'data-required="' + that.makeRequireMessage(s.required, (s.title || field.title)) + '"'
                                                                    : field.required !== undefined && field.required !== false
                                                                        ? 'data-required="' + that.makeRequireMessage(field.required, (s.title || field.title)) + '"'
                                                                        : '')

                                        .replace(/\{.required\}/g, s.required !== undefined && s.required !== false
                                                                     ? 'required'
                                                                     : field.required !== undefined && field.required !== false
                                                                         ? 'required'
                                                                         : '')

                                        .replace(/\{maxlength\}/g, s.maxLength && 
                                                                     s.maxLength > 0 && 
                                                                       (!s.editor || !s.editor.toLowerCase().endsWith('dropdownlist')) &&
                                                                         (s.type === 'string')
                                                                     ? 'maxlength=' + s.maxLength
                                                                     : field.maxLength && 
                                                                         field.maxLength > 0 && 
                                                                           (!field.editor || !field.editor.toLowerCase().endsWith('dropdownlist')) &&
                                                                             (field.type === 'string')
                                                                         ? 'maxlength=' + field.maxLength
                                                                         : '');
                                    
                            var valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Enabled';                        
                            dataItem.set('formEnabled', that.options.initEnabled); 

                            var functionName = 'fn' + valuesName,
                                readOnly = (s.readOnly === true || field.readOnly === true),
                                editable = ((s.editable === undefined || s.editable === true) ||
                                            (field.editable === undefined || field.editable === true));
                                
                            if(!readOnly) {
                                dataItem.set(valuesName, editable);
                                
                                dataItem.set(functionName, new Function(
                                '    var name = "' + valuesName + '"; ' +
                                '    return this.get(name) && this.get("formEnabled"); '
                                ));
                            
                                html = html.replace(/\{editable\}/g, functionName + '()');
                            }
                            else {
                                dataItem.set(valuesName, false); 
                                html = html.replace(/\{editable\}/g, valuesName);
                            }
                            
                            dataItem.set('fnApprovationVisible', function() {
                                if(!that.options.approvation) {
                                    return false;
                                }
                                    
                                var value = dataItem.get(that.options.approvationField);                                
                                return value === that.options.approvationStatus.disapprove;
                            });                                
                            
                            if(s.values && s.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, s.values);
                                
                                html = html.replace(/\{datasource\}/g, ', source: ' + valuesName)
                                           .replace(/\{value\-primitive\}/g, 'data-value-primitive="true"')
                                           .replace(/\{text\-field\}/g, 'data-text-field="text"')
                                           .replace(/\{value\-field\}/g, 'data-value-field="value"');
                            }
                            else if(field.values && field.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, field.values);
                                
                                html = html.replace(/\{datasource\}/g, ', source: ' + valuesName)
                                           .replace(/\{value\-primitive\}/g, 'data-value-primitive="true"')
                                           .replace(/\{text\-field\}/g, 'data-text-field="text"')
                                           .replace(/\{value\-field\}/g, 'data-value-field="value"');
                            }
                            else {
                                html = html.replace(/\{datasource\}/g, '')
                                           .replace(/\{value\-primitive\}/g, '')
                                           .replace(/\{text\-field\}/g, '')
                                           .replace(/\{value\-field\}/g, '');
                            }
                                
                            rowElement.append(html);
                        });
                    });
                };
            
                renderRows(rows);
                
                if(permissions && permissions.length > 0) {                
                    that.verifyPermissions(permissions);
                }
                
                var html = that.templates
                               .buttonsWhenEnabled
                               .replace(/\{savebutton\}/g, that.options.saveButtonText)
                               .replace(/\{cancelbutton\}/g, that.options.cancelButtonText);

                that.formElement.append(html);

                html = that.templates
                           .buttonsWhenDisabled
                           .replace(/\{editbutton\}/g, that.options.editButtonText)
                           .replace(/\{deletebutton\}/g, that.options.deleteButtonText)
                           .replace(/\{inactivatebutton\}/g, that.options.inactivateButtonText)
                           .replace(/\{activatebutton\}/g, that.options.activateButtonText)
                           .replace(/\{approvebutton\}/g, that.options.approveButtonText)
                           .replace(/\{verifybutton\}/g, that.options.verifyButtonText)
                           .replace(/\{disapprovebutton\}/g, that.options.disapproveButtonText);

                that.formElement.append(html);
           
                dataItem.set('showSaveButton', that.options.showSaveButton);
                dataItem.set('showEditButton', that.options.showEditButton);
                dataItem.set('showDeleteButton', that.options.showDeleteButton);
                dataItem.set('showCancelButton', that.options.showCancelButton);
                dataItem.set('showActivateButton', that.options.showActivateButton);
                dataItem.set('showInactivateButton', that.options.showInactivateButton);
                dataItem.set('showApproveButton', (that.options.approvation && that.options.showApproveButton));
                dataItem.set('showVerifyButton', (that.options.approvation && that.options.showVerifyButton));
                dataItem.set('showDisapproveButton', (that.options.approvation && that.options.showDisapproveButton));
                
                dataItem.set('save', $.proxy(that.save, that));
                dataItem.set('edit', $.proxy(that.performEdit, that));
                dataItem.set('delete', $.proxy(that.delete, that));
                dataItem.set('cancel', $.proxy(that.performCancel, that));
                dataItem.set('activate', $.proxy(that.activate, that));
                dataItem.set('inactivate', $.proxy(that.inactivate, that));
                dataItem.set('approve', $.proxy(that.approve, that));
                dataItem.set('verify', $.proxy(that.verify, that));
                dataItem.set('disapprove', $.proxy(that.disapprove, that));
                
                that.trigger(DATABINDING, { item: dataItem });
                kendo.unbind(that.formElement);
                kendo.bind(that.formElement, dataItem);
                that.bound = true;
                
                var keyName = that.model.idField,
                    keyValue = dataItem.get(keyName);
                
                if(!keyValue || keyValue === 0 || keyValue === '') {
                    that.formElement.find('.buttons').hide();
                }
                
                if(masks && masks.length > 0) {
                    for(var i = 0; i < masks.length; i++) {
                        var mask = masks[i];
                        that.setMask(mask.field, mask.mask);
                    }
                }
                
                that.toggleButtons(dataItem);
                that.prepareAllDropDownList();

                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    editor.options.multiple = that.uploadFieldConfig.multiple;
                }

                that.trigger(DATABOUND, { item: dataItem });
                that.trigger(AFTERRENDER);
            },
            
            enable: function() {
                var that = this,
                    dataItem = that.dataItem();
            
                dataItem.set('formEnabled', true);

                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    editor.enable();
                }

                if(!that.innerViewModels) {
                    return;
                }

                for(var i in that.innerViewModels) {
                    var item = that.innerViewModels[i];
                    item.form && item.form.enable();
                }
            },
            
            disable: function() {
                var that = this,
                    dataItem = that.dataItem();
            
                dataItem.set('formEnabled', false);

                if(that.hasUploadEditor) {
                    var editor = that.getEditor(that.uploadField);
                    editor.enable(false);
                }

                if(!that.innerViewModels) {
                    return;
                }

                for(var i in that.innerViewModels) {
                    var item = that.innerViewModels[i];
                    item.form && item.form.disable();
                }
            },
            
            bindEvents: function() {
                var that = this,
                    options = that.options;
                
                if(options.beforeSave)
                    that.bind(BEFORESAVE, $.proxy(options.beforeSave, that));
                
                if(options.afterSave)
                    that.bind(AFTERSAVE, $.proxy(options.afterSave, that));
                
                if(options.dataBinding)
                    that.bind(DATABINDING, $.proxy(options.dataBinding, that));
                
                if(options.dataBound)
                    that.bind(DATABOUND, $.proxy(options.dataBound, that));
                
                if(options.init)
                    that.bind(INIT, $.proxy(options.init, that));
                
                if(options.beforeRender)
                    that.bind(BEFORERENDER, $.proxy(options.beforeRender, that));
                
                if(options.afterRender)
                    that.bind(AFTERRENDER, $.proxy(options.afterRender, that));
                
                if(options.cancel)
                    that.bind(CANCEL, $.proxy(options.cancel, that));
                
                if(options.edit)
                    that.bind(EDIT, $.proxy(options.edit, that));
                
                if(options.insert)
                    that.bind(INSERT, $.proxy(options.insert));
            },
            
            items: function() {
                var that = this;
                return that.formElement.children();
            },
            
            getEditor: function(name) {
                var that = this,
                    element = that.formElement.find('#' + name.replace('.', that.options.dotReplaceChar));
            
                if(!element || element.length === 0)
                    return null;
                
                var handler = element.data().handler;
                
                if (!handler)
                    return element;
                
                return handler;
            },
            
            fetchAllDropDownList: function(){
                var that = this,
                    rows = that.options.rows;
                    
                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = s.field.replace('.', that.options.dotReplaceChar),
                                editor = that.getEditor(field);

                            if(!editor)
                                return;

                            if (editor instanceof window.LookupDropDownList) {                                
                                editor.dataSource.read();
                            }
                        });
                    });
                };
            
                prepareRows(rows);                
            },
            
            prepareAllDropDownList: function(){
                var that = this,
                    rows = that.options.rows;
                    
                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = s.field.replace('.', that.options.dotReplaceChar),
                                editor = that.getEditor(field);

                            if(!editor)
                                return;
                            
                            if(!(editor instanceof window.LookupDropDownList))
                                return;
                            
                            editor.options.inForm = true;
                            
                            editor.bind('clear', function(e) {
                                var item = that.dataItem();                                    
                                item.set(s.field, null);
                            });
                        });
                    });
                };
            
                prepareRows(rows);  

                var that = this,
                    dataItem = that.dataItem();
            
                if(!dataItem)
                    return;
                
                for(var i in dataItem) {
                    var editor = that.getEditor(i.replace('.', that.options.dotReplaceChar));
                    
                    if(!editor)
                        continue;
                    
                    if(!(editor instanceof window.LookupDropDownList))
                        continue;
                    
                    editor.bind('clear', function(e) {
                        var field = e.sender.element.attr('id').replace(that.options.dotReplaceChar, '.'),
                            item = that.dataItem();
                            
                        item.set(field, null);
                    });
                }
            },


            validateElement: function(item, _dataItem, _id) {
                var that = this;

                if(!item.is(':visible')) {
                    return;
                }

                var field = item.attr('id').replace(that.options.dotReplaceChar, '.'),
                    table = item.data('table'),
                    name = item.data('validator'),
                    dataItem = _dataItem ? _dataItem : that.dataItem(),
                    id = _id ? _id : dataItem.get(that.model.idField),
                    value = dataItem.get(field),
                    validator = app.getValidator(name);                    
               
                validator.setOptions({
                    form: that,
                    id: id,
                    field: field,
                    table: table,
                    dotReplaceChar: that.options.dotReplaceChar
                });

                return validator.validate(value);
            },
            
            validate: function() {
                var that = this,
                    innerViewModelsValidated = true;
                
                that.removeAllErrors();

                var except = [];

                if(that.innerViewModels) {
                    for(var i in that.innerViewModels) {
                        var vm = that.innerViewModels[i];

                        if(vm && vm.form && vm.form.formElement) {
                            except = except.concat(vm.form.formElement.find('[data-required]').toArray());

                            if(vm.options && (vm.options.required !== undefined && vm.options.required !== false)) {
                                if(!vm.items || vm.items.length === 0) {
                                    app.invalidateItem(vm.grid.wrapper, vm.options.required);
                                    innerViewModelsValidated = false;
                                }
                            }
                        }
                    }
                }

                var validated = app.validate(that.formElement, except),
                    customValidated = true,
                    dataItem = that.dataItem(),
                    id = dataItem.get(that.model.idField);

                var elems = that.formElement.find('[data-validator]');

                elems.each(function() {
                    var item = $(this);
                    
                    var itemValidated = that.validateElement(item, dataItem, id);

                    if(!itemValidated) {
                        customValidated = false;
                    } 
                });               
                
                return validated && customValidated && innerViewModelsValidated;
            },
            
            changeLabel: function(field, label) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                var labelElement = row.find('.control-label');
                labelElement.html(label);
            },
            
            hideEditor: function(field) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                row.hide();
            },
            
            showEditor: function(field) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                row.show();
            },
            
            setMask: function(field, mask) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                editor.mask && editor.mask(mask);
            },
                        
            makeReadOnly: function(field) {
                var that = this,
                    dataItem = that.dataItem(),
                    valuesName = field + 'Enabled',
                    functionName = 'fn' + valuesName;
                        
                dataItem.set(valuesName, false);

                dataItem.set(functionName, new Function(
                    '    var name = "' + valuesName + '"; ' +
                    '    return this.get(name) && this.get("formEnabled"); '
                ));
                    
                that.model.fields[field].readOnly = true;
            },
            
            makeEditable: function(field) {
                var that = this,
                    dataItem = that.dataItem(),
                    valuesName = field + 'Enabled',
                    functionName = 'fn' + valuesName;                            
                    
                dataItem.set(valuesName, true);

                dataItem.set(functionName, new Function(
                '    var name = "' + valuesName + '"; ' +
                '    return this.get(name) && this.get("formEnabled"); '
                ));    
        
                that.model.fields[field].readOnly = false;
            },

            makeRequired: function(field, message) {
                var that = this,
                    dataItem = that.dataItem();

                if(!message) {
                    var title = that.model.fields[field].title;
                    message = 'O campo <b> ' + title.toUpperCase() + ' </b> é obrigatório!';
                }

                that.model.fields[field].required = message;

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.attr('data-required', message);
                }
                else {
                    editor.attr('data-required', message);
                }

                parent.find('.control-label').addClass('required');
            },

            makeUnrequired: function(field) {
                var that = this,
                    dataItem = that.dataItem();
                
                that.model.fields[field].required = false;

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.removeAttr('data-required');
                }
                else {
                    editor.removeAttr('data-required');
                }

                parent.find('.control-label').removeClass('required');
            },

            isRequired: function(field) {
                var that = this
                return that.model.fields[field].required;
            },

            changeRequiredMessage: function(field, message) {
                var that = this,
                    dataItem = that.dataItem();

                if(!message) {
                    return;
                }

                if(that.model.fields[field]) {
                    that.model.fields[field].required = message;
                }

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.attr('data-required', message);
                }
                else {
                    editor.attr('data-required', message);
                }
            },
            
            init: function(element, options) {
                var that = this;
                that.element = $(element);
                that.options = $.extend({}, that.options, options);
                that.events = that._events;
                
                Widget.fn.init.call(that, element, that.options);                
                
                that.element.html('');                
                that.model = that.createModel();
                that.bindEvents();
                that.trigger(INIT);        
                that.render();
                that.operation = 'reading';
                
                that.formElement.data('kendo' + that.options.name, that);
                kendo.notify(that);
                kendo.init(that.formElement);
            }
        });
        
        kendo.ui.plugin(window.Form);        
    });
    
})(jQuery);