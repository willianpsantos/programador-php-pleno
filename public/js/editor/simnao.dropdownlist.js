(function($) {
   require(['app', 'kendo'], function(app, kendo) {
      var SimNaoDropDownList = kendo.ui.DropDownList.extend({
          options: {
              name: 'SimNaoDropDownList',
              autoBind: true,
              valuePrimitive: true,
              dataTextField: 'text',
              dataValueField: 'value',
              
              dataSource: {
                  data: [
                      { text: 'Sim', value: 'S' },
                      { text: 'Não', value: 'N' }
                  ]
              }
          },
          
          init: function(element, options) {
              var that = this;
              kendo.ui.DropDownList.fn.init.call(that, element, options);
          }
      });
      
      kendo.ui.plugin(SimNaoDropDownList);
   });
})(jQuery);


