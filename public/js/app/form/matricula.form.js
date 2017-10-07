require(['app', 'jquery', 'kendo', 'model/matricula'], 

    function(app, $, kendo, model) {
        var MatriculaForm = window.Form.extend({
            options: {
                name: 'MatriculaForm',
                model: model,                
                url: app.urls.matricula,
                
                rows: [
                    {
                        group: "Dados da Matricula",
                        icon: "fa fa-table",
                        color: "green",
                        rows: [
                            { row: [ { field: 'idmatricula' } ] },                    
                            { row: [ { field: 'idaluno', span: 6 } ] },                    
                            
                            { 
                                row: [ 
                                    { field: 'turma', span: 3 },
                                    { field: 'periodo_letivo', span: 3 }, 
                                ] 
                            },                            
                            
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
        
        kendo.ui.plugin(MatriculaForm);
    }
            
);