(function($) {
    require(['app', 'kendo'], function(app, kendo){
        window.Validator = kendo.Class.extend({
            options: {
                name: 'Validator',
                field: undefined,
                form: undefined,
                id: undefined,
                dotReplaceChar: 'Z'
            },

            markInvalidated: function(field) {
                var that = this,
                    item = that.options.form.formElement.find('#' + field.replace('.', that.options.dotReplaceChar)),
                    message = item.attr('data-required');

                app.invalidateItem(item, message);
            },

            setOptions: function(options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
            },

            changeMessage: function(field, message) {
                var that = this;
                that.options.form.changeRequiredMessage(field, message);
            },

            validate: function(value) {
                return true;
            },

            init: function(options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
            }
        });
    });
})(jQuery);