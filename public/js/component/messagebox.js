(function ($) {

    var kendo = window.kendo,
        ui = kendo.ui,
        Window = ui.Window,
        extend = $.extend,
        each = $.each,
        proxy = $.proxy,        
        isArray = $.isArray,        
        ACTIVATE = 'activate',
        OPEN = 'open',
        CLOSE = 'close',
        SUBMIT = 'submit',        
        REFRESH = 'refresh',

        MessageBox = Window.extend({
            
            _cultures: {

                'pt-BR': {                    
                    no: 'Não',
                    yes: 'Sim',
                    cancel: 'Cancelar',
                    close: 'Fechar',
                    edit: 'Editar',
                    save: 'Salvar',
                    remove: 'Excluir',
                    ok: 'OK'
                },

                'en-US': {
                    no: 'No',
                    yes: 'Yes',
                    cancel: 'Cancel',
                    close: 'Close',
                    edit: 'Edit',
                    save: 'Save',
                    remove: 'Remove',
                    ok: 'OK'
                }
            },

            _renderActions: function () {

                var that = this,
                    options = that.options,
                    wrapper = that.wrapper;

                if (options.buttons && options.buttons.items && options.buttons.items.length > 0) {

                    var position = options.buttons.position || 'center',
                        container = wrapper.find('div.k-window-actions');

                    container.css('text-align', position);
                    that.containerActions = container;
                    
                    for (var key in options.buttons.items) {
                        var button = options.buttons.items[key],
                            buttonText = options.buttonText ? options.buttonText[button.name] : null;

                        if (buttonText) {
                            button.text = buttonText;
                        }
                    }

                    that.buttons = {};
                    that.hotkeys = {};

                    each(options.buttons.items, function () {
                        var html = '',
                            item = this,
                            culture = options.culture || kendo.culture().name,                            
                            text = item.text || that._cultures[culture][item.name];

                        item.disabled = item.disabled || item.enabled == false;

                        if (item.hotkey) {
                            that.hotkeys[item.hotkey] = item.name;
                        }

                        html += '<button style="margin: 0 2px;" name="' + item.name + '">';

                        if (item.iconCls) {
                            html += '<i class="' + item.iconCls + '"></i>&nbsp;';
                        }

                        html += text + '</button>';

                        var element = container.append(html).find('button[name=' + item.name + ']');

                        that.buttons[item.name] = element.kendoButton({
                            click: proxy(options.handler, that, { sender: that, button: item })
                        }).data('kendoButton');
                        
                        that.buttons[item.name].element.on('keydown', function (e) {
                            that.wrapper.children(".k-window-content").trigger(e);
                        });

                        if (item.disabled) {
                            that.buttons[item.name].enable(false);
                        }

                        if (item.visible == false) {
                            that.buttons[item.name].element.hide();
                        }
                    });
                }
            },

            _render: function () {
                var that = this,
                    wrapper = that.wrapper;

                wrapper.css('border-color', '#006ba6');
                wrapper.find('.k-window-actions').remove();

                wrapper.find('.k-window-titlebar').css({
                    'background-color': 'rgba(234, 234, 234, 0.5)',
                    'color': 'rgb(0, 107, 166)'
                });

                wrapper.find('.k-window-title').css({
                    'font-family': '"Segoe UI", Arial, Verdana, Helvetica, "Sans-Serif"',
                    'font-weight': 'bold'
                });

                wrapper.find('.k-window-title').html(wrapper.find('.k-window-title').text());

                $(that._templates.actions).insertAfter(that.element);
            },
            
            _actionsHeight: function () {
                var that = this;
                return that.wrapper.find('.k-window-actions').height() +
                       parseInt(that.wrapper.find('.k-window-actions').css('padding-top')) +
                       parseInt(that.wrapper.find('.k-window-actions').css('padding-bottom')) +
                       parseInt(that.wrapper.find('.k-window-actions').css('border-top'));

            },
            
            _headerHeight: function () {
                var that = this;
                return that.wrapper.find('span.k-window-title').height() +
                       parseInt(that.wrapper.find('div.k-window-titlebar.k-header').css('padding-top')) +
                       parseInt(that.wrapper.find('div.k-window-titlebar.k-header').css('padding-bottom'));
            },
            
            _messageHeight: function () {
                var that = this;
                return that.element.find('.message').height();
            },

            _templates: {
                actions: '<div class="k-window-actions" style="position: absolute; bottom: 0; left: 0; right: 0; border-top: solid 1px #dadada; background-color: rgba(234, 234, 234, 0.5); padding: 10px;"></div>'
            },

            _keydown: function (e) {
                var that = this,
                    keys = kendo.keys,
                    keyCode = e.keyCode,                        
                    hotkey = that.hotkeys[keyCode];

                if ($(e.currentTarget).is('[data-role=messagebox]') == false) {
                    return;
                }

                if (hotkey != undefined) {
                    that.buttons[hotkey].trigger('click');
                }
            },

            options: {
                resizable: true,
                autoDestroy: true,

                animation: {
                    open: {
                        duration: 300,
                        effects: 'zoom'
                    },

                    close: {
                        duration: 300,
                        effects: 'zoom',
                        reverse: true
                    }
                },

                culture: 'pt-BR',
                name: "MessageBox",
                title: 'Dialog Window',
                modal: true,
                pinned: true,
                visible: false,
                width: 400,
                height: 95
            },

            events: [
                ACTIVATE,
                CLOSE,
                OPEN,
                SUBMIT,                
                REFRESH
            ],

            center: function () {
                var that = this,
                    actionsBar = that.wrapper.find('.k-window-actions'),
                    top = (window.innerHeight - that.wrapper.innerHeight()) / 2;

                Window.fn.center.call(that);
                actionsBar && that.wrapper.css('top', top);
                return that;
            },
            

            init: function(element, options) {
                var that = this;
                Window.fn.init.call(that, element, options);
                
                that.bind('close', function(e) {
                    var isAutoDestroy = e.sender.options.autoDestroy !== false;
                    isAutoDestroy && e.sender.destroy();
                });
                
                //that.element.data("kendoWindow", that);
                that._render();
                that._renderActions();

                that.element.css({                    
                    position: 'absolute',
                    overflow: 'auto',
                    left: 0,
                    right: 0,
                    bottom: '46px',
                    top: '28px',
                    height: 'auto'
                });
            }
        });

    ui.plugin(MessageBox);

    window.MessageBox = {        
        OK: {
            name: 'ok',
            iconCls: 'fa fa-thumbs-up fa-lg font-green'
        },

        YES: {
            name: 'yes',
            iconCls: 'fa fa-check-circle fa-lg font-green'
        },

        NO: {
            name: 'no',
            iconCls: 'fa fa-times-circle fa-lg font-red'
        },

        CANCEL: {
            name: 'cancel',
            iconCls: 'fa fa-ban fa-lg font-red'
        },

        CLOSE: {
            name: 'close',
            iconCls: 'fa fa-ban fa-lg font-red'
        },

        QUESTION: "data:image/png;base64,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",
        INFO: "data:image/png;base64,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",
        WARNING: "data:image/png;base64,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",
        ERROR: "data:image/png;base64,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",
        SUCCESS: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAJoElEQVR42uyaa4xcZRnHf2fOXPd+6XZ3u21Z2oWmbcAlpYXWqixaI4EYwDIlEP3IB4kBSSAhEhMENDHRgChRkyYmfGlWk0ZskJuMGCJsoQqp1hK3LV1K6d5mL3M5lznnffwwZ2bOmcvusi0QEt/k7JnMnMv//77///M87/uuJiJ8nluIz3n73BMIX+wDRkbj1V8NAe2+sw0c950DLZU0P1sCwEZgP/ANYF9Xop1YOEJHoo2YHsUVxUwujasUU7k0wDHgOeBwPUIft2mrNfHIaPwu4IG2ePOOLWs2saF9gP6WAUJaCA2NkKYDGiAocVECrjik87OcXTjLqdkJpvPpM8DPgYOppGl8KgRGRuNfAZ7Zvnbztm29W+lr7iesRQiHIoS1CLY7j4ON7c6jxEJDJ6p3o6ETD3XjKBdHbGy3QNqY5eTMSd6dPHEBeCiVNJ/9xAiMjMZ14GcbO/rvu7p3K0NdW4iG4rgqx2LhFNnCWeadicA9IiAIqvRZoCW0lvbI5bRFh4hqnZiuyfnsOU7O/IeTs+MvAHenkmb6khIYGY13AYd2DGzft2f9HhLhFjKFcWasf5J1pmquF+9PALwqnpVHRAExrY11iWE6YtuxCjZvXXiDf1x4dxy4KZU0xy8JgZHR+BDw590bh4f2rP8SBTXDh/lXybtzda8XSgDFIwFKVUZABNzyiCiUgrDWzOXNe2mLDHFsaow3PxxbAO5IJc2XL4rAyGh8ABi7cdP1Azv6dzFlvsGU+W7D64vgg5IJABcfQaUq33kj0xUZZHPrPk7Nn+KVsy8bwA2ppHl0VQRGRuMJ4O83DO4c3rFuJ+dzL9VofDm9iw+cEr+EVAC4CLiq+DkR6uCqjm8yPn+G1879NQ1cm0qaZ1aTiZ+8bsPVw9f0X8WZ7O9XD15VCJTB+/ygVAW8EiFbmGNs5hDrmrvZ2XtdF3BoZDQe/VgERkbjeze0993zxfXXcTp7GMNdWFLvNWZVHnBV1Lsq670IXlH5XfnAu6ooKcu1eDv9J65o38zWzu27gAdWTMALl7+5fsPVTOSfx1a5JcG7SLkn/b3t+syqVNGsrq/XlScbF0GpIvjy/Qpc1+Gt2cNs69wK8APPjysagQNf6L9iWyI6Q86ZXsasEtCx+MBLuZeLenf9MirLRirE/OAFHCUYrsl7i6+zo2dnC/DgSgk8uH3tZUxb/2qsd1mBWVUds3rAHQHLkvIoBEZOgVJSvn7GmqQ1HEHTuMfLR40JjIzGhwc61wxbcnxVeq+YVaE8s/rlVRqFuQ+hcHYjxqLvHgWuElyRigS9+/6dfpsNTZsTXtG45Agc6Gtu53x+lrwjOErq6r06upSSk/Ilp9Lv4te7CHPn4ObLHuFX3z5Gj7EbK1siJ8GQqsBxIZcVFjMWquAA3LUcgRs1PY0rYDjCgi2kLUXGVpiuwnUrhvUnp4Zm9YdJhLlzGjcPPsKd1z9MPNLMY7cdoc/0SPiudRww80J2UXAKxXdOLX4AsMvLT7UERkbjLcAOLZwJ6N1VgukIGUuYM4W0oVi0FLmCYLrFCNLIrCW9KymCv8UDX2rRcILHbjvCQGE3dh4ME7KLQjYjWBblZ4sCR7k0h9oSwK5GIzDU0dSka1XJqV5isgqQt4RFQ5jJCPN5lwVDyJmQt8H0joIDBUdI1wHvJ/Hl4f3kLME0BMcteUZqAoPjFgC2NJqRDcXCqlJJilSMW11JeueCIWTfbyXWnyHcDOKLHqXkZEyH2H9lffAAL54+yK+PfT9wn/j84H+fZZsQY6jRCLS4Yns3SMWoVaVA6WF2XtAnN/PknUfps/ZiZfxxvCitZcGfOsjTR+/1vUe8IxjdKtFO4c2z6xJIaJoUe75OcvJHHzsvRGeu5Me3v8Latst49NY/0m/vxs5WdGvMrAx8oNf9YKV+RQu0NCJg17tBVcX7gilEp7fw+K0v0tncW2PGQl7DXKbnXyj1fDlSSTmyqTqdV0qeXjMaEcgqpdUkJ7+elQghXed7Nz1dBh+IKLcfYaO7h/1bVgi+jln94bdCqnhNcaGAbCMTT7gqjBK3Lvvyw3B55vgBHrr2Jda3bK8h8cS3niesR5cGr6iRavWsrXx4kRBAK8bI8UYj8J5V0OpoXgKFlhLI2nP8ZOzrfJCprZeWBD9WAV9OiGpl4AGU5jQmkEqaadOxTpgFzSehOqWyl2kzdprH36hPogb8+EF+MXZvUO+qVu/BIwg+oscIRTQXOLpUKfGa67TURIUACVUBkbHn+Ombd+CKszT4cqiU+kZVQbmWcpC/xaMJgHeql1yqCfwha2qIaEHZ+I0tQUlN5t/nh3/7KgVlNe55v2yqQrNfPiWzVoOP6nEc3cJbjlyymHttMjc3EdN66sjGX/cEiZ2cHeP+l65l1jgfAP/U2L3LJqdqydRbYmiPd+FGLBd4dkkCqaTpAk8tGEI41BT0Qj0pecWeq+Dc4n95+C9fY9Y4Xwa/0uRUrfcg+G6skAFwOJU0J5ZdVvGq0tPDvVf0zJvv4ygnEOaCdX4wAYmC1mgP8+Z0We9Sx6hKfPVWg14HiIUTtMe7mY+cd4FrUknz+LJTylTSzAIPTWbnWJMYBKXVyEaVZk7VoyIwZ0x/rOTUCHw4FKG/dZCcNg/w23rgGy6rpJLm7z7Kzbw6lc/SnRgE0X15QIKmDpCQgFlXo/dSyBxo28SiO0shnJ8AHlnNwtbdE4sfTWfsAr1NQ+jEak0s/kS0uuRU3Zoiraxv20zWWSCrz7jLrVY3JJBKmheAW04vfmBkbJO1TZuI6q11ZbPa5FRr2DWsaxsk68yxoCYBvptKmq9f7Or0zcCh9U39LV3RHjLWHDO5j3CUU7em8SenwORoCclE9Tg9zetIRFqYL0wyr6YIRbT7U0nzqUu1P3AVcKQ3tnbjmmgfSikWrDTzxjS2a9dGm5J8vAUwGoCPhRN0xNfQGusEhFnnArnQbBb4TippHr7UOzR9wO87wp17O8KdxELNxZmZY5KxFshai5iOsazemyKtNEVbaIm2Ew4VC7+sPU+GdMmwtzSKOBe9R+atEt8DPNqpd3e1612EtXhltiRgOSauKCzHQEQIhXQioSghTSeixwLPM50cGUlj6AsG8EvgiVTSXPjEdylHRuPt3lrlfVGJtzRprSS0NuJ607J6zxcymJLDkAUcvYAW4iDwo3pZ9hPdZvUR2QccAPaJS3tEYmhohIkT0kK44uJgISgcbLQwNvCyt1f8nBftPv194jo79Tow7B267wxwwpvLngDe8U8LL3anXvv/f6t8xu1/AwCZ+j+PVCWDlAAAAABJRU5ErkJggg==",

        alert: function (title, message, options) {
            var element = $('<span style="display: none;">' + message.trim() + '</span>').appendTo($('body')),
                width = element.width() + 64;

            element.remove();

            var configs = {
                title: title,
                message: message.trim(),                
                buttons: [window.MessageBox.OK],
                verticalAlign: 'middle',

                buttonText: {
                    ok: 'OK'
                },

                width: width ? (400 > width ? 400 : width) : 400,
                height: options && options.height || 95,
                icon: options && options.icon ? options.icon : window.MessageBox.SUCCESS
            };
            
            return window.MessageBox.show(extend(configs, options));
        },

        confirm: function (title, message, handler, options) {
            var configs = {
                title: title,
                message: message,
                buttons: [window.MessageBox.YES, window.MessageBox.NO],
                icon: window.MessageBox.QUESTION,
                verticalAlign: 'middle',

                handler: function (e) {
                    var that = this;

                    if (e.button.name != "yes")
                        return;

                    handler.call(that, e);
                }
            };

            window.MessageBox.show(extend(configs, options));
        },

        show: function (options) {
            var buttons = [];
            
            if($(".messagebox-wrap").length > 0) {
                    return;
            }

            if (options.buttons == undefined || options.buttons.length == 0) {
                buttons.push(window.MessageBox.OK);
            }
            
            var icon = options.icon ? '<div style="width: 50px; float: left; height: 100%;"><img style="width: 36px; height: 36px;" src="' + options.icon + '" /></div>' : null;
            var styles = '';
            
            if (isArray(options.styles)) {
                styles += 'style="';

                each(options.styles, function () {                    
                    var style = this,                        
                        property = Object.keys(style).toString(),                        
                        value = style[property];

                    styles += property + ': ' + value + ';';
                });
                
                styles += '"';
            } else {                
                styles = 'style="padding-top: 10px;"';                
            }

            var message = icon ? '<div><span class="messagebox-wrap">' + icon + '<div class="message" ' + styles + '>' + options.message + '</div></div></div>' : '<div><div style="top: 0; left: 0; position: relative;"><div class="message">' + options.message + '</div></div></div>';

            var configs = extend({}, options, {
                handler: function (e) {
                    var that = this;
                    e.sender.close();

                    if (options.handler) {
                        options.handler.call(that, e);
                    }
                },

                buttons: {                    
                    position: options.position,
                    items: options.buttons
                }
            });

            return $(message).kendoMessageBox(configs).data('kendoMessageBox').center().open();
        }
    };
})(jQuery);