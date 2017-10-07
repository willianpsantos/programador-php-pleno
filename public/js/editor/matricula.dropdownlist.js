(function($) {
   require(['model/matricula', 'app', 'kendo'], function(model, app, kendo) {
      
       var MatriculaDropDownList = window.LookupDropDownList.extend({
          options: {
              name: 'MatriculaDropDownList',
              viewmodel: 'viewmodel/matricula',
              model: model,
              url: app.urls.matricula.all,
              dataTextField: 'idaluno',
              dataValueField: 'idmatricula',
              initialFilter: [{ field: 'situacao', operator: 'eq', value: 'A' }],

              template: ' <span> <b> #= data.aluno.nome # </b> </span> ' + 
                        ' # if (data.turma || data.periodo_letivo) { # ' +
                        '    <small> ( ' +
                        '        # if(data.turma) { # ' +
                        '            Turma: #= data.turma #  ' +
                        '        # } # '+
                        
                        '        # if(data.periodo_letivo) { # ' +
                        '            Periodo Letivo: #= data.periodo_letivo #  ' +
                        '        # } # '+
                        '    ) </small> ' +
                        ' # } # ',

                valueTemplate:  ' <span> <b> #= data.aluno.nome # </b> </span> ' + 
                                ' # if (data.turma || data.periodo_letivo) { # ' +
                                '    <small> ( ' +
                                '        # if(data.turma) { # ' +
                                '            Turma: #= data.turma #  ' +
                                '        # } # '+
                                
                                '        # if(data.periodo_letivo) { # ' +
                                '            Periodo Letivo: #= data.periodo_letivo #  ' +
                                '        # } # '+
                                '    ) </small> ' +
                                ' # } # ',
          },
          
          init: function(element, options) {
              var that = this;
              window.LookupDropDownList.fn.init.call(that, element, options);
          }
      });
      
      kendo.ui.plugin(MatriculaDropDownList);
   });
})(jQuery);


