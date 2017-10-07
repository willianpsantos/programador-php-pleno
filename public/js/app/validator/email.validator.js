(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var EmailValidator = window.Validator.extend({
            options: {
                name: 'EmailValidator',
                field: undefined,
                form: undefined,
                id: undefined
            },

            validate: function(value) {
                if(!value) {
                    return true;
                }

                var that = this,
                    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                var match = regex.test(value);

                if(!match) {
                    that.changeMessage(that.options.field, app.translate('invalidEmail'));
                    that.markInvalidated(that.options.field);
                }

                return match;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new EmailValidator());
    });
})(jQuery);
