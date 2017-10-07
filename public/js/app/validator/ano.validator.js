(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var AnoValidator = window.Validator.extend({
            options: {
                name: 'AnoValidator',
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

                var that = this,
                    d = new Date(),
                    year = d.getFullYear();

                var ano_valido = (value >= year) && (value <= year + 10);

                if(!ano_valido) {
                    that.changeMessage(that.options.field, app.translate('invalidYear'));
                    that.markInvalidated(that.options.field);
                }

                return ano_valido;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new AnoValidator());
    });
})(jQuery);
