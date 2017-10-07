(function($) {
    require(['app', 'kendo'], function(app, kendo) {
        var NameValidator = window.Validator.extend({
            options: {
                name: 'NameValidator',
                field: undefined,
                form: undefined,
                id: undefined
            },

            validate: function(value) {
                if(!value) {
                    return true;
                }

                value = value.trim();

                var that = this,
                    regex = /^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g,
                    regexSpace = /^\s+|\s+$/g;

                var match = regex.test(value);

                if(!match) {
                    that.changeMessage(that.options.field, app.translate('invalidName'));
                    that.markInvalidated(that.options.field);
                }
                else if(regexSpace.test(value)) {
                    match = false;
                    that.changeMessage(that.options.field, app.translate('textWithSpaces'));
                    that.markInvalidated(that.options.field);
                }

                return match;
            },

            init: function(options) {
                var that = this;                
                window.Validator.fn.init.call(that, options);
            }
        });

        app.registerValidator(new NameValidator());
    });
})(jQuery);
