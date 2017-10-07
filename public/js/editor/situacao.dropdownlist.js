(function($) {
   require(['app', 'kendo'], function(app, kendo) {
      var SituacaoDropDownList = kendo.ui.DropDownList.extend({
          options: {
              name: 'SituacaoDropDownList',
              autoBind: true,
              valuePrimitive: true,
              dataTextField: 'text',
              dataValueField: 'value',
              
              dataSource: {
                  data: [
                      { text: 'Ativo', value: 'A' },
                      { text: 'Inativo', value: 'I' }
                  ]
              }
          },
          
          init: function(element, options) {
              var that = this;
              kendo.ui.DropDownList.fn.init.call(that, element, options);
          }
      });
      
      kendo.ui.plugin(SituacaoDropDownList);
   });
})(jQuery);


