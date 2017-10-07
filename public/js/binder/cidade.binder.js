(function($) {
    
    require(['app', 'kendo'], function(app, kendo) {
       kendo.data.binders.widget.city = kendo.data.Binder.extend({
           init: function(element, bindings, options) {
               var that = this;
               kendo.data.Binder.fn.init.call(that, element, bindings, options);
               
               that.element.bind('change', function(e) {
                  that.change(); 
               });
           },
           
           refresh: function() {
               var that = this,
                   city = that.bindings['city'].get(),
                   cityEditor = that.element;
           
               if(!cityEditor) {
                   return;
               }

               if(!city) {
                   cityEditor.select(0);
                   return;
               }
             
               $.ajax({
                  type: 'GET',
                  url: app.urls.cadastro.cidades.getById.rawUrl(city),
                  async: false,
                  dataType: 'json',
                  
                  success: function(result) {
                      var handlerSelectCity = function(e) {
                          var editor = e.sender,
                              data = editor.dataSource.data();

                          if(!data || data.length == 0) {
                              editor.select(0);
                              editor.element.val('');
                              return;
                          }

                          editor.value(city);
                          editor.element.val(city);
                          editor.unbind('dataBound', handlerSelectCity);
                      };

                      cityEditor.bind('dataBound', handlerSelectCity);                      
                      cityEditor.ufEditor.value(result.uf);
                      cityEditor.filterCities(result.uf);
                  },
                  
                  error: function(a,b,c) {
                      app.ajaxError(a,b,c);
                  }
               });
           },
           
           change: function() {
               var that = this,
                   value = that.element.value();
           
               that.bindings['city'].set(+value);
           }
       });
    });
    
})(jQuery);