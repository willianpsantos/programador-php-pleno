require(['app', 'jquery', 'kendo', 'model/curso'], 

    function(app, $, kendo, model) {
        var CursoForm = window.Form.extend({
            options: {
                name: 'CursoForm',
                model: model,                
                url: app.urls.curso,
                
                rows: [
                    {
                        group: "Dados do Curso",
                        icon: "fa fa-table",
                        color: "green",
                        rows: [
                            { row: [ { field: 'idcurso' } ] },                    
                            
                            { 
                                row: [ 
                                    { field: 'titulo', span: 6 },
                                    { field: 'sigla', span: 2 } 
                                ] 
                            },

                            { row: [ { field: 'descricao', span: 8 } ] },
                            
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
        
        kendo.ui.plugin(CursoForm);
    }
            
);