define('viewmodel/curso', ['app', 'jquery', 'kendo', 'model/curso'], 

    function(app, $, kendo, model) {
        var CursoViewModel = window.ViewModel.extend({
            options : {
                name: 'CursoViewModel',
                model: model,
                withWidget: true,
                title: '<i class="fa fa-list"></i> &nbsp; Cursos',
                newButtonText: 'Adicionar Novo Curso',           
                url: app.urls.curso,
           
                tab: {
                    items: [
                        { text: 'Lista', content: '' },
                        { text: 'Dados', content: '' }
                    ]
                },
           
                grid: {
                    width: 'adjust',
                    
                    customFilterables: {
                        'situacao': {
                            ui: 'situacaodropdownlist'
                        }
                    },
                    
                    columns: [
                        { field: 'idcurso', title: 'Código', minScreenWidth: 500, width: '10%' },
                        { field: 'titulo', title: 'Tìtulo do Curso', width: '55%' },
                        { field: 'sigla', title: 'Sigla', width: '55%' },
                        
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
                
                form: kendo.ui.CursoForm
            },
            
            load: function(element, options) {
                var that = this;
                window.ViewModel.fn.load.call(that, element, options);
            }
        });
    
        return new CursoViewModel();
    }
);