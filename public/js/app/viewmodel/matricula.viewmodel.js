define('viewmodel/matricula', ['app', 'jquery', 'kendo', 'model/matricula'], 

    function(app, $, kendo, model) {
        var MatriculaViewModel = window.ViewModel.extend({
            options : {
                name: 'MatriculaViewModel',
                model: model,
                withWidget: true,
                title: '<i class="fa fa-list"></i> &nbsp; Matricula de Alunos nos Cursos',
                newButtonText: 'Adicionar Nova Matricula',           
                url: app.urls.matricula,

                childrenViewModels: [
                    'viewmodel/matriculacurso'
                ],
           
                tab: {
                    items: [
                        { text: 'Lista', content: '' },
                        { text: 'Dados', content: '' },
                        { text: 'Cursos', content: '' },
                    ]
                },
           
                grid: {
                    width: 'adjust',
                    
                    customFilterables: {
                        'situacao': {
                            ui: 'situacaodropdownlist'
                        },

                        'idaluno': {
                            ui: function(element) {
                                var editor = element.kendoAlunoDropDownList({}).data('kendoAlunoDropDownList');
                                editor.fetchData();
                            }
                        }                        
                    },
                    
                    columns: [
                        { field: 'idmatricula', title: 'Código', minScreenWidth: 500, width: '10%' },
                        { field: 'idaluno', title: 'Aluno', width: '55%', template: '<span> #= data.aluno ? data.aluno.nome : "" # </span>' },
                        { field: 'turma', title: 'turma', width: '15%' },
                        { field: 'periodo_letivo', title: 'Período Letivo', width: '10%' },
                        
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
                
                form: kendo.ui.MatriculaForm
            },
            
            load: function(element, options) {
                var that = this;
                window.ViewModel.fn.load.call(that, element, options);

                that.bind('childViewModelRender', function(e) {
                    var vm = e.viewmodel,
                        grid = e.sender.grid;

                    vm.bind('popupOpen', $.proxy(function(e) {
                        var form = vm.form,
                            selected = grid.dataItem(),                            
                            field = 'idmatricula',                                       
                            editor = form.getEditor(field);
                            
                        if(!editor) {
                            return;
                        }
                        
                        if(!selected) {
                            return;
                        }
                        
                        editor.filterData(selected);                        
                        editor.enable(false);
                        form.dataItem().set(field, selected.idmatricula);
                    }, vm));
                });

                that.tab.bind('select', function(e){
                    var index = that.tabIndex(e.item);
                    
                    if(index === 0 || index === 1) { //0 - Lista, 1 - Form
                        return;
                    }
                    
                    var vm = that.childrenViewModels[index - 2],
                        dataItem = that.grid.dataItem();

                    if(!dataItem) {
                        return;
                    }

                    if(vm.searched === true) {
                        return;
                    }
                    
                    var handler = function(e) {
                        app.hideLoading();
                        e.sender.unbind('dataBound', handler);
                    };

                    vm.grid.bind('dataBound', handler);
                    app.showLoading();

                    vm.applyFilter({
                        field: 'idmatricula',
                        operator: 'eq',
                        value: dataItem.idmatricula
                    });
                    
                    vm.setTitle('Cursos da Matricula do Aluno [' + dataItem.aluno.nome.toUpperCase() + ']');                                    
                });
            }
        });
    
        return new MatriculaViewModel();
    }
);