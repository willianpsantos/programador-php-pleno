(function($){
    
    var CLEAR = "clear";
    
    require(['app', 'kendo'], function(app, kendo){
        
        var DropDownList = kendo.ui.DropDownList;
        
        window.LookupDropDownList = DropDownList.extend({
            templates : {
                openBtn: '<button id="openBtn" name="openBtn" style="color:green; font-weight:bold; margin-right:2px;"> ' +
                '    <i class="fa fa-search"></i> ' +
                '</button>',
                
                clearBtn: '<button id="clearBtn" name="clearBtn" style="color:red; font-weight:bold;"> ' +
                '    <i class="fa fa-minus-circle"></i> ' +
                '</button>',              
                
                modalClient: {
                    html: '<div id="{name}" name="{name}" style="display:none;"></div>'
                }
            },
            
            options : {
                name: 'LookupDropDownList',
                autoBind: false,
                dataTextField: undefined,
                dataValueField: undefined,
                viewmodel: undefined,
                model: undefined,
                url: undefined,
                pageSize: app.defaultPageSize,
                filter: "startswith",
                initialFilter: undefined,
                initialSort: undefined,
                minLength: 3,
                width: "100%",
                mandatory: false,
                valuePrimitive: true,
                showSearchButton: true,
                showClearButton: true,
                inForm: false,
                beforeSend: undefined
            },
            
            _events: [
                CLEAR
            ],
            
            selectedItem: function() {
                var that = this;
                
                if(!that.viewmodel)
                    return null;
                
                return that.viewmodel.grid.dataItem();
            },
            
            filterData: function(dataItem, parent){
                var that = this,
                    model = new that.options.model(dataItem);
            
                that.clear(false);

                var idField = model.idField,
                    data = that.dataSource.data(),
                    exists = false;

                var select = function(d) {
                    var eq = (d[idField] == model.get(model.idField));
                    return eq;
                };

                for(var i = 0; i < data.length; i++) {
                    var item = data[i];

                    if(model.get(idField) == item[idField]) {
                        that.select(select);
                        that.trigger('change');
                        exists = true;
                        break;
                    }
                }

                if(exists) {
                    if(parent) {
                        parent.set(idField, model.get(idField));
                    }

                    that.element.val(model.get(idField));
                    return;
                }

                that.dataSource.data([]);
                that.dataSource.data([model]);
                that.refresh();                
                that.select(select); 
                that.element.val(model.get(idField));

                if(parent) {
                    parent.set(idField, model.get(idField));
                }

                that.trigger('change');                
            },           
            
            openWindow: function() {
                var that = this,
                width = $(window).width() - 100,
                height = $(window).height() - 50,
                name = that.element.attr('id') + '-popup-dropdownlist';
                
                var element = $('#' + name);
                
                if(element.length > 0) {
                    var data = element.data();
                    
                    if(data && data.handler) {
                        data.handler.destroy();
                    }
                    
                    element.each(function() {
                        this.remove();
                    });
                }
                
                var html = that.templates
                               .modalClient
                               .html
                               .replace(/\{name\}/g, name);
                
                element = $(html).appendTo(document.body);
                
                that.messageBox = element.kendoMessageBox({
                    width: width,
                    height: height,
                    title: 'Pesquisa Avançada',
                    
                    buttons: {
                        items: [
                            {
                                name: 'ok',
                                text: 'OK',
                                iconCls: 'fa fa-check-circle font-green'
                            },
                            
                            {
                                name: 'close',
                                text: 'Fechar',
                                iconCls: 'fa fa-times-circle font-red',
                                
                            }
                        ]
                    },
                    
                    handler: function (e) {
                        switch (e.button.name) {
                            case 'ok':
                                var opener = e.sender.opener,
                                dataItem = opener.selectedItem();
                                
                                if(!dataItem)
                                    return;
                                
                                opener.filterData(dataItem);
                                e.sender.close();                                
                                break;

                            case 'close':                            
                                e.sender.close();                               
                                break;
                        }
                    },
                    
                    open: function (e) {                    
                        var element = e.sender.element,
                        viewmodel = that.options.viewmodel;
                        
                        if(!viewmodel)
                            return;
                        
                        if(that.viewmodel) {
                            that.viewmodel.destroy();
                        }
                        
                        if(typeof viewmodel === 'string') {
                            require([viewmodel], function(vm) {
                                vm.load(element, {
                                    withWidget: false,
                                    initialFilter: that.options.initialFilter,
                                    readOnly: false,
                                    autoShowForm: false,
                                    beforeSend: that.options.beforeSend
                                });
                                
                                that.viewmodel = vm;
                            });
                        }
                        else if(typeof viewmodel === 'object') {
                            viewmodel.load(element, {
                                withWidget: false,
                                initialFilter: that.options.initialFilter,
                                readOnly: false,
                                autoShowForm: false,
                                beforeSend: that.options.beforeSend
                            });
                            
                            that.viewmodel = viewmodel;
                        }
                    },
                    
                    close: function(e) {
                        that.viewmodel = undefined;
                        delete that.viewmodel;
                        
                        that.messageBox = undefined;
                        delete that.messageBox;
                    }
                }).data('kendoMessageBox');
                
                that.messageBox.opener = that;
                that.messageBox.center().open();
            },
            
            clear: function(read) {
                var that = this;         
                that.element.val('');       
                
                if(read === undefined || read === true) {
                    that.dataSource.read();
                }

                that.select(0);
                that.close();
                that.trigger(CLEAR);

                var parent = that.element.parent();

                if(parent && parent.length > 0) {
                    parent = parent.parent();

                    if(parent && parent.length > 0) {
                        parent = parent.find("button[type='reset']");

                        if(parent.length > 0) {
                            parent[0].click();
                        }
                    }
                }
            },
            
            renderButtons: function() {
                var that = this;
                var openBtn = $(that.templates.openBtn).appendTo(that.wrapper);
                var clearBtn = $(that.templates.clearBtn).appendTo(that.wrapper);
                
                that.openBtn = openBtn.kendoButton({
                    click: function(e) {
                        e.preventDefault();
                        that.openWindow();
                        e.event.stopImmediatePropagation();
                    }
                }).data('kendoButton');
                
                if(that.options.showSearchButton === false) {
                    that.openBtn.element.hide();
                }
                
                that.clearBtn = clearBtn.kendoButton({
                    click: function(e) {
                        e.preventDefault();
                        that.clear();
                        e.event.stopImmediatePropagation();
                    }
                }).data('kendoButton');
                if(that.options.showClearButton === false) {
                    that.clearBtn.element.hide();
                }
            },
            
            createDataSource: function() {
                var that = this;
                
                that.dataSource = new kendo.data.DataSource({
                    page: 1,
                    pageSize: that.options.pageSize,
                    serverFiltering: true,
                    serverSorting: true,
                    serverPaging: true,
                    
                    schema: {
                        model: that.options.model,
                        data: 'data',
                        total: 'total'
                    },
                    
                    filter: that.options.initialFilter,
                    sort: that.options.initialSort,                   
                    
                    transport: {
                        read: function (options) {
                            app.showLoading();

                            $.ajax({
                                type: 'GET',
                                cache: false,
                                url: that.options.url,
                                data: options.data,
                                inForm: that.options.inForm,
                                contentType: 'application/json; charset=utf-8',                            
                                dataType: 'json',
                                
                                beforeSend:  function(xhr) {
                                    xhr.setRequestHeader('X-MODULE', app.currentModule);
                                    xhr.setRequestHeader(   (that.options.inForm ? 'X-FORM' : 'X-VIEW'), 
                                                            (app.currentViewModel() ? app.currentViewModel().viewmodel : app.currentModule));

                                    if(that.options.beforeSend) {
                                        that.options.beforeSend(xhr);
                                    }
                                },
                                
                                success: function(data) {
                                    if(data.success === false && data.message) {
                                        options.success([]);
                                        app.hideLoading();

                                        window.MessageBox.alert(
                                            "COTTON SEMENTES",
                                            data.message,
                                            {
                                                icon: window.MessageBox.ERROR,
                                                height: 120
                                            }
                                        );
                                    }
                                    else {
                                        options.success(data);
                                        app.hideLoading();                                        
                                    }
                                },
                                
                                error: function(a,b,c) {                                    
                                    options.error(a);
                                    app.hideLoading();
                                    app.ajaxError(a,b,c);
                                }
                            });
                        }
                    }
                });
                
                that.options.dataSource = that.dataSource;
            },
            
            formatFilters: function(filters, withOptions) {
                var that = this;

                if(!filters) {
                    filters = [];
                }

                var options = {
                    filter: {
                        logic: 'and',
                        filters: $.isArray(filters) ? filters : [filters]
                    }
                };

                if(that.options.initialFilter) {
                    if($.isArray(that.options.initialFilter)) {
                        var concat = options.filter.filters.concat(that.options.initialFilter);
                        options.filter.filters = concat;
                    }
                    else {
                        options.filter.filters.push(that.options.initialFilter);
                    }
                }

                if(options.filter.filters.length === 0) {
                    return undefined;
                }

                return withOptions === undefined || withOptions === true 
                         ? options 
                         : options.filter;
            },

            fetchData: function() {
                var that = this;
                    
                // that.enable(false);     
                
                // var handler = function(e) {
                //     e.sender.enable(true);
                // };

                // that.bind('dataBound', handler);
                return that.dataSource.read();
            },
            
            enable: function(e) {
                var that = this;
                DropDownList.fn.enable.call(that, e);
                
                that.openBtn && that.openBtn.enable(e);
                that.clearBtn && that.clearBtn.enable(e);
            },

            isEnable: function() {
                var that = this;
                return that.wrapper.find('.k-state-disabled').length == 0;
            },

            visible: function(value) {
                var that = this,
                    show = value === undefined || value === true;
                    
                if(show) {
                    that.wrapper.show();
                }
                else {
                    that.wrapper.hide();
                }
            },

            filter: function(filters) {
                var that = this;
                that.enable(false);  
                var f = that.formatFilters(filters, true);               
                that.options.initialFilter = f.filters;
                return that.dataSource.read(f);
            },
            
            init: function(element, options) {
                var that = this;
                that.events = that._events;
                that.options = $.extend({}, that.options, options);
                that.createDataSource();            
                
                if(that.options.mandatory === false && !that.options.valueTemplate) {
                    var emptyItem = {};
                    emptyItem[that.options.dataValueField] = null;
                    emptyItem[that.options.dataTextField] = '-- Selecione --';
                    that.options.optionLabel = emptyItem;
                }
                
                DropDownList.fn.init.call(that, element, options);
                
                if(that.options.width) {
                    if(typeof that.options.width === 'number' && that.options.width > 0) {
                        that.wrapper.css({ 'width' : that.options.width + 'px' });
                    }
                    else if(typeof that.options.width === 'string' && that.options.width !== '') {
                        that.wrapper.css({ 'width' : that.options.width });
                    }
                }
                
                that.dataSource = that.options.dataSource;
                that.renderButtons();
                
                if(that.options.autoBind === undefined || that.options.autoBind === true) {
                    that.fetchData();
                }
            }    
        });
        
        kendo.ui.plugin(window.LookupDropDownList);        
    });
    
})(jQuery);

