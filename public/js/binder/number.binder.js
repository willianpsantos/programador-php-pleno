(function($) {
    
    require(['app', 'kendo'], function(app, kendo) {
       kendo.data.binders.widget.number = kendo.data.Binder.extend({
           init: function(element, bindings, options) {
               var that = this;
                       
               kendo.data.Binder.fn.init.call(that, element, bindings, options);
               
               that.element.bind('change', function(e) {                  
                  that.change(); 
               });
           },
           
           refresh: function() {
               var that = this,
                   number = that.bindings['number'].get(),
                   editor = that.element;
           
               if(!number || !editor) {
                   editor.value(0);
                   return;
               }
               
               if(typeof number === 'number') {
                   if(editor.options.autoFormat === undefined || editor.options.autoFormat === true) {
                       editor.value(number.format(editor.options.decimals));
                   }
                   else {
                       editor.value(number);
                   }
               }
               else {
                   if(editor.options.autoFormat === undefined || editor.options.autoFormat === true) {
                       editor.value(number.toNumber().format(editor.options.decimals));
                   }
                   else {
                       editor.value(number);
                   }                   
               }
           },
           
           change: function() {
               var that = this,
                   editor = that.element,
                   value = editor.value();
           
               that.bindings['number'].set(value);
           }
       });
    });
    
})(jQuery);