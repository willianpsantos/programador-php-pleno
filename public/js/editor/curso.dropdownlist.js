(function($) {
   require(['model/curso', 'app', 'kendo'], function(model, app, kendo) {
      
       var CursoDropDownList = window.LookupDropDownList.extend({
          options: {
              name: 'CursoDropDownList',
              viewmodel: 'viewmodel/curso',
              model: model,
              url: app.urls.curso.all,
              dataTextField: 'titulo',
              dataValueField: 'idcurso',
              initialFilter: [{ field: 'situacao', operator: 'eq', value: 'A' }],
              
              template: ' <span> <b> #= data.titulo # </b> </span> ' + 
                        ' # if (data.sigla) { # ' +
                        '    <small> ( #= data.sigla # ) </small> ' +
                        ' # } # ',

              valueTemplate: ' <span> <b> #= data.titulo # </b> </span> ' + 
                             ' # if (data.sigla) { # ' +
                             '    <small> ( #= data.sigla # ) </small> ' +
                             ' # } # '
          },
          
          init: function(element, options) {
              var that = this;
              window.LookupDropDownList.fn.init.call(that, element, options);
          }
      });
      
      kendo.ui.plugin(CursoDropDownList);
   });
})(jQuery);


