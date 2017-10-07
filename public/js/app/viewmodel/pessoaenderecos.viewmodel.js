define('viewmodel/cadastropessoaenderecos', ['app', 'jquery', 'kendo', 'model/pessoaenderecos'], 

    function(app, $, kendo, model) {
        var CadastroPessoaEnderecosPopupViewModel = window.PopupViewModel.extend({
            name: 'pessoaenderecos',
            
            options : {
                name: 'CadastroPessoaEnderecosPopupViewModel',
                model: model,
                withWidget: true,
                popupTitle: 'Inserir/Alterar Endereços',
                newButtonText: 'Adicionar Novo Endereço',
           
                url: { 
                    get: app.urls.cadastro.pessoaenderecos.get,
                    delete: app.urls.cadastro.pessoaenderecos.delete,
                    activate:  app.urls.cadastro.pessoaenderecos.activate,
                    inactivate: app.urls.cadastro.pessoaenderecos.inactivate
                },
           
                grid: {
                    width: 'adjust',
                    initialFilter: undefined,
                    
                    customFilterables: {
                        'situacao': {
                            ui: 'situacaodropdownlist'
                        }                        
                    },
                    
                    columns: [
                        { field: 'idpessoa_endereco', title: 'Código', minScreenWidth: 500, width: '7%' },                                                
                        
                        { 
                            field: 'endereco', 
                            title: 'Endereço', 
                            width: '25%',
                            template: function(data) {
                                var end = data.endereco;
                                
                                if(data.numero) {
                                    end += ", " + data.numero;
                                }
                                
                                return kendo.htmlEncode(end);
                            }
                        },
                        
                        { field: 'bairro', title: 'Bairro', width: '20%' },
                        
                        { 
                            field: 'idcidade', 
                            title: 'Cidade', 
                            width: '15%', 
                            template: '<span>#= data.cidade ? data.cidade.nm_cidade + " - " + data.cidade.uf : "" #</span>' 
                        },
                        
                        { 
                            field: 'situacao', 
                            title: 'Situação', 
                            minScreenWidth: 500, 
                            width: '11%', 
                            template: '<center>#= !data.situacao || data.situacao == "A" ? "Ativo" : "Inativo" #</center>',
                            headerAttributes: { style: 'text-align: center' }
                        }
                    ]
                },
                
                form: kendo.ui.PessoaEnderecosForm
            },
       
            load: function(element, options) {
                var that = this;
                window.PopupViewModel.fn.load.call(that, element, options);
            }
        });
    
        return new CadastroPessoaEnderecosPopupViewModel();
    }
);