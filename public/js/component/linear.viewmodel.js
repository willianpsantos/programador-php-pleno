(function($){
    var GRIDCHANGE = "gridChange",
        SAVE = "save",
        EDIT = "edit",
        CANCEL = "cancel",
        DELETE = "delete";
    
    require(['app', 'kendo'], function(app, kendo){
       
        window.LinearViewModel = kendo.ui.Widget.extend({
            templates : {
                tab  : '<div id="{name}-tab" style="padding:8px; box-sizing: border-box;"></div>',
                form : '<div id="{name}-form"></div>',
                grid : '<div id="{name}-grid"></div>',

                defaultGridButtons: '<script id="linear-grid-buttons" type="text/x-kendo-template"> ' +
                                    '    <div style="float:left; height: 30px;"> ' +                                    
                                    '    {buttons} ' +                                    
                                    '    </div> ' +
                                    '</script> ',
                
                button: '<button class="{class}" id="{name}" name="{name}" title="{title}" {visible}> ' +
                        '   <i class="{icon}"></i> ' +
                        '</button> &nbsp;',
           
                newButton: '<div class="row-fluid" style="margin: 16px;"> ' +
                           '    <button id="btnNew" class="btn btn-large btn-primary" style="float: right; margin-right: 24px;"> ' +
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
                url           : undefined,
                saveUrl       : undefined,
                removeUrl     : undefined,
                excelUrl      : undefined,
                model         : undefined,
                title         : 'Base LinearViewmodel',
                withWidget    : true,
                showNewButton : true,
                showList      : true,
                newButtonText : 'Adicionar novo',
                initialFilter : undefined,
                initialSort   : undefined,
                readOnly      : false,
                beforeSend    : undefined,
           
                grid: {
                    excel             : false,
                    width             : undefined,
                    height            : undefined,
                    customFilterables : undefined,
                    editors           : undefined,
                    columns           : undefined,
                    pageSize          : app.defaultPageSize,                    
                    
                },

                defaultButtons: [
                    {
                        cssClass : 'btn btn-success',
                        name     : "btn-grid-save",
                        title    : "Salvar",
                        icon     : "fa fa-check-circle",
                        visible  : false
                    }, 
                    
                    {
                        cssClass : "btn btn-primary",
                        name     : "btn-grid-edit",
                        title    : "Editar",
                        icon     : "fa fa-pencil-square",
                        visible  : true,
                    },

                    {
                        cssClass : "btn btn-danger",
                        name     : "btn-grid-cancel",
                        title    : "Cancelar",
                        icon     : "fa fa-ban",
                        visible  : false
                    },
                        
                    {
                        cssClass : "btn btn-inverse",
                        name     : "btn-grid-delete",
                        title    : "Excluir",
                        icon     : "fa fa-trash",
                        visible  : true
                    }
                ],

                buttons: []
            },
            
            _events: [
                GRIDCHANGE,
                SAVE,
                CANCEL,
                EDIT,
                DELETE
            ],
            
            formatHtml: function(html) {
                var that = this;
                return html.replace(/\{name\}/g, that.options.name.toLowerCase());
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
            
            addNew: function(){
                var that = this;  
                that.grid.addRow();
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

            bindButtonEvents: function(item, grid) {
                var that = this,
                    btnSave   = item.find('#btn-grid-save'),
                    btnCancel = item.find('#btn-grid-cancel'),
                    btnEdit   = item.find('#btn-grid-edit'),
                    btnDelete = item.find('#btn-grid-delete'),
                    model     = grid.dataSource.getByUid(item.attr('data-uid')),
                    status    = ['A', 'P'];

                if(!model) {
                    return;
                }

                btnSave.hide();
                btnEdit.hide();
                btnDelete.hide();
                btnCancel.hide();

                if(model.isNew()) {
                    btnSave.show();
                    btnEdit.hide();
                    btnDelete.hide();
                    btnCancel.show();
                }
                else {
                    btnSave.hide();
                    btnEdit.show();
                    btnDelete.show();
                    btnCancel.hide();
                }

                btnSave.click(function(e) {
                    e.preventDefault();

                    var tr = $(this).closest('tr[role=row]'),
                        dataItem = grid.dataSource.getByUid(tr.attr('data-uid')),
                        btnEdit = tr.find('#btn-grid-edit'),
                        btnCancel = tr.find('#btn-grid-cancel'),
                        btnDelete = tr.find('#btn-grid-delete'),
                        btnSend   = tr.find('#btn-grid-send');

                    if(!that.validate()) {
                        return;
                    }
                    
                    grid.saveRow();
                    $(this).hide();
                    btnEdit.show();
                    btnDelete.show();
                    btnCancel.hide();
                    that.trigger(SAVE, { sender: that, item: tr, dataItem: dataItem });
                });

                btnEdit.click(function(e) {
                    e.preventDefault();
                    
                    var tr        = $(this).closest('tr[role=row]'),
                        dataItem  = that.grid.dataSource.getByUid(tr.attr('data-uid')),
                        btnSave   = tr.find('#btn-grid-save'),
                        btnCancel = tr.find('#btn-grid-cancel'),
                        btnDelete = tr.find('#btn-grid-delete'),
                        btnSend   = tr.find('#btn-grid-send');

                    grid.editRow(tr);
                    $(this).hide();
                    btnSave.show(); 
                    btnCancel.show();
                    btnDelete.hide();
                    btnSend.hide();
                    that.trigger(EDIT, { sender: that, item: tr, dataItem: dataItem });
                });

                btnCancel.click(function(e) {
                    e.preventDefault();

                    var tr        = $(this).closest('tr[role=row]'),
                        dataItem  = grid.dataSource.getByUid(tr.attr('data-uid')),
                        btnEdit   = tr.find('#btn-grid-edit'),
                        btnSave   = tr.find('#btn-grid-save'),
                        btnCancel = tr.find('#btn-grid-cancel'),
                        btnDelete = tr.find('#btn-grid-delete');

                    grid.cancelChanges();                                        
                    btnEdit.show();
                    btnDelete.show();
                    btnSave.hide();
                    $(this).hide();
                    that.trigger(CANCEL, { sender: that, item: tr, dataItem: dataItem });
                });

                btnDelete.click(function(e) {
                    e.preventDefault();
                    
                    var tr = $(this).closest('tr[role=row]'),
                        dataItem = that.grid.dataSource.getByUid(tr.attr('data-uid'));
                        
                    window.MessageBox.confirm(
                        "EXCLUIR REPORTE DE PRODUÇÃO",
                        "Deseja realmente EXCLUIR o reporte de produção selecionado?",
                        function() {
                            grid.removeRow(tr);
                            that.trigger(DELETE, { sender: that, item: tr, dataItem: dataItem });
                        }
                    );
                });
            },

            renderButtonsTemplate: function() {
                var that = this,
                    buttons = that.options.buttons,
                    html = '';

                buttons = that.options.defaultButtons.concat(buttons);

                for(var i = 0; i < buttons.length; i++) {
                    var button = buttons[i];

                    html += that.templates
                                .button
                                .replace(/\{class\}/g, button.cssClass)
                                .replace(/\{name\}/g, button.name)
                                .replace(/\{title\}/g, button.title)
                                .replace(/\{icon\}/g, button.icon)
                                .replace(/\{visible\}/g, button.visible === undefined || button.visible === true ? "" : 'style="display:none;"');
                }

                var template = that.templates.defaultGridButtons.replace(/\{buttons\}/g, html);
                return template;
            },
       
            renderGrid: function(element) {
                var that = this,
                    gridElement = $(that.formatHtml(that.templates.grid)).appendTo(element);
       
                var url = typeof that.options.url === 'string' 
                            ? that.options.url
                            : that.options.url.get;

                var saveUrl = typeof that.options.url === 'object'
                                ? that.options.url.save
                                : that.options.saveUrl;

                var removeUrl = typeof that.options.url === 'object'
                                 ? that.options.url.delete
                                 : that.options.removeUrl;

                var excelUrl = typeof that.options.url === 'object'
                                ? that.options.url.excel
                                : that.options.excelUrl;
                       
                that.renderNewButton(element);

                var template = $('body #linear-grid-buttons'); 
                
                if(template.length === 0) {
                    template = $(that.renderButtonsTemplate()).prependTo($('body'));
                }
       
                if(!that.gridButtonsColumnAdded) {
                    that.options.grid.columns.push({
                        width: '150px',
                        template: kendo.template(template.html())
                    });
                    
                    that.gridButtonsColumnAdded = true;
                }
       
                that.grid = gridElement.kendoFilterGrid({
                    model             : that.options.model,
                    url               : url,
                    saveUrl           : saveUrl,
                    removeUrl         : removeUrl,
                    excelUrl          : excelUrl,
                    canAddOrEditRows  : true,
                    canRemoveRows     : true,                    
                    columns           : that.options.grid.columns,
                    width             : that.options.grid.width,
                    initialFilter     : that.options.initialFilter,
                    initialSort       : that.options.initialSort,
                    customFilterables : that.options.grid.customFilterables,
                    editors           : that.options.grid.editors,
                    adjustSize        : that.options.withWidget ? 'element' : 'parent',
                    pageSize          : that.options.grid.pageSize,
                    beforeSend        : that.options.beforeSend,
                    excel             : that.options.grid.excel,
                    
                    editable : {
                        mode: "inline",
                        confirmation: false
                    },
                    
                    change: function(e) {
                        var grid = e.sender,
                            dataItem = grid.dataItem();

                        if(that.options.readOnly === true) {
                            that.trigger(GRIDCHANGE, { grid: e.sender, dataItem: dataItem });
                            return;    
                        }
                    
                        if(!dataItem) {
                            return;
                        }
                        
                        that.trigger(GRIDCHANGE, { grid: e.sender, dataItem: dataItem });
                    },
                    
                    dataBound: function(e) {
                        var grid = e.sender,
                            items = grid.items();

                        for(var i = 0; i < items.length; i++) {
                            var item = $(items[i]);
                            that.bindButtonEvents(item, grid);
                        }

                        grid.trigger('change');
                    }
                }).data('kendoFilterGrid');
           
                var grouping = that.grid.wrapper.find('.k-grouping-header');           
                grouping.addClass('hidden-phone');
                
                that.grid.wrapper.css({ 'margin' : '5px' });
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

            render: function() {
                var that = this,
                    element = that.element;
       
                element.html('');
                element.css({ 'padding' : '1px' });
           
                if(that.options.withWidget) {
                    that.renderWidget();
                    element = that.widgetElement.find('.widget-body');                         
                }
           
                that.renderGrid(element);
            },
       
            resize: function() {
                var that = this;
           
                if(that.options.withWidget) {
                    that.resizeWidget();
                }
           
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

            validate: function() {
                var that = this;
                var editable = that.grid.table.find('tr[data-role=editable]');
                return app.validate(editable);
            },
            
            load: function(element, options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
                that.element = element;
                that.events = that._events;
                that.render();
                that.resize();

                if(that.options.readOnly === true) {                    
                    that.hideAddButton();
                }

                if(that.prepareToPost) {
                    that.grid.prepareToPost = that.prepareToPost;
                }
            }
        });        
    });
    
})(jQuery);
