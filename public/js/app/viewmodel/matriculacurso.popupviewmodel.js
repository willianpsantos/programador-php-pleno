define('viewmodel/matriculacurso', ['app', 'jquery', 'kendo', 'model/matriculacurso'], 

    function(app, $, kendo, model) {
        var MatriculaCursoPopupViewModel = window.PopupViewModel.extend({
            name: 'matriculacurso',
            
            options : {
                name: 'MatriculaCursoPopupViewModel',
                model: model,
                withWidget: true,
                popupTitle: 'Inserir/Alterar Curso da Matricula',
                newButtonText: 'Adicionar Novo Curso á Matricula',           
                url: app.urls.matriculacurso,
           
                grid: {
                    width: 'adjust',
                    initialFilter: undefined,
                    
                    customFilterables: {
                        'idcurso': {
                            ui: function(element) {
                                var editor = element.kendoCursoDropDownList({}).data('kendoCursoDropDownList');
                                editor.fetchData();
                            }
                        },

                        
                        'situacao': {
                            ui: 'situacaodropdownlist'
                        }                        
                    },
                    
                    columns: [
                        { field: 'idmatricula_curso', title: 'Código', minScreenWidth: 500, width: '7%' },                                                
                        
                        { 
                            field: 'idcurso', 
                            title: 'Curso', 
                            width: '25%',
                            template: '<span> #= data.curso.titulo + (data.curso.sigla ? "(" + data.curso.sigla + ")" : "") # </span> '
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
                
                form: kendo.ui.MatriculaCursoForm
            },
       
            load: function(element, options) {
                var that = this;
                window.PopupViewModel.fn.load.call(that, element, options);
            }
        });
    
        return new MatriculaCursoPopupViewModel();
    }
);