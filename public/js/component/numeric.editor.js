Number.prototype.format = function(n) {    
    var x = this.toLocaleString(),
        formatRegex = /^[0-9\.]+(,{1}[0-9]+)$/g,
        integerFormatRegex = /^[0-9\.]+$/g;

    var fn = function(n) {
        var a;

        if(n) {
            a = this.toFixed(Math.max(0, (n)));
        }
        else {
            a = this.toLocaleString();
        }

        return a;
    };

    if(formatRegex.test(x)) {
        var y = x.replace(',', 'Z')
                 .replace('.', ',')
                 .replace('Z', '.');

        x = fn.call(parseFloat(y), n);
    }
    else if(integerFormatRegex.test(x)) {
        if(!x.endsWith('.00') && !n) {
            return x + ",00";
        }
        else {
            var c = ",";

            for(var i = 0; i < n; i++) {
                c += "0";
            }

            return x + c;
        }
    }    
    
    if(n) {
        x = this.toFixed(Math.max(0, (n)));
    }
    else {
        x = this.toLocaleString();
    }    
    
    return x.replace('.', ',');
};

Number.prototype.currency = function(n, cur) {
    var onlyNumbers = /^[0-9]+$/g,
        c;

    if(n && !cur && typeof n == 'string' && !onlyNumbers.test(n)) {
        c = n;
        n = 2;
    }
    else if(typeof n == 'number' && !cur) {
        c = "R$";
    }
    else if(cur) {
        c = cur;
    }
    else {
        c = "R$";
    }

    var number = this.format(n);
    return c + " " + number;
};

String.prototype.toNumber = function(n) {
    if(this.endsWith(',') || this.endsWith('.')) {
        return this;
    }
    
    if(this.indexOf(',') < 0) {
        if(this.indexOf('.') > -1) {
            return parseFloat(this);
        }
        
        return parseInt(this);
    }
    
    var x = this.replace('.', 'Z');
    x = x.replace(',', '.');
    x = x.replace('Z', '');
    
    return parseFloat(x).toFixed(n ? n : 2);
};

var CHANGE = "change";

(function($){
    
    require(['app', 'kendo'], function(app, kendo) {
        var Widget = kendo.ui.Widget;
        
        window.NumericEditor = Widget.extend({
            options: {
                name: 'NumericEditor',
                decimals: 2,
                currency: 'R$',
                allowMinus: false,
                onlyNumbers: false,
                autoFormat: true,
                min: -99999999999999,
                max: 99999999999999
            },
            
            _events: [
                CHANGE
            ],
            
            isNumber: function(value) {
                return (this.options.onlyNumbers ? /^([\d])+$/g.test(value) : /^([\d.,])+$/g.test(value));
            },
            
            enable: function (e) {
                (e === undefined || e === true)
                ? this.element.removeAttr('disabled')
                : this.element.attr('disabled', 'disabled');
            },
            
            value: function(number) {
                var that = this;
                
                if(number === undefined) {
                    return that.element.val().toNumber(that.options.decimals);
                }

                if(number === null || number === '') {
                    that.element.val('');
                    return;
                }
                
                if(!that.isNumber(number)) {
                    that.element.val('0');
                    return;
                }

                if(that.options.autoFormat === false) {
                    that.element.val(number);               
                    that.trigger('change');
                    return;
                }

                if(typeof number === 'string') {
                    var y = number.replace(',', 'Z')
                                  .replace('.', ',')
                                  .replace('Z', '.');

                    number = parseFloat(y);   
                }

                number = number.format(that.options.decimals);
                that.element.val(number);
                that.trigger('change');
            },           
            
            bindEvents: function() {
                var that = this;
                
                that.element.keypress(function(e) {
                    var value = $(this).val();

                    var valid = (
                                  (that.options.allowMinus || e.key != '-')                         &&
                                    (e.key != '.')                                                  &&
                                      ((e.keyCode == 8 || e.keyCode == 46) || that.isNumber(e.key)) &&
                                        (value.length < 18)
                                );

                    if(!valid) {
                        return valid;
                    }

                    if(value.indexOf(',') > 0) {
                        value = parseFloat(value.replace(',', '.'));
                    }
                    else if(value.indexOf('.') > 0) {
                        value = parseFloat(value);
                    }
                    else {
                        value = parseInt(value);
                    }

                    return true;
                });
                
                that.element.change(function(e) {
                    if(that.element.val().replace(/^([,])+$/g, '').length == 0) {
                        that.element.val('');
                    }

                    that.trigger('change');
                });
                
                that.element.keyup(function(e) {
                    var value = $(this).val();

                    if(value < that.options.min) {
                        $(this).val(that.options.min);
                        return false;
                    } else if (value > that.options.max) {
                        $(this).val(that.options.max);
                        return false;
                    }
                });
            },

            visible: function(value) {
                var that = this;
                
                if(value === undefined || value === true) {
                    that.element.closest('[class^=span]').show();
                }
                else {
                    that.element.closest('[class^=span]').hide();
                }
            },
            
            init: function(element, options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
                that.events = that._events;
                Widget.fn.init.call(that, element, that.options);
                that.bindEvents();
            }
        });
        
        kendo.ui.plugin(window.NumericEditor);
    });
    
})(jQuery);