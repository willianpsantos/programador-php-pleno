var Script = function () {

    //    sidebar dropdown menu
    require(['app'], function (app) {
        jQuery('#sidebar .sub-menu > a').click(function () {
            var last = jQuery('.sub-menu.open', $('#sidebar')),
                lastActive = jQuery('.sub-menu.active', $('#sidebar'));

            last.removeClass("open").removeClass('active');
            lastActive.removeClass('active');

            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var sub = jQuery(this).next();

            if(sub.length === 0) {
                $(this).parent().addClass('active');
                var moduleName = $(this).attr('data-menu-name');
                app.loadViewModel(moduleName);
                return;
            }

            $(this).parent().addClass('active');

            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            }
            else {                
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }

            var o = ($(this).offset());
            diff = 200 - o.top;

            if (diff > 0)
                $(".sidebar-scroll").scrollTo("-=" + Math.abs(diff), 500);
            else
                $(".sidebar-scroll").scrollTo("+=" + Math.abs(diff), 500);
        });

        jQuery('.menu-card > a').click(function () {            
            var moduleName = $(this).attr('data-menu-name');
            app.loadViewModel(moduleName);                            
        });


        // Sidebar toggle
        $('.icon-reorder').click(function () {
            // Ocultar o Sidebar
            if ($('#sidebar').find('ul').is(':visible') === true) {
                $('#sidebar').stop().slideUp(500, function () {
                    $('#sidebar').addClass('collapse');
                    $("#container").addClass("sidebar-closed");
                    $(".sidebar-scroll").addClass("hide");

                    var viewmodel = app.currentViewModel();
                    
                    if (viewmodel) {
                        require(["viewmodel/" + viewmodel.viewmodel], function(vm) {
                            vm && vm.resize();
                        });                            
                    }
                });
            } 
            // Mostrar o Sidebar
            else {
                $('#sidebar').removeClass('collapse');
                $("#container").removeClass("sidebar-closed");
                $(".sidebar-scroll").removeClass("hide");

                var viewmodel = app.currentViewModel();
                
                if (viewmodel) {
                    require(["viewmodel/" + viewmodel.viewmodel], function(vm) {
                        vm && vm.resize();
                    });                            
                }
                $('#sidebar').stop().slideDown(500, function () {

                });
            }
            
        });


        // custom scrollbar
        $(".sidebar-scroll").niceScroll({ styler: "fb", cursorcolor: "#4A8BC2", cursorwidth: '5', cursorborderradius: '0px', background: '#404040', cursorborder: '' });

        $(".portlet-scroll-1").niceScroll({ styler: "fb", cursorcolor: "#4A8BC2", cursorwidth: '5', cursorborderradius: '0px', background: '#404040', cursorborder: '' });

        $(".portlet-scroll-2").niceScroll({ styler: "fb", cursorcolor: "#4A8BC2", cursorwidth: '5', cursorborderradius: '0px', autohidemode: false, cursorborder: '' });

        $(".portlet-scroll-3").niceScroll({ styler: "fb", cursorcolor: "#4A8BC2", cursorwidth: '5', cursorborderradius: '0px', background: '#404040', autohidemode: false, cursorborder: '' });

        $("html").niceScroll({ styler: "fb", cursorcolor: "#4A8BC2", cursorwidth: '8', cursorborderradius: '0px', background: '#404040', cursorborder: '', zindex: '1000' });


        // theme switcher
        var scrollHeight = '60px';

        jQuery('#theme-change').click(function () {
            if ($(this).attr("opened") && !$(this).attr("opening") && !$(this).attr("closing")) {
                $(this).removeAttr("opened");
                $(this).attr("closing", "1");

                $("#theme-change").css("overflow", "hidden").animate({
                    width: '20px',
                    height: '22px',
                    'padding-top': '3px'
                }, {
                        complete: function () {
                            $(this).removeAttr("closing");
                            $("#theme-change .settings").hide();
                        }
                    });
            } else if (!$(this).attr("closing") && !$(this).attr("opening")) {
                $(this).attr("opening", "1");

                $("#theme-change").css("overflow", "visible").animate({
                    width: '226px',
                    height: scrollHeight,
                    'padding-top': '3px'
                }, {
                        complete: function () {
                            $(this).removeAttr("opening");
                            $(this).attr("opened", 1);
                        }
                    });
                $("#theme-change .settings").show();
            }
        });


        jQuery('#theme-change .colors span').click(function () {
            var color = $(this).attr("data-style");
            setColor(color);
        });


        jQuery('#theme-change .layout input').change(function () {
            setLayout();
        });


        var setColor = function (color) {
            $('#style_color').attr("href", "css/style-" + color + ".css");
        }


        // widget tools
        jQuery('.widget .tools .icon-chevron-down').click(function () {
            var el = jQuery(this).parents(".widget").children(".widget-body");

            if (jQuery(this).hasClass("icon-chevron-down")) {
                jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                el.slideDown(200);
            }
        });

        jQuery('.widget .tools .icon-remove').click(function () {
            jQuery(this).parents(".widget").parent().remove();
        });


        //    tool tips
        $('.element').stop().tooltip();
        $('.tooltips').stop().tooltip();


        //    popovers
        $('.popovers').popover();


        //   scroller
        $('.scroller').slimscroll({
            height: 'auto'
        });

        //   trocar empresa
        $('#change-company').click(function (e) {
            e.preventDefault();

            var popupElement = $('div#change-company-popup'),
                popup = null;

            if (popupElement.length > 0) {
                popup = popupElement.data('kendoTrocaEmpresaPopup');

                if (popup) {
                    popup.destroy();
                }

                popupElement.each(function () {
                    this.remove();
                });
            }

            popupElement = $('<div id="change-company-popup"></div>').appendTo($('body'));
            popup = popupElement.kendoTrocaEmpresaPopup().data('kendoTrocaEmpresaPopup');
            popup.center().open();
        });
    });
}();