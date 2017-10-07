(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var CoordenadaValidator = window.Validator.extend({
            options: {
                name: 'CoordenadaValidator',
                field: undefined,
                form: undefined,
                id: undefined
            },

            validate: function(value) {
                if(!value) {
                    return true;
                }

                var that = this,
                    regex = /(\-?[0-9]{1,3}\.?[0-9]{0,8})/g;

                var match = regex.test(value);

                if(!match) {
                    that.changeMessage(that.options.field, app.translate('invalidCoord'));
                    that.markInvalidated(that.options.field);
                }

                return match;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new CoordenadaValidator());
    });
})(jQuery);
