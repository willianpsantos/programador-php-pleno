define('viewmodel/aluno', ['app', 'jquery', 'kendo', 'model/aluno'], 

    function(app, $, kendo, model) {
        var AlunoViewModel = window.ViewModel.extend({
            options : {
                name: 'AlunoViewModel',
                model: model,
                withWidget: true,
                title: '<i class="fa fa-list"></i> &nbsp; Alunos',
                newButtonText: 'Adicionar Novo Aluno',           
                url: app.urls.aluno,
           
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
                        { field: 'idaluno', title: 'Código', minScreenWidth: 500, width: '10%' },
                        { field: 'nome', title: 'Nome do Aluno', width: '55%' },
                        { field: 'email', title: 'E-mail', width: '55%' },
                        
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
                
                form: kendo.ui.AlunoForm
            },
            
            load: function(element, options) {
                var that = this;
                window.ViewModel.fn.load.call(that, element, options);
            }
        });
    
        return new AlunoViewModel();
    }
);