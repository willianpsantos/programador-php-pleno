(function($){
    
    require(['app', 'kendo'], function(app, kendo) {
       var DatePicker = kendo.ui.DatePicker;
       
       window.DateEditor = DatePicker.extend({
           options: {
               name: 'DateEditor',
               culture: 'pt-BR',
               format: 'dd/MM/yyyy'
           },
           
           setMask: function() {
               var that = this;
               that.element.mask('00/00/0000');
           },
           
           value: function(date) {
               var that = this;
               
               if(date !== undefined) {
                   if(typeof date === 'string') {
                       date = new Date(date);                       
                   }
                   //else {
                   //    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
                   //}
                   
                   DatePicker.fn.value.call(that, date);
                   return;
               }
               
               var val = DatePicker.fn.value.call(that);
               return val ? val.toJSON() : null;
           },

           date: function() {
                var that = this,
                    value = that.element.val(),
                    dateParts = that.getDateParts(value);

                if(!dateParts) {
                    return null;
                }

                return new Date(dateParts.year, (dateParts.month - 1), dateParts.day);
           },

           getDateParts: function(value) {
               var regex = /^[0-9]{2}\/{1}[0-9]{2}\/{1}[0-9]{4}$/g;

               if(!regex.test(value)) {
                   return null;
               }

               var day = parseInt(value.substr(0,2)),
                   month = parseInt(value.substr(3,2)),
                   year = parseInt(value.substr(6,4));

                return {
                    day: day,
                    month: month,
                    year: year
                };
           },

           bindEvents: function() {
               var that = this;
                 
               that.element.change(function(e) {
                    e.preventDefault();
                    var input = $(e.target);

                    app.removeClassError(input);
                    app.removeIconError(input);
                    input.removeAttr('data-previous-validated', true);
                    that.wrapper.removeAttr('data-previous-validated');

                    if(!input.val()) {                        
                        return;
                    }

                    var value = input.val();
                    var dateParts = that.getDateParts(value);

                    var invalidate = function() {
                        app.invalidateItem(input, app.translate('invalidDate'));
                        input.attr('data-previous-validated', true);
                        that.wrapper.attr('data-previous-validated', true);
                    };

                    if(!dateParts) {
                        invalidate();
                        return;
                    }

                    if(dateParts.day < 1 || dateParts.day > 31) {
                        invalidate();
                        return;
                    }

                    if(dateParts.month < 1 || dateParts.month > 12) {
                        invalidate();
                        return;
                    }

                    if(dateParts.year < 1900) {
                        invalidate();
                        return;
                    }

                    var d = new Date(dateParts.year, dateParts.month, dateParts.day);
                    
                    if(isNaN(d)) {
                        app.invalidateItem(input, app.translate('invalidDate'));
                        that.wrapper.attr('data-previous-validated', true);
                    }
               });
           },
           
           init: function(element, options) {
               var that = this;
               that.options = $.extend({}, that.options, options);
               DatePicker.fn.init.call(that, element, that.options);
               that.setMask();
               that.bindEvents();
           }
       });
       
       kendo.ui.plugin(window.DateEditor);
    });
    
})(jQuery);