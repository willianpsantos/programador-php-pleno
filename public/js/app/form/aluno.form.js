require(['app', 'jquery', 'kendo', 'model/aluno'], 

    function(app, $, kendo, model) {
        var AlunoForm = window.Form.extend({
            options: {
                name: 'AlunoForm',
                model: model,                
                url: app.urls.aluno,
                
                rows: [
                    {
                        group: "Dados do Aluno",
                        icon: "fa fa-table",
                        color: "green",
                        rows: [
                            { row: [ { field: 'idaluno' } ] },                    
                            { row: [ { field: 'nome', span: 6 } ] },
                            { row: [ { field: 'email', span: 6 } ] },
                            { row: [ { field: 'dt_nascimento' } ] },

                            { 
                                row: [ 
                                    { field: 'situacao', span: 4 } 
                                ] 
                            }
                        ]
                    }
                ]
            },            
            
            init: function(element, options) {
                var that = this;
                window.Form.fn.init.call(that, element, options);
            }
        }); 
        
        kendo.ui.plugin(AlunoForm);
    }
            
);