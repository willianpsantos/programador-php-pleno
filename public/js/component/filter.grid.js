(function($) {
    
    require(['app', 'kendo'], function(app, kendo) {
        
        var Grid = kendo.ui.Grid;
        
        window.FilterGrid = Grid.extend({
            templates:  {
                toolbar: '<div class="grid-toolbar"> &nbsp; </div>',

                excelIframe: '<iframe id="excel-iframe" name="excel-iframe" src="{url}" style="margin:0; padding:0; width:1px; height: 1px; display:none;"></iframe>',

                excelButton: '<button class="btn" id="grid-export-excel" name="grid-export-excel" title="Clique aqui para exportar os dados da grid em uma planilha de excel."> ' +
                             '   <i class="icon-excel"></i> ' +
                             '</button> &nbsp;',
            },

            options : {
                autoBind          : false,
                name              : 'FilterGrid',
                columns           : undefined,
                model             : undefined,
                url               : undefined,
                saveUrl           : undefined,
                removeUrl         : undefined,
                excelUrl          : undefined,
                sortable          : true,
                canAddOrEditRows  : false,
                canRemoveRows     : false,
                pageSize          : app.defaultPageSize,
                initialFilter     : undefined,
                initialSort       : undefined,                
                customFilterables : undefined,
                width             : undefined,
                height            : undefined,                
                selectable        : "row",
                adjustSize        : 'element', // element or parent,
                serverDataSource  : true,
                beforeSend        : undefined,
                editable          : 'inline',
                excel             : false,
                
                noRecords: {
                    template: '<h4 style="margin: 25px;"> ' + app.translate('filterGridNoRecords') + ' </h4>'
                },                
                
                groupable: {
                    enabled: true,
                    messages: {
                        empty: app.translate('filterGridGroupableEmpty')
                    }
                },
                
                pageable: {
                    refresh: true,
                    pageSizes: false,
                    buttonsCount: 5,
                    info: true,                    
                    messages: app.translate('filterGridPageMessages')
                },
                
                filterable : {
                    extra: false,
                    mode: 'menu',                    
                    messages: app.translate('filterGridFilterableMessages'),                    
                    operators: app.translate('filterGridFilterableOperators')
                }
            },

            selectedIndex: function() {
                var that = this,
                    index,
                    items = that.items(),
                    selected = that.select();

                for(var i = 0; i < items.length; i++) {
                    var item = items[i];

                    if(item === selected[0]) {
                        index = i;
                    }
                }

                return index;
            },
            
            createDataSource: function() {
                var that = this;

                var transport = {
                    read: function (options) {
                        app.showLoading();

                         $.ajax({
                             type: 'GET',
                             cache: false,
                             url: that.options.url,
                             data: options.data,
                             contentType: 'application/json; charset=utf-8',                            
                             dataType: 'json',

                             beforeSend:  function(xhr) {
                                 xhr.setRequestHeader('X-MODULE', app.currentModule);
                                 xhr.setRequestHeader('X-VIEW', (app.currentViewModel() ? app.currentViewModel().viewmodel : app.currentModule));

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
                                 app.hideLoading();
                                 app.ajaxError(a,b,c);
                                 options.error(a);
                             }
                         });
                    }
                };

                if(that.options.canAddOrEditRows === true) {
                    var createOrUpdate = function(options) {
                        app.showLoading();

                        var data = options.data.models ? options.data.models : options.data;

                        if(that.prepareToPost) {
                            data = that.prepareToPost(data);
                        }
                        
                        $.ajax({
                            type: 'POST',
                            url: that.options.saveUrl,
                            dataType: 'json',                            
                            data: { data: data },

                            beforeSend:  function(xhr) {
                                xhr.setRequestHeader('X-MODULE', app.currentModule);
                                xhr.setRequestHeader('X-VIEW', (app.currentViewModel() ? app.currentViewModel().viewmodel : app.currentModule));

                                if(that.options.beforeSend) {
                                    that.options.beforeSend(xhr);
                                }
                            },

                            success: function(data) {
                                if(data.success === false && data.message) {
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
                                    var model = new that.options.model(),
                                        idField = model.idField;

                                    that.dataSource.read({
                                        sorts: [
                                            { field: idField, dir: 'desc' }
                                        ]
                                    }).then(function(){
                                        app.hideLoading();
                                    });
                                }
                            },
                            error: function(a,b,c) {
                                app.hideLoading();
                                app.ajaxError(a,b,c);
                                options.error(a);
                            }
                        });
                    };

                    transport.create = createOrUpdate;
                    transport.update = createOrUpdate;
                }

                if(that.options.canRemoveRows) {
                    var destroy = function(options) {
                        app.showLoading();
                        
                        var data = options.data.models ? options.data.models : options.data;

                        if(that.prepareToPost) {
                            data = that.prepareToPost(data);
                        }
                        
                        $.ajax({
                            type: 'DELETE',
                            url: that.options.removeUrl + '/?id=' + data[that.options.model.idField],
                            dataType: 'json',

                            beforeSend:  function(xhr) {
                                xhr.setRequestHeader('X-MODULE', app.currentModule);
                                xhr.setRequestHeader('X-VIEW', (app.currentViewModel() ? app.currentViewModel().viewmodel : app.currentModule));

                                if(that.options.beforeSend) {
                                    that.options.beforeSend(xhr);
                                }
                            },

                            success: function(data) {
                                if(data.success === false && data.message) {
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
                                    var model = new that.options.model(),
                                        idField = model.idField;

                                    that.dataSource.read({
                                        sorts: [
                                            { field: idField, dir: 'desc' }
                                        ]
                                    }).then(function(){
                                        app.hideLoading();
                                    });
                                }
                            },
                            error: function(a,b,c) {
                                app.hideLoading();
                                app.ajaxError(a,b,c);
                                options.error(a);
                            }
                        });
                    }

                    transport.destroy = destroy;
                }

                that.dataSource = kendo.data.DataSource.create({
                   page: 1,
                   pageSize: that.options.pageSize,
                   serverFiltering: true,
                   serverSorting: true,
                   serverPaging: true,
                   batch: false,

                   schema: {
                       model: that.options.model,
                       data: 'data',
                       total: 'total'
                   },
                   
                   filter: that.options.initialFilter,
                   sort: that.options.initialSort,
                   transport: transport
                });

                that.options.dataSource = that.dataSource;
            },
            
            hasColumn : function(field) {
                var that = this,                    
                    columns = that.options.columns,
                    has = false;
            
                if(!columns || columns.lenght === 0)
                    return has;
            
                for(var i = 0; i < columns.length; i++) {
                    var column = columns[i];
                    
                    if(column.field === field) {
                        has = column;
                        break;
                    }
                }
                
                return has;
            },
            
            hasColumns : function(field) {
                var that = this,                    
                    columns = that.options.columns,
                    has = [];
            
                if(!columns || columns.lenght === 0)
                    return has;
            
                for(var i = 0; i < columns.length; i++) {
                    var column = columns[i];
                    
                    if(column.field === field && !column.basicFilter) {
                        has.push(column);
                    }
                }
                
                return has.length == 0 ? false : has;
            },
            
            setCustomFilterables: function(){
                var that = this,
                    filterables = that.options.customFilterables;
            
                for(var field in filterables) {
                    var column = that.hasColumns(field);
                    
                    if(!column)
                        continue;

                    for(var i = 0; i < column.length; i++) {
                        column[i].filterable = {
                            ui : filterables[field].ui || filterables[field].editor
                        };
                    }
                }
            },

            setEditors: function(){
                var that = this,
                    editors = that.options.editors;
            
                for(var field in editors) {
                    var column = that.hasColumns(field);
                    
                    if(!column)
                        continue;

                    for(var i = 0; i < column.length; i++) {
                        column[i].editor = editors[field];
                    }
                }
            },
            
            resize: function() {
                var that = this,
                    parent = that.wrapper.parent(),
                        
                    width = that.options.width  && typeof that.options.width === 'number'
                              ? that.options.width 
                              : that.options.width === 'adjust' 
                                  ? parent.width()
                                  : undefined,
                                      
                    height = that.options.height && typeof that.options.height === 'number'
                               ? that.options.height
                               : that.options.height === 'adjust'
                                   ? screen.availHeight
                                   : undefined;
                                   
                var elementPaddingTop,
                    elementPaddingBottom,
                    elementPaddingLeft,
                    elementPaddingRight;
                
                switch(that.options.adjustSize) {
                    case 'element':
                        elementPaddingTop    = parseInt(that.element.css('paddingTop').replace('px', ''));
                        elementPaddingBottom = parseInt(that.element.css('paddingBottom').replace('px', ''));
                        elementPaddingLeft   = parseInt(that.element.css('paddingLeft').replace('px', ''));
                        elementPaddingRight  = parseInt(that.element.css('paddingRight').replace('px', ''));
                        break;
                    case 'parent':
                        elementPaddingTop    = parseInt(parent.css('paddingTop').replace('px', ''));
                        elementPaddingBottom = parseInt(parent.css('paddingBottom').replace('px', ''));
                        elementPaddingLeft   = parseInt(parent.css('paddingLeft').replace('px', ''));
                        elementPaddingRight  = parseInt(parent.css('paddingRight').replace('px', ''));
                        break;
                }
                
                if(height && !isNaN(height)) {
                    var contentHeight = height - (elementPaddingTop + elementPaddingBottom + elementPaddingLeft + elementPaddingRight);
                    that.wrapper.height(contentHeight);
                }
                
                if(width && !isNaN(width)) {
                    var contentWidth = width - (elementPaddingTop + elementPaddingBottom + elementPaddingLeft + elementPaddingRight + 10);
                    that.wrapper.width(contentWidth);
                }
            },            
            
            dataItem: function() {
                var that = this,
                    selected = that.select();
            
                if(!selected)
                    return null;
                
                return Grid.fn.dataItem.call(that, selected);
            },

            getColumn: function(field) {
                var that = this,
                    column;
           
                $.each(that.columns, function(){
                    var col = this;
               
                    if(col.field === field) {
                        column = col;
                    }
                });
           
                return column;
            },
       
            columnIndex: function(field) {
                var that = this,
                    index;
           
                $.each(that.columns, function(idx, val){
                    var col = this;
               
                    if(col.field === field) {
                        index = idx;
                    }
                });
           
                return index;
            },

            renderExcelButton: function() {
                var that = this,
                    toolbar = $(that.templates.toolbar).prependTo(that.element),
                    button = $(that.templates.excelButton).appendTo(toolbar);

                button.click(function(e) {
                    that.exportToExcel();
                });
            },

            exportToExcel: function() {
                var that = this,
                    element = $('body > #excel-iframe');

                if(element.length > 0) {
                    element.each(function() {
                        this.remove();
                    });
                }

                var page      = that.dataSource.page();
                var take      = that.dataSource.pageSize();
                var skip      = that.dataSource.skip();
                var filters   = that.dataSource.filter();
                var sorts     = that.dataSource.sort();
                var url       = that.options.excelUrl;
                var separator = "?";

                if(page !== undefined && page !== null) {
                    url += separator + "page=" + page;
                    separator = "&";
                }
                
                if(take !== undefined && take !== null) {
                    url += separator + "take=" + take;
                    separator = "&";
                }

                if(skip !== undefined && skip !== null) {
                    url += separator + "skip=" + skip;
                    separator = "&";
                }

                if(filters) {
                    url += seperator + $.param(filters);
                    separator = "&";
                }

                if(sorts) {
                    url += seperator + $.param(sorts);
                }

                var html = that.templates.excelIframe.replace(/\{url\}/g, url);
                $('body').append(html);
            },
            
            init: function(element, options) {
                var that = this;
                that.options = $.extend({}, that.options, options);

                if(that.options.serverDataSource) {
                    that.createDataSource();
                }
                
                if(that.options.customFilterables) {
                    that.setCustomFilterables();
                }

                if(that.options.editors) {
                    that.setEditors();
                }                
                
                Grid.fn.init.call(that, element, options);                
                that.resize();

                if(that.options.excel === true) {
                    that.renderExcelButton();
                }
            }
        });
        
        kendo.ui.plugin(window.FilterGrid);
        
    });
    
})(jQuery);