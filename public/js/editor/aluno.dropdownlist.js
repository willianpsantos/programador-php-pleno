(function($) {
   require(['model/aluno', 'app', 'kendo'], function(model, app, kendo) {
      
       var AlunoDropDownList = window.LookupDropDownList.extend({
          options: {
              name: 'AlunoDropDownList',
              viewmodel: 'viewmodel/aluno',
              model: model,
              url: app.urls.aluno.all,
              dataTextField: 'nome',
              dataValueField: 'idaluno',
              initialFilter: [{ field: 'situacao', operator: 'eq', value: 'A' }]
          },
          
          init: function(element, options) {
              var that = this;
              window.LookupDropDownList.fn.init.call(that, element, options);
          }
      });
      
      kendo.ui.plugin(AlunoDropDownList);
   });
})(jQuery);


