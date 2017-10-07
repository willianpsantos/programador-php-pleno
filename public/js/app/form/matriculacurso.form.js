require(['app', 'jquery', 'kendo', 'model/matriculacurso'], 

    function(app, $, kendo, model) {
        var MatriculaCursoForm = window.Form.extend({
            options: {
                name: 'MatriculaCursoForm',
                model: model,                
                url: app.urls.matriculacurso,
                
                rows: [
                    {
                        group: "Dados da Matricula",
                        icon: "fa fa-table",
                        color: "green",
                        rows: [
                            { row: [ { field: 'idmatricula_curso' } ] },                    
                            { row: [ { field: 'idmatricula', span: 6 } ] },
                            { row: [ { field: 'idcurso', span: 6 } ] },  
                            
                            
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
        
        kendo.ui.plugin(MatriculaCursoForm);
    }
            
);