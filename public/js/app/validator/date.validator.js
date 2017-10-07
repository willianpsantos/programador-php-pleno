(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var DateValidator = window.Validator.extend({
            options: {
                name: 'DateValidator',
                field: undefined,
                form: undefined,
                id: undefined
            },
            
            setOptions: function(options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
            },

            validate: function(value) {
                if(!value) {
                    return true;
                }
                
                var that = this;

                if(isNaN(Date.parse(value))) {
                    that.changeMessage(that.options.field, app.translate('invalidDate'));
                    that.markInvalidated(that.options.field);
                    return false;
                }
                
                return true;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new DateValidator());
    });
})(jQuery);
