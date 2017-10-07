(function($){
    var GRIDCHANGE = "gridChange",
        CHILDVIEWMODELRENDER = "childViewModelRender";
    
    require(['app', 'kendo'], function(app, kendo){
       
        window.ViewModel = kendo.ui.Widget.extend({
            templates : {
                tab: '<div id="{name}-tab" style="padding:8px; box-sizing: border-box;"></div>',
                form: '<div id="{name}-form"></div>',
                grid: '<div id="{name}-grid"></div>',
           
                newButton: '<div class="row-fluid"> ' +
                           '    <button id="btnNew" class="btn btn-large btn-primary" style="float: right; margin-right: 6px;"> ' +
                           '        <i class="fa fa-plus-circle"></i> ' +
                           '        {text} ' +
                           '    </button>' +
                           '</div>',
           
                widget: '<div id="{name}" class="widget"> ' +
                        '    <div class="widget-title"> ' +
                        '        {title} ' +
                        '    </div> ' +
                   
                        '    <div class="widget-body"> ' +
                        '    </div> ' +
                        '</div>'
            },
        
            options : {
                name: 'ViewModel',
           
                /* url can be a string or a object defining all urls used following the model
                 * { get: url, getById: url, save: url, delete: url } */
                url: undefined,
                tabs: undefined,
                form: undefined,
                model: undefined,
                title: 'Base Viewmodel',
                withWidget: false,
                showNewButton: true,
                showList: true,
                renderForm: true,
                newButtonText: 'Adicionar novo',
                initialFilter: undefined,
                initialSort: undefined,
                readOnly: false,
                autoShowForm: true,
                beforeSend: undefined,
           
                grid: {
                    width: undefined,
                    height: undefined,
                    customFilterables: undefined,
                    columns: undefined,
                    pageSize: app.defaultPageSize,                    
                    
                },
                
                childrenViewModels: undefined
            },
            
            _events: [
                GRIDCHANGE,
                CHILDVIEWMODELRENDER
            ],
            
            formatHtml: function(html) {
                var that = this;
                return html.replace(/\{name\}/g, that.options.name.toLowerCase());
            },
       
            renderTab : function(element){
                var that = this,
                    tabElement = $(that.formatHtml(that.templates.tab)).appendTo(element);

                if(that.options.readOnly === true) {
                    that.options.tab.items = [
                        { text: 'Lista', content: '' }
                    ];
                }
       
                that.tab = tabElement.kendoTabStrip({
                    animation: that.options.tab.animation || false,
                    navigatable: that.options.tab.navigatable || false,
                    dataTextField: that.options.tab.dataTextField || 'text',
                    dataContentField: that.options.tab.dataContentField || 'content',
                    dataSource: that.options.tab.items
                }).data('kendoTabStrip');        

                that.tab.bind('select', function(e) {
                    if(!that.grid) {
                        that.disableAllTabsExceptFirst();                        
                        return;
                    }
                    
                    var index = that.tabIndex(e.item);
                    
                    if(index !== 1 || that.form === undefined ||  that.form.operation === 'inserting') { // 1 - Form
                        return;
                    }

                    var dataItem = that.grid.dataItem();
                
                    if(!dataItem) {
                        that.disableAllTabsExceptFirst();                        
                        return;
                    }

                    that.form && that.form.bindDataItem(dataItem);
                }); 
           
                that.tab.contentElements.css({ 'box-sizing' : 'border-box' });
                that.tab.select(0);
                that.disableAllTabsExceptFirst();
            },
       
            resizeTab: function(){
                var that                 = this,
                    tabElement           = that.tab.wrapper,       
                    width                = that.element.width(),
                    elementPaddingTop    = parseInt(that.element.css('paddingTop').replace('px', '')),
                    elementPaddingBottom = parseInt(that.element.css('paddingBottom').replace('px', '')),
                    elementPaddingLeft   = parseInt(that.element.css('paddingLeft').replace('px', '')),
                    elementPaddingRight  = parseInt(that.element.css('paddingRight').replace('px', ''));
            
                if(that.options.withWidget) {
                    var widgetBody = that.widgetBody;
               
                    width                = widgetBody.width(),
                    elementPaddingTop    = parseInt(widgetBody.css('paddingTop').replace('px', ''));
                    elementPaddingBottom = parseInt(widgetBody.css('paddingBottom').replace('px', ''));
                    elementPaddingLeft   = parseInt(widgetBody.css('paddingLeft').replace('px', ''));
                    elementPaddingRight  = parseInt(widgetBody.css('paddingRight').replace('px', ''));
                }
           
                width = width - (elementPaddingLeft + elementPaddingRight + 22.52);
                
                tabElement.width(width); 
           
                var ul = tabElement.find('ul.k-tabstrip-items'),
                    ulHeight = ul.height();
       
                elementPaddingTop    = parseInt(tabElement.css('paddingTop').replace('px', ''));
                elementPaddingBottom = parseInt(tabElement.css('paddingBottom').replace('px', ''));
                elementPaddingLeft   = parseInt(tabElement.css('paddingLeft').replace('px', ''));
                elementPaddingRight  = parseInt(tabElement.css('paddingRight').replace('px', ''));
                
                var contentWidth = width - (elementPaddingLeft + elementPaddingRight);
                       
                that.tab
                    .contentElements
                    .width(contentWidth);
            },
            
            disableTab: function(index) {
                var that = this;
                that.tab.disable(that.tab.tabGroup.children().eq(index));
            },
            
            enableTab: function(index) {
                var that = this;
                that.tab.enable(that.tab.tabGroup.children().eq(index));
            },
            
            showTab: function(index) {
                var that = this;
                that.tab.tabGroup.children().eq(index).show();
            },
            
            hideTab: function(index) {
                var that = this;
                    
                if(typeof index === 'number') {
                    that.tab.tabGroup.children().eq(index).hide();
                } 
                else if(typeof index === 'string') {
                    that.tab.tabGroup.children('li:contains("' + index +'")').hide();
                }
            },
            
            disableAllTabsExceptFirst: function() {
                var that = this,
                    items = that.tab.tabGroup.children().not(that.tab.tabGroup.children().eq(0));
            
                $.each(items, function() {
                    var tab = $(this);
                    that.tab.disable(tab);
                });
            },
            
            disableAllTabsExceptActual: function() {
                var that = this,
                    items = that.tab.tabGroup.children().not(that.tab.select());
            
                $.each(items, function() {
                    var tab = $(this);
                    that.tab.disable(tab);
                });
            },
            
            enableAllTabs: function() {
                var that = this,
                    items = that.tab.tabGroup.children();
            
                $.each(items, function() {
                    var tab = $(this);
                    that.tab.enable(tab);
                });
            },
            
            tabIndex: function(item) {
                var that = this,
                    items = that.tab.items();
                
                for(var i = 0;  i < items.length; i++) { 
                    var o = items[i]; 
                    
                    if(o === item) {
                        return i; 
                    }
                }
            },
       
            resizeWidget: function(){
                var that                 = this,
                    element              = that.element,
                    widgetElement        = that.widgetElement,
                    widgetBody           = that.widgetBody,
                    widgetTitle          = that.widgetTitle,       
                    width                = element.width(),
                    titleHeight          = widgetTitle.height(),           
                    elementPaddingTop    = parseInt(element.css('paddingTop').replace('px', '')),
                    elementPaddingBottom = parseInt(element.css('paddingBottom').replace('px', '')),
                    elementPaddingLeft   = parseInt(element.css('paddingLeft').replace('px', '')),
                    elementPaddingRight  = parseInt(element.css('paddingRight').replace('px', ''));
           
                var contentWidth = width - (elementPaddingLeft + elementPaddingRight + 16);
                       
                widgetElement.width(contentWidth);
                
                elementPaddingTop    = parseInt(widgetElement.css('paddingTop').replace('px', ''));
                elementPaddingBottom = parseInt(widgetElement.css('paddingBottom').replace('px', ''));
                elementPaddingLeft   = parseInt(widgetElement.css('paddingLeft').replace('px', ''));
                elementPaddingRight  = parseInt(widgetElement.css('paddingRight').replace('px', ''));
                           
                contentWidth  = contentWidth  - (elementPaddingLeft + elementPaddingRight);
           
                widgetBody.width(contentWidth);
            },
       
            renderForm: function(element) {
                var that = this,
                    formElement = $(that.formatHtml(that.templates.form)).appendTo(element);
            
                that.form = new that.options.form(formElement);
                
                that.form.bind('edit', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                     that.disableAllTabsExceptActual();
                }, that));                
                
                that.form.bind('insert', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.tab.select(1);
                    that.disableAllTabsExceptActual();
                }, that));
                
                that.form.bind('cancel', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    if(e.sender.operation === "inserting") {
                        that.tab.select(0);
                        that.disableAllTabsExceptFirst();
                    }
                    else {
                        that.enableAllTabs();
                    }
                }, that));
                
                that.form.bind('afterSave', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    var dataItem = e.sender.dataItem(),
                        model = e.sender.createModel(),
                        handler = function(e) {
                            app.showLoading();

                            var timeoutID = window.setTimeout(function() {
                                var data = e.sender.dataSource.data(),
                                    idField = model.idField;

                                if(data && data.length > 0) {
                                    var found = false;

                                    for(var i = 0; i < data.length; i++) {
                                        var d = data[i],
                                            uid = d['uid'],
                                            idValue = d[idField];                                            

                                        if(idValue === dataItem[idField]) {
                                            var tr = e.sender.table.find('tr[data-uid='+ uid +']');
                                            e.sender.select(tr);
                                            found = true;
                                        }
                                    }
                                }

                                e.sender.unbind('dataBound', handler);
                                e.sender.trigger('change');
                                that.enableAllTabs();
                                window.clearTimeout(timeoutID);
                                app.hideLoading();
                            }, 600);
                        };
                                        
                    that.grid.bind('dataBound', handler); 

                    if(e.sender.operation !== 'inserting') {
                        that.grid.dataSource.read();
                    }
                    else {
                        that.grid.dataSource.read({
                            sort: [
                                { field: model.idField, dir: 'desc' }
                            ]
                        });
                    }
                }, that));
                
                that.form.bind('afterDelete', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.grid.dataSource.read();                    
                    that.tab.select(0);
                    that.disableAllTabsExceptFirst();
                }, that));
                
                that.form.bind('afterActivate', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.grid.dataSource.read();
                    that.enableAllTabs();
                }, that));                
                
                that.form.bind('afterInactivate', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.grid.dataSource.read();
                    that.enableAllTabs();                    
                }, that));
                
                that.form.bind('afterApprove', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.grid.dataSource.read();
                    that.enableAllTabs();
                    
                }, that));
                
                that.form.bind('afterDisapprove', $.proxy(function(e) {
                    if(e.sender.options.name !== that.form.options.name)
                        return;
                    
                    that.grid.dataSource.read();
                    that.enableAllTabs();
                }, that));
            },
            
            addNew: function(){
                var that = this;  
                
                if(!that.form) {
                    return;
                }
                
                that.enableTab(1);                
                that.form.performInsert();                
            },
       
            renderNewButton: function(element){
                var that = this;
           
                if(!that.options.showNewButton) {
                    return;
                }
           
                var html = that.formatHtml(that.templates
                                               .newButton
                                               .replace(/\{text\}/g, that.options.newButtonText)),
                               
                    rowFluid = $(html).prependTo(element),
                    button = rowFluid.find('#btnNew');
       
                button.click(function(e){
                    that.addNew();
                });
           
                that.newButton = button;
            },
       
            renderGrid: function(element) {
                var that = this,
                    gridElement = $(that.formatHtml(that.templates.grid)).appendTo(element);
       
                var url = typeof that.options.url === 'string' 
                            ? that.options.url
                            : that.options.url.get;
                       
                if(that.options.readOnly === undefined || that.options.readOnly === false) {
                    that.renderNewButton(element);
                }
       
                that.grid = gridElement.kendoFilterGrid({
                    model: that.options.model,
                    url: url,
                    columns: that.options.grid.columns,
                    width: that.options.grid.width,
                    initialFilter: that.options.initialFilter,
                    initialSort: that.options.initialSort,
                    customFilterables: that.options.grid.customFilterables,
                    adjustSize: that.options.withWidget ? 'element' : 'parent',
                    pageSize: that.options.grid.pageSize,
                    beforeSend: that.options.beforeSend,
                    
                    change: function(e) {
                        var grid = e.sender,
                            dataItem = grid.dataItem();

                        if(that.options.readOnly === true) {
                            that.trigger(GRIDCHANGE, { grid: e.sender, dataItem: dataItem });
                            return;    
                        }
                    
                        if(!dataItem) {
                            that.disableAllTabsExceptFirst();
                            return;
                        }
                        
                        that.enableAllTabs();
                        that.trigger(GRIDCHANGE, { grid: e.sender, dataItem: dataItem });
                        that.options.autoShowForm && that.tab.select(1); // 1 - Form
                    },
                    
                    dataBound: function(e) {
                        var grid = e.sender;                        
                        grid.trigger('change');
                    }
                }).data('kendoFilterGrid');
           
                var grouping = that.grid.wrapper.find('.k-grouping-header');           
                grouping.addClass('hidden-phone');
                
                that.grid.dataSource.fetch();
            },
       
            renderWidget: function() {
                var that = this,
                    html = that.formatHtml(that.templates
                                               .widget                               
                                               .replace(/\{title\}/g, that.options.title));
                  
                that.widgetElement = $(html).appendTo(that.element);
                that.widgetBody = that.widgetElement.find('.widget-body');
                that.widgetTitle = that.widgetElement.find('.widget-title');
            },
            
            renderChildrenViewModels: function() {
                var that = this,
                    children = that.options.childrenViewModels;
            
                if(!children || children.length === 0) {
                    return;
                }
                
                delete that.childrenViewModels;
                that.childrenViewModels = [];
                
                $.each(children, function(i, v) {                    
                    requirejs([v], function(rvm) {
                        var tabIndex = that.options.renderForm === undefined || that.options.renderForm === true 
                                         ? (children.indexOf(v) + 2)
                                         : (children.indexOf(v) + 1);
                    
                        
                        if(!rvm) {
                            return;
                        }
                        
                        that.childrenViewModels.push(rvm);                                                
                        var vm = that.childrenViewModels[that.childrenViewModels.length - 1];
                        
                        var load = $.proxy(vm.load, vm);                        
                        load(that.tab.contentHolder(tabIndex));
                        that.trigger(CHILDVIEWMODELRENDER, { viewmodel: vm });
                    });
                });
            },       
       
            render : function() {
                var that = this,
                    element = that.element;
       
                element.html('');
                element.css({ 'padding' : '1px' });
           
                if(that.options.withWidget) {
                    that.renderWidget();
                    element = that.widgetElement.find('.widget-body');                         
                }
           
                that.renderTab(element);
                that.renderGrid(that.tab.contentHolder(0));
                
                if (that.options.readOnly === true) {
                    return;
                }

                if(that.options.renderForm) {
                    that.renderForm(that.tab.contentHolder(1));           
                }
                
                that.renderChildrenViewModels();
            },
       
            resize: function() {
                var that = this;
           
                if(that.options.withWidget) {
                    that.resizeWidget();
                }
           
                that.resizeTab();
                that.grid.resize();
           
                $(window).resize(function(){
                    that.resize();    
                });
            },  
            
            applyFilter: function(filter) {
                var that = this;
                that.grid.dataSource.read({
                    filter: {
                        logic: 'and',
                        filters: [filter]
                    }
                });
            },
            
            hideAddButton: function() {
                var that = this,
                    button = that.element.find("#btnNew");
            
                button.hide();
            },
            
            showAddButton: function() {
                var that = this,
                    button = that.element.find("#btnNew");
            
                button.show();
            },
            
            load: function(element, options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
                that.element = element;
                that.events = that._events;
                that.render();
                that.resize();
                
                if(that.options.showList === false) {
                    that.hideTab(0);
                }

                if(that.options.readOnly === true) {
                    that.hideTab(1);
                    that.hideAddButton();
                }
            }
        });        
    });
    
})(jQuery);
