(function($) {
    
    require(['app', 'kendo'], function(app, kendo) {
       kendo.data.binders.widget.date = kendo.data.Binder.extend({
           init: function(element, bindings, options) {
               var that = this;
                       
               kendo.data.Binder.fn.init.call(that, element, bindings, options);
               
               that.element.bind('change', function(e) {                  
                  that.change(); 
               });
           },
           
           refresh: function() {
               var that = this,
                   date = that.bindings['date'].get(),
                   editor = that.element;
           
               if(!date) {
                   editor.value(null);
                   return;
               }               
               
               if(typeof date === 'string') {
                   date = new Date(date);
               }
               
               editor.value(date);
           },
           
           change: function() {
               var that = this,
                   editor = that.element,
                   value = editor.value();
           
               that.bindings['date'].set(value);
           }
       });
    });
    
})(jQuery);