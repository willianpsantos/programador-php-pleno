(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var CpfCnpjValidator = window.Validator.extend({
            options: {
                name: 'CpfCnpjValidator',
                field: undefined,
                form: undefined,
                id: undefined,
                table: undefined
            },

            validate: function(value) {
                if(!value) {
                    return true;
                }

                var that = this,
                    url = app.urls.seguranca.validacoes.cpf;

                if(value.length > 14) { // 14 - tamanho CPF com mascara
                    url = app.urls.seguranca.validacoes.cnpj;
                }

                var result = true;
                var xview = app.currentViewModel() ? app.currentViewModel().viewmodel : app.currentModule;
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: url,
                    async: false,
                    dataType: 'json',

                    data: {
                        id: that.options.id,                        
                        table: that.options.table,
                        param: value,
                        checkClone: that.options.id ? false : true
                    },

                    beforeSend:  function(xhr) {
                        xhr.setRequestHeader('X-MODULE', app.currentModule);
                        xhr.setRequestHeader('X-VIEW', xview);

                        if(that.options.beforeSend) {
                            that.options.beforeSend(xhr);
                        }
                    },

                    success: function(data) {
                        var otherId = data.id,
                            result = data.success,
                            checkClone = data.checkClone;
                        app.hideLoading();

                        if(!result) {
                            that.changeMessage(that.options.field, data.message);
                            that.markInvalidated(that.options.field);

                            if(otherId && checkClone) {
                                if(xview == "cadastroagricultor") {
                                    window.MessageBox.confirm(
                                        that.options.form.options.messages.cpf_cnpjTitle,
                                        that.options.form.options.messages.cpf_cnpj.replace('#ENTIDADE#', 'COOPERADO').replace('#CPF_CNPJ#', value.length > 14 ? 'CNPJ' : 'CPF'),
                                        e => {
                                            if(e.button.name == "yes") {
                                                that.options.form.clone(otherId);
                                            }  
                                        }
                                    );
                                } else if(xview == "cadastrocooperados") {
                                    window.MessageBox.confirm(
                                        that.options.form.options.messages.cpf_cnpjTitle,
                                        that.options.form.options.messages.cpf_cnpj.replace('#ENTIDADE#', 'AGRICULTOR').replace('#CPF_CNPJ#', value.length > 14 ? 'CNPJ' : 'CPF'),
                                        e => {
                                            if(e.button.name == "yes") {
                                                that.options.form.clone(otherId);
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    },

                    error: function(a,b,c) {
                        app.hideLoading();
                        app.ajaxError(a,b,c);
                        result = false;
                    }
                });

                return result;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new CpfCnpjValidator());
    });
})(jQuery);
