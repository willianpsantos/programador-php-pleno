(function($){
    var POPUPOPEN = "popupOpen",
        POPUPCLOSE = "popupClose",        
        BEFOREDELETE = "beforeDelete",
        AFTERDELETE = "afterDelete",                
        BEFOREACTIVATE = "beforeActivate",
        AFTERACTIVATE = "afterActivate",
        BEFOREINACTIVATE = "beforeInactivate",
        AFTERINACTIVATE = "afterInactivate",
        BEFOREAPPROVE = "beforeApprove",
        AFTERAPPROVE = "afterApprove",
        GRIDCHANGE = "gridChange",
        BEFOREPOPUPOPEN = "beforePopupOpen",
        AFTERSAVE = "afterSave",
        BEFORESAVE = "beforeSave",
        DATABOUND = "dataBound",
        INIT = "init";
    
    require(['app', 'kendo'], function(app, kendo){
        
        window.InnerViewModel = kendo.ui.Widget.extend({
            templates : {
                form: '<div id="{name}-inner-form"></div>',
                grid: '<div id="{name}-inner-grid"></div>',
                popup: '<div id="{name}-inner-popup"></div>',
                
                addButton: '<button id="btnAdd" class="btn btn-large btn-primary" style="float: left; margin-right: 6px;"> ' +
                           '    <i class="fa fa-plus-circle"></i> ' +
                           '    {addbutton} ' + 
                           '</button>',
                
                saveButton: '<button id="btnSave" class="btn btn-large btn-primary" style="float: left; margin-right: 6px;"> ' +
                            '    <i class="fa fa-plus-circle"></i> ' +
                            '    {savebutton}' + 
                            '</button>',
                
                clearButton: '<button id="btnClear" class="btn btn-large btn-primary" style="float: left; margin-right: 6px;"> ' +
                             '    <i class="fa fa-ban"></i> ' +
                             '    {clearbutton}' +
                             '</button> &nbsp;',
                
                cancelButton: '<button id="btnCancel" class="btn btn-large btn-primary" style="float: left; margin-right: 6px;"> ' +
                              '    <i class="fa fa-ban"></i> ' +
                              '    {cancelbutton}' +
                              '</button> &nbsp;',
                
                newButton: '<div class="row-fluid"> ' +
                           '    <div id="inner-title" style="float:left; margin-left: 6px; font-family: \'MyriadPro-Light\'; color: #f37b53; " > ' +
                           '        <h4></h4> ' +
                           '    </div> ' +
                            
                           '    <button id="inner-btnNew" class="btn btn-large btn-primary" style="float: right; margin-right: 6px;"> ' +
                           '        <i class="fa fa-plus-circle"></i> ' +
                           '        {text} ' +
                           '    </button>' +
                           '</div>',
                
                defaultGridButtons: '<script id="inner-grid-buttons" type="text/x-kendo-template"> ' +
                                    '    <div style="float:left; height: 30px;"> ' +
                                    
                                    '        <button class="btn btn-primary" id="btn-grid-edit" name="btn-grid-edit" title="Editar"> ' +
                                    '            <i class="fa fa-pencil-square"></i> ' +
                                    '        </button> &nbsp;' +
                                    
                                    '        <button class="btn btn-inverse" id="btn-grid-delete" name="btn-grid-delete"  title="Excluir"> ' +
                                    '            <i class="fa fa-trash"></i> ' +
                                    '        </button> &nbsp;' +
                                    '    </div> ' +
                                    '</script> '
            },
            
            options : {
                name: 'InnerViewModel',
                form: undefined,
                model: undefined,
                title: 'Base InnerViewmodel',  
                
                formMode: 'popup', // popup - Form abrirá num poppu, inner - form será renderizado no elemento       
                
                showNewButton: true,
                showEditButton: true,
                showDeleteButton: true,
                showRecordOptions: true,
                required: false,
                
                newButtonText: 'Adicionar novo',
                popupTitle: 'Inserir/Alterar novo',
                flushField: undefined, 
                owner: undefined,
                addButtonText: app.translate('addButton'),
                saveButtonText: app.translate('saveButton'),
                clearButtonText: app.translate('clearButton'),
                cancelButtonText: app.translate('cancelButton'),

                grid: {
                    width: undefined,
                    height: undefined,
                    initialFilter: undefined,
                    initialSort: undefined,
                    customFilterables: undefined,
                    columns: undefined               
                }
            },
            
            _events: [
                BEFOREPOPUPOPEN,
                POPUPOPEN,
                POPUPCLOSE,
                BEFOREDELETE,
                AFTERDELETE,
                BEFOREACTIVATE,
                AFTERACTIVATE,
                BEFOREINACTIVATE,
                AFTERINACTIVATE,
                BEFOREAPPROVE,
                AFTERAPPROVE,
                AFTERSAVE,
                BEFORESAVE,
                DATABOUND
            ],
            
            items: [],
            
            getInnerName: function() {
                var that = this;
                return "inner" + that.options.flushField;
            },

            fixFooter: function() {
                var that = this;
                that.options.grid.columns.forEach(function(data, index) {
                    if(data.footerTemplate != undefined) {
                        that.items.forEach(function(sdata, sindex) {
                            if(sdata[data.field] != undefined) {
                                that.items[sindex][data.field] = parseFloat(that.items[sindex][data.field]);
                            }
                        });
                    }
                });
            },
            
            loadItems: function(items) {
                var that = this;
                that.clearAll();
                that.items = items;
                that.fixFooter();
                that.grid.dataSource.data(that.items);
            },
            
            addItem: function(item) {
                if(!item) {
                    return;
                }
                
                var that = this,
                model = that.createModel(item);
                
                if(!that.items) {
                    that.items = [];
                }
                
                that.items.push(model);
                that.fixFooter();
                that.grid.dataSource.data(that.items);
                that.grid.dataSource.filter({});
                // that.grid.dataSource.query();
            },
            
            updateItem: function(index, item) {
                var that = this,
                model = new that.options.model(item);
                
                that.items[index] = model;
                that.fixFooter();
                that.grid.dataSource.data(that.items);
            },
            
            removeItem: function(index) {
                var that = this;
                
                if(!that.items || that.items.length === 0) {
                    return;
                }
                
                that.items.splice(index, 1);
                that.fixFooter();
                that.grid.dataSource.data(that.items);
            },
            
            dataItem: function() {
                var that = this;
                
                if(that.form && that.form.dataItem) {
                    return that.form.dataItem();
                }
                
                return that.createModel();
            },
            
            flushItems: function(dataItem, field) {
                var that = this;
                
                if(!field) {
                    field = that.options.flushField;
                }
                
                dataItem.set(field, []);
                
                for(var i = 0; i < that.items.length; i++) {
                    var item = that.items[i];
                    
                    if(item.toJSON) {
                        dataItem.get(field)
                        .push(
                            that.form.prepareToFlush(
                                item.toJSON()
                            )
                        );
                    }
                    else {
                        dataItem.get(field).push(that.form.prepareToFlush(item));
                    }
                }
            },
            
            clearAll: function() {
                var that = this;

                if(that.items) {
                    that.items.splice(0, that.items.length);
                }
                
                delete that.items;
                that.items = [];
                that.grid.dataSource.data(that.items);
                that.grid.dataSource.fetch();
            },
            
            createModel: function(item) {
                var that = this;
                return new that.options.model(item);                    
            },
            
            delete: function() {
                var that = thidis;
                that.removeItem(id);
            },
            
            save: function() {
                var that = this;
                
                if(!that.form.validate()) {
                    return;
                }
                
                var dataItem,
                owner,
                innerName = that.getInnerName();
                
                switch(that.options.formMode){
                    case 'inner':
                        owner = that.owner.dataItem();
                        dataItem = owner.get(innerName);
                        break;
                    case 'popup':
                        owner = that.form.dataItem();
                        dataItem = owner.get(innerName);
                        break;
                }
                
                var item = that.form.prepareToPost(dataItem);
                that.trigger(BEFORESAVE, { sender: that, item: item });
                
                switch(that.form.operation) {
                    case 'inserting':
                        that.addItem(item);                
                        break;
                    case 'updating':
                        that.updateItem(item.index, item);
                        delete item.index;
                        break;
                }
                
                that.form.clear();                
                that.form.enable();
                that.form.performInsert(false);
                
                if(that.options.formMode === 'popup' && that.messageBox) {
                    that.messageBox.close();
                }
                
                that.trigger(AFTERSAVE, { sender: that, item: item });
            },
            
            formatHtml: function(html){
                var that = this;
                return html.replace(/\{name\}/g, that.options.name.toLowerCase());
            },

            cancel: function() {
                var that = this;
                that.form.clear();
                that.form.performCancel();
                that.form.performInsert(false);
            },
            
            renderForm: function(element) {
                var that = this,
                formElement = $(that.formatHtml(that.templates.form)).appendTo(element);
                
                that.form = new that.options.form(formElement,{
                    showSaveButton: (that.options.formMode === 'popup'),
                    masterField: that.options.flushField
                });
                
                that.form.save = $.proxy(that.save, that);
                var buttons = that.form.formElement.find('.buttons');
                buttons.html('');
                
                that.addButton    = $(that.formatHtml(that.templates.addButton.replace(/\{addbutton\}/g, that.options.addButtonText))).appendTo(buttons);
                that.clearButton  = $(that.formatHtml(that.templates.clearButton.replace(/\{clearbutton\}/g, that.options.clearButtonText))).appendTo(buttons);
                that.saveButton   = $(that.formatHtml(that.templates.saveButton.replace(/\{savebutton\}/g, that.options.saveButtonText))).appendTo(buttons);
                that.cancelButton = $(that.formatHtml(that.templates.cancelButton.replace(/\{cancelbutton\}/g, that.options.cancelButtonText))).appendTo(buttons);
                
                that.addButton.click(function(e){
                    e.preventDefault();
                    that.form.save();
                });
                
                that.clearButton.click(function(e) {
                    e.preventDefault();
                    that.form.clear();
                });
                
                that.saveButton.click(function(e) {
                    e.preventDefault();
                    that.form.save();
                });
                
                that.cancelButton.click(function(e) {
                    e.preventDefault();
                    that.cancel.call(that);
                });
            },       
            
            addNew: function(){
                var that = this,
                model = that.createModel();
                
                that.operation = "inserting";
                
                var owner = that.owner.dataItem(),
                innerName = that.getInnerName();
                
                owner.set(innerName, model);
                that.dataItemToBind = owner;
                that.openWindow();
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
                    button = rowFluid.find('#inner-btnNew');
                    
                    button.click($.proxy(that.addNew, that));
                    
                    that.newButton = button;
                },
                
                renderWindowPopup: function() {
                    var that = this,
                    name = that.options.name.toLowerCase() + "-popup",
                    html = that.formatHtml(that.templates.popup),
                    oldPopup = $('body #' + name);
                    
                    if(oldPopup.length > 0) {
                        var data = oldPopup.data('kendoMessageBox');
                        
                        if(data) {
                            data.destroy();
                        }
                        
                        oldPopup.each(function(){
                            this.remove();
                        });
                    }
                    
                    if(that.messageBox) {
                        that.messageBox = undefined;
                        delete that.messageBox;
                    }
                    
                    var popup = $(html).appendTo($('body')),
                    width = $(window).width() - 100,
                    height = $(window).height() - 50;
                    
                    that.messageBox = popup.kendoMessageBox({
                        width: width,
                        height: height,
                        title: that.options.popupTitle,
                        modal: true,
                        autoDestroy: true,
                        
                        buttons: {
                            items: [
                                {
                                    name: 'close',
                                    text: 'Fechar',
                                    iconCls: 'fa fa-times-circle font-red',
                                    
                                }
                            ]
                        },
                        
                        handler: function (e) {
                            switch(e.button.name) {
                                case 'close':
                                e.sender.close();
                                break;
                            }
                        },
                        
                        open: function (e) {                    
                            var element = e.sender.element;
                            
                            that.renderForm(element);
                            that.trigger(BEFOREPOPUPOPEN);
                            that.form.bindDataItem(that.dataItemToBind);
                            
                            switch(that.operation) {                            
                                case "updating":
                                that.form.performEdit();
                                break;
                                case "inserting":
                                that.form.performInsert();
                                break;
                            }
                            
                            that.trigger(POPUPOPEN);
                        },
                        
                        close: function(e) {
                            that.grid.dataSource.read();
                            that.messageBox = undefined;
                            delete that.messageBox;
                            that.trigger(POPUPCLOSE);                        
                        }
                    }).data('kendoMessageBox');
                    
                    that.messageBox.opener = that;
                },
                
                openWindow: function() {
                    var that = this;
                    
                    if(!that.messageBox) {
                        that.renderWindowPopup();
                    }
                    
                    that.messageBox.center().open();
                },
                
                edit: function(sender) {
                    var that = this,
                        button = sender,
                        parent = button.parents('tr[role=row]'),
                        uid = parent.data('uid'),
                        dataItem = that.grid.dataSource.getByUid(uid);
                    
                    if(!dataItem)
                        return;
                    
                    that.operation = 'updating';
                    that.grid.select(parent);
                    dataItem.set('index', that.grid.selectedIndex());
                    
                    var ownerItem = that.owner.dataItem(),
                        innerName = that.getInnerName();
                    
                    ownerItem.set(innerName, dataItem);
                    
                    switch(that.options.formMode) {
                        case 'popup':
                            that.dataItemToBind = ownerItem;
                            that.openWindow();
                        break;
                        case 'inner':                                    
                            kendo.bind(that.form.formElement, ownerItem);

                            if(that.form.operation != undefined) {
                                that.form.performEdit(false);
                            } else {
                                that.form.trigger("dataBound");
                            }
                        break;
                    }
                },
                
                delete: function(sender){
                    var that = this,
                        button = sender,
                        parent = button.parents('tr[role=row]'),
                        uid = parent.data('uid'),
                        dataItem = that.grid.dataSource.getByUid(uid);
                    
                    if(!dataItem)
                        return;
                    
                    that.operation = 'deleting';
                    that.grid.select(parent);
                    that.removeItem(that.grid.selectedIndex());
                },
                
                bindGridButtonsEvents: function(grid) {
                    var that = this,
                    
                    rows = grid.tbody.find('tr[role=row]');            
                    
                    rows.each(function() {
                        var row = $(this),
                        btnEdit       = row.find('#btn-grid-edit'),
                        btnDelete     = row.find('#btn-grid-delete');
                        
                        if(that.options.showEditButton === false) {
                            btnEdit.hide();
                        }
                        
                        if(that.options.showDeleteButton === false) {
                            btnDelete.hide();
                        }
                        
                        row.click(function(e) {
                            that.edit($(e.target));
                            e.stopPropagation();
                        });
                        
                        btnEdit.click(function(e) {
                            that.edit($(e.target));
                            e.stopPropagation();
                        });
                        
                        btnDelete.click(function(e) {
                            that.delete($(e.target));
                            e.stopPropagation();
                        }); 
                    });
                },
                
                renderGrid: function(element) {
                    var that = this,
                    gridElement = $(that.formatHtml(that.templates.grid)).appendTo(element);
                    
                    if(that.options.formMode === 'popup') {
                        that.renderNewButton(element);
                    }
                    
                    var template = $('body #inner-grid-buttons'); 
                    
                    if(template.length === 0) {
                        template = $(that.templates.defaultGridButtons).prependTo($('body'));
                    }
                    
                    if(!that.gridButtonsColumnAdded && that.options.showRecordOptions) {
                        that.options.grid.columns.push({
                            field: 'actions',
                            title: 'Ações',
                            width: '10%',
                            template: kendo.template(template.html())
                        });
                        
                        that.gridButtonsColumnAdded = true;
                    }
                    
                    that.grid = gridElement.kendoFilterGrid({
                        autoBind: true,
                        model: that.options.model,                    
                        columns: that.options.grid.columns,
                        width: that.options.grid.width,
                        height: that.options.grid.height,
                        filterable: false,
                        groupable: false,
                        pageable: true,
                        serverDataSource: false,
                        
                        dataSource: new kendo.data.DataSource({
                            pageSize: app.defaultPageSize,
                            page: 1,
                            data: that.items,
                            aggregate: that.options.grid.aggregate
                        }),                    
                        
                        change: function(e) {
                            var grid = e.sender,
                            dataItem = grid.dataItem();
                            
                            if(!dataItem)
                                return;
                            
                            that.trigger(GRIDCHANGE, { sender: that, dataItem: dataItem });
                        },
                        
                        dataBound: function(e) {
                            that.bindGridButtonsEvents(e.sender);

                            that.trigger(DATABOUND, { sender: that, dataItem: that.items });
                        }
                    }).data('kendoFilterGrid');           
                    
                    var grouping = that.grid.wrapper.find('.k-grouping-header');           
                    grouping.addClass('hidden-phone');
                    that.grid.wrapper.css({ 'margin-top' : '5px' });
                    that.grid.hideColumn('actions');
                },
                
                render: function() {
                    var that = this,
                    element = that.element;
                    
                    element.html('');
                    element.css({ 'padding' : '5px' });
                    
                    if(that.options.formMode === 'popup') {
                        that.renderWindowPopup();
                    }
                    else {
                        that.renderForm(element);
                    }
                    
                    that.renderGrid(element);
                },
                
                resize: function() {
                    var that = this;
                    that.grid.resize();
                    
                    $(window).resize(function(){
                        that.resize();    
                    });
                },
                
                applyFilter: function(filter) {
                    var that = this;
                    that.grid.dataSource.filter([filter]);
                },
                
                setTitle: function(title) {
                    var that = this,
                    element = that.element.find('#inner-title h4');
                    
                    element.html('<i class="fa fa-th"></i> &nbsp;' + title);
                },
                
                hideAddButton: function() {
                    var that = this,
                    button = that.element.find("#inner-btnNew");
                    
                    button.hide();
                },
                
                showAddButton: function() {
                    var that = this,
                    button = that.element.find("#inner-btnNew");
                    
                    button.show();
                },
                
                bindEvents: function() {
                    var that = this;
                    
                    that.bind(AFTERDELETE, $.proxy(function(e) {
                        e.sender.grid.dataSource.read();
                    }, that));
                },
                
                load: function(element, options) {
                    var that = this;
                    that.options = $.extend({}, that.options, options);
                    that.element = element;
                    that.events = that._events;
                    that.owner = that.options.owner;
                    that.render();
                    that.resize();
                    that.bindEvents();

                    that.trigger(INIT, { sender: that });
                }
            });
        });
        
    })(jQuery);
    