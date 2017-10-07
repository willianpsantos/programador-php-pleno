define('app', ['kendo'], function(kendo) {
    window.app = {};
    app.defaultPageSize = 13;
    app.messages = {};
    app.translators = [];
    app.validators = [];
    
    app.Enum = {

        getDescription: function ($enum, value) {
            for (var key in $enum)
                if (key == value)
                    return $enum[key].description;

            return null;
        },

        getValue: function ($enum, value) {
            for (var key in $enum)
                if ($enum[key].code == value)
                    return key;

            return null;
        },

        getCode: function ($enum, value) {
            for (var key in $enum)
                if (key == value)
                    return $enum[key].code;

            return null;
        },

        toList: function ($enum) {
            var list = [];

            for (var key in $enum)
                list.push({
                    text: $enum[key].description,
                    value: key
                });

            return list;
        },

        cast: function (value) {
            if (!value)
                return undefined;

            if (typeof value == 'string')
                return value;

            if (typeof value == 'object' && value.hasOwnProperty('value'))
                return value['value'];

            return undefined;
        }
    };


    app.ajaxError = function (xhr, exception, deferred) {    
        app.hideLoading();

        if (xhr.status == 400) {            
            window.MessageBox.alert("Error[" + xhr.status + "]", $.parseJSON(xhr.responseText).message, { icon: window.MessageBox.ERROR, height: 120 });
        } 
        else if (xhr.status == 403) {
            window.MessageBox.alert("Error[" + xhr.status + "]", xhr.responseText, { icon: window.MessageBox.ERROR, height: 120 });
        } 
        else if (xhr.status == 401) {

            window.MessageBox.alert(
                "Error[" + xhr.status + "]",
                "Sua sessão expirou automaticamente ou houve falha de comunicação com o servidor. Será redirecionado para efetuar novamente seu login.",
                {
                    icon: window.MessageBox.INFO,
                    height: 120,
                    handler: function () {
                        location.href = app.rootUrl;
                    }
                });
        } 
        else if (xhr.status == 404) {
            window.MessageBox.alert("Error[" + xhr.status + "]", "Página não encontrada.", { icon: window.MessageBox.INFO, height: 120 });
        } 
        else if (xhr.status == 500) {
            window.MessageBox.alert("Error[" + xhr.status + "]", "Erro interno no servidor.", { icon: window.MessageBox.ERROR, height: 120 });
        } 
        else if (xhr.status == 408) {
            window.MessageBox.alert("Error[" + xhr.status + "]", "Tempo da requisição expirado.", { icon: window.MessageBox.ERROR, height: 120 });
        } 
        else if (xhr.status == 204) {
            window.MessageBox.alert("Error[" + xhr.status + "]", "Nenhum registro foi encontrado com o filtro utilizado.", { icon: window.MessageBox.INFO, height: 120 });
        } 
    };

    app.showLoading = function() {
        var loading = $(".loading");

        if(loading.is(':visible')) {
            if(window.processLoading === undefined) {
                window.processLoading = 0;
            }

            window.processLoading++;
            return;
        }

        loading.css({ 'opacity' : '0.7' });
        app.isBusy = true;        
        loading.fadeIn();
    };

    app.hideLoading = function() {
        if(window.processLoading > 0) {
            window.processLoading--;
            return;
        }

        var loading = $(".loading");
        app.isBusy = false;        
        loading.fadeOut();
    };

    app.meses = [
        { value: 1, text: 'Janeiro' },
        { value: 2, text: 'Fevereiro' },
        { value: 3, text: 'Março' },
        { value: 4, text: 'Abril' },
        { value: 5, text: 'Maio' },
        { value: 6, text: 'Junho' },
        { value: 7, text: 'Julho' },
        { value: 8, text: 'Agosto' },
        { value: 9, text: 'Setembro' },
        { value: 10, text: 'Outubro' },
        { value: 11, text: 'Novembro' },
        { value: 12, text: 'Dezembro' }
    ];

    app.mes = function (id) {
        var mes;

        $.each(app.meses, function () {
            mes = this;

            if (mes.value == id)
                return false;

            return true;
        });

        return mes.text;
    };    

    app.estados = [
        { value: "AC", text: "Acre" },
        { value: "AL", text: "Alagoas" },
        { value: "AM", text: "Amazonas" },
        { value: "AP", text: "Amapá" },
        { value: "BA", text: "Bahia" },
        { value: "CE", text: "Ceará" },
        { value: "DF", text: "Distrito Federal" },
        { value: "ES", text: "Espírito Santo" },
        { value: "GO", text: "Goiás" },
        { value: "MA", text: "Maranhão" },
        { value: "MG", text: "Minas Gerais" },
        { value: "MS", text: "Mato Grosso do Sul" },
        { value: "MT", text: "Mato Grosso" },
        { value: "PA", text: "Pará" },
        { value: "PB", text: "Paraíba" },
        { value: "PR", text: "Paraná" },
        { value: "PE", text: "Pernambuco" },
        { value: "PI", text: "Piauí" },
        { value: "RJ", text: "Rio de Janeiro" },
        { value: "RN", text: "Rio Grande do Norte" },
        { value: "RO", text: "Rondônia" },
        { value: "RR", text: "Roraima" },
        { value: "RS", text: "Rio Grande do Sul" },
        { value: "SC", text: "Santa Catarina" },
        { value: "SE", text: "Sergipe" },
        { value: "SP", text: "São Paulo" },
        { value: "TO", text: "Tocantins" },
        { value: "OU", text: "Outros" }
    ];

    app.estado = function(uf) {
        var estado;

        $.each(app.estados, function() {            
            estado = this;

            if (estado.value == uf)
                return false;

            return true;
        });

        return estado;
    };

    $.urlParam = function (name) {
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        return results[1] || 0;
    };
    
    app.addClassError = function (item) {
        var dataRole = item.attr('data-role');

        if (!dataRole) {
            item.addClass('k-error');
            return;
        }

        var handler = item.data().handler;

        if (!handler)
            return;

        if (handler.wrapper)
            handler.wrapper.addClass('k-error');
        else if (handler.element)
            handler.element.addClass('k-error');
    };

    app.removeClassError = function (item) {
        var dataRole = item.attr('data-role');

        if (!dataRole) {
            item.removeClass('k-error');
            return;
        }

        var handler = item.data().handler;

        if (!handler)
            return;

        if (handler.wrapper)
            handler.wrapper.removeClass('k-error');
        else if (handler.element)
            handler.element.removeClass('k-error');
    };

    app.removeIconError = function(item) {
        var parent = item.parents('.control-group').find('.control-label');        
        
        parent.find('i.icon-error').parents('span').each(function(){
            this.remove();
        });
    };
    
    app.invalidateItem = function(item, message) {
        var parent = item.parents('.control-group').find('.control-label');        
        this.addClassError(item);
        this.removeIconError(item);        

        var html = '<span style="color:firebrick; font-size:1em !important; float:right;"> ' + 
                   '    <i title="' + (message ? message : item.data('required')) + '" class="fa fa-exclamation-triangle fa-lg icon-error" style="margin-top: -14px;"></i> ' + 
                   '</span>';

        parent.append(html);                
        parent.find('i.icon-error').kendoTooltip();  
    };
    
    app.validateItem = function(item, message) {
        this.removeClassError(item);
        this.removeIconError(item);
        var success = true;

        if (item.is('input') || item.is('textarea')) {
            var data = item.data();
            
            if(data && data.handler) {
                var handler = data.handler,
                    element = data.handler.wrapper || data.handler.element;                
               
                if(!element.is(':visible') || 
                     element.is('.k-state-disabled') || 
                      element.children().eq(0).is('.k-state-disabled')) {
                    return true;
                }
            }
            else if(!item.is(':visible') || item.is(':disabled')) {
                return true;
            }
                        
            var value = item.val();

            if (!value || value === 0 || value === '0' || value === ' ') {
                success = false;
            }
        }
        else if (item.is('select')) {
            var value = item.find('option:selected').val();
            
            if(!item.is(':visible') || item.is(':disabled')) {
                return true;
            }

            if (!value || value === 0 || value === '0' || value === ' ') {
                success = false;
            }
        }

        if (!success) {
            this.invalidateItem(item, message);        
        }
        
        return success;
    };

    app.validate = function (element, except, callback) {
        var requireds = element.find('[data-required]');
        var validated = true;
        var fieldsWithError = [];
        var firstField = null;

        $.each(requireds, function (index, value) {
            var item = $(this);

            if(except && except.length > 0) {
                for(var i = 0; i < except.length; i++) {
                    var ex = $(except[i]);

                    if(ex[0] === item[0]) {
                        return;
                    }
                }
            }

            if(item.is('[data-previous-validated]')) {
                success = false;
            }
            else {
                success = app.validateItem(item);
            }

            if (!success) {
                validated = false;
                fieldsWithError.push(item);
                if(firstField == null) {
                    firstField = item;
                }
            }
        });

        if(firstField) {
            window.MessageBox.alert("Atenção", "Você não preencheu alguns campos obrigatórios", { icon: window.MessageBox.WARNING, height: 120 });
            
            $('html, body').animate({
                scrollTop: firstField.position().top ? firstField.position().top : firstField.parent().position().top
            }, 100);
        }

        if (callback) {
            callback({
                validated: validated,
                fields: fieldsWithError
            });
        }

        return validated;
    };

    app.splitMessages = function(options, str) {
        var keys = str.split(".");
        var tmp = undefined;
        for(var i = 0; i < keys.length; i++) {
            if(tmp == undefined)
                tmp = options[keys[i]];
            else
                tmp = tmp[keys[i]];
        }

        return tmp;
    };

    app.hasInvalidatedItems = function(element) {
        var items = element.find('.k-error[data-previous-validated]');
        return items.length > 0;
    };
    
    app.parseFloat = function (value) {
        var aux = value.replace(',', '.');
        return parseFloat(aux);
    };

    app.floatToString = function (value) {
        var aux = value.toFixed(2).toLocaleString();
        aux = aux.replace('.', ',');
        return aux;
    };
    
    app.getToken = function() {
       var token = $('meta[name=_token]').attr('content');
       return token;  
    };
    
    app.destroyAllWidgets = function(element) {
        var roles = element.find('[data-role]');
        
        roles.each(function(){
           var widget = $(this);
           
           if(widget.find('[data-role]').length > 0) {
               app.destroyAllWidgets(widget);
           }
           
           var data = widget.data();
               
           if(!data || !data.handler) {
               return;
           }
           
           var handler = data.handler;
           
           if(handler.destroy) {
               handler.destroy();
           }
           
           this.remove();
        });
    };
   
    app.currentViewModel = function(current) {
        if(!current)
            return JSON.parse(window.localStorage.getItem('currentViewModel'));
       
        window.localStorage.setItem('currentViewModel', JSON.stringify(current));
    };
   
    app.loadViewModel = function(viewmodel) {
        var defaultNamespace = 'viewmodel/{viewmodel}',            
            viewmodelName = defaultNamespace.replace(/\{viewmodel\}/g, viewmodel);
                   
        require([viewmodelName], function(vm) {
            app.mainContent.html('');
                                   
            app.currentViewModel({
                module: app.currentModule,
                viewmodel: viewmodel,
            });
            
            vm.load(app.mainContent);
        });
    };
   
    app.currentMenu = function(current) {
        if(!current)
            return JSON.parse(window.localStorage.getItem('currentMenu'));
       
        window.localStorage.setItem('currentMenu', JSON.stringify(current));
    },
   
    app.selectMenu = function(viewmodel) {
        var sidebar = $('.sidebar-scroll > #sidebar > .sidebar-menu');
        
        if(sidebar.length === 0)
            return;
        
        var menu = sidebar.find('.sub-menu a[data-menu-name="' + viewmodel + '"]');
        
        if(menu.length === 0) {
            return;
        }
        
        menu.parents('.sub-menu').addClass('open');
        menu.parents('.sub').css({ 'display' : 'block' });
        menu.parents('li').addClass('active');
    };
    
    app.lang = function(lang) {
        if(!lang) {
            return window.localStorage.getItem('lang');
        }
        
        window.localStorage.setItem('lang', lang);
    };
    
    app.translate = function(model, key, prop = 'title') {
        var that = this,
            lang = this.lang(),
            defaultLang = "pt";
        
        if(model && !key) {
            return that.messages[lang][model];
        }
        
        if(that.translators && that.translators.length) {
            for(var i = 0; i < that.translators.length; i++) {
                var translator = that.translators[i];
                
                if(translator.name === model) {
                    var messages = translator.messages,
                        message;

                    if(messages[lang].hasOwnProperty(key)) {
                        message = messages[lang][key];
                    }
                    else if(messages[defaultLang].hasOwnProperty(key)) {
                        message = messages[defaultLang][key];
                    }
                    else {
                        return lang + "." + key;
                    }
                    
                    if(typeof message === 'string') {
                        return message;
                    }
   
                    if(prop) {
                        return message[prop];
                    }
                    
                    return message;
                }
            }
        }
    };

    app.registerValidator = function(validator) {
        if(!this.validators) {
            this.validators = [];
        }

        this.validators[validator.options.name.toLowerCase()] = validator;
    };

    app.getValidator = function(name) {
        return this.validators[name.toLowerCase()];
    };

    app.base64ToBlob = function (data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    app.cultivarToHtml = function(data) {
        var result_html = "<span>";

        if(data == null) {
            return '';
        }

        if(data.germoplasma) {
            if(data.germoplasma.obtentor) {
                if(data.germoplasma.obtentor.sigla) {
                    result_html += data.germoplasma.obtentor.sigla;
                } else {
                    result_html += data.germoplasma.obtentor.nm_pessoa;
                }
            }
            
            result_html += " " + data.germoplasma.nm_germoplasma + " ";
        }

        if(data.biotecnologia) {
            result_html += data.biotecnologia.nm_biotecnologia;
        }

        result_html += "</span>" ;
        return result_html;
    };

    app.biotecnologiaToHtml = function(data) {
        var result_html = "<span>";
        result_html += data.nm_biotecnologia;

        if(data.obtentor) {
            result_html += " " + (data.obtentor.sigla ? data.obtentor.sigla : data.obtentor.nm_pessoa);
        }

        result_html += "</span>" ;
        return result_html;
    };

    app.germoplasmaToHtml = function(data) {
        var result_html = "<span>";
        result_html += data.nm_germoplasma;

        if(data.obtentor) {
            result_html += " " + (data.obtentor.sigla ? data.obtentor.sigla : data.obtentor.nm_pessoa);
        }

        result_html += "</span>" ;
        return result_html;
    };

    app.areaInscritaToHtml = function(data) {        
        var result_html = '<span><b>Identificação:</b> ' + data.identificacao;

        result_html += ' (<b>Propriedade</b>: ' + data.nm_propriedade + 
                        ' | <b>Área</b>: ' + parseFloat(data.area).toString().replace('.', ',') +
                        (data.idams ? (' | <b>Nº AMS</b>: ' + data.idams) : '') +
                        (data.cultivar ? (' | <b>Cultivar</b>: [' + app.cultivarToHtml(data.cultivar) + ']') : '') +                            
                        ')';

        result_html += '</span>' ;
        return result_html;
    };
    
    return app;
});