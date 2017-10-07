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
        BEFOREPOPUPOPEN = "beforePopupOpen";          
    
    require(['app', 'kendo'], function(app, kendo){
        
        window.PopupViewModel = kendo.ui.Widget.extend({
            templates : {
                form: '<div id="{name}-popup-form"></div>',
                grid: '<div id="{name}-popup-grid"></div>',
                popup: '<div id="{name}-popup"></div>',
           
                newButton: '<div class="row-fluid"> ' +
                           '    <div id="popup-title" style="float:left; margin-left: 6px; font-family: \'MyriadPro-Light\'; color: #f37b53; " > ' +
                           '        <h4></h4> ' +
                           '    </div> ' +
                           
                           '    <button id="popup-btnNew" class="btn btn-large btn-primary" style="float: right; margin-right: 6px;"> ' +
                           '        <i class="fa fa-plus-circle"></i> ' +
                           '        {text} ' +
                           '    </button>' +
                           '</div>',
                   
                defaultGridButtons: '<script id="popup-grid-buttons" type="text/x-kendo-template"> ' +
                                    '    <div style="float:left; height: 30px;"> ' +
                                    
                                    '        <button class="btn btn-primary" id="btn-grid-edit" name="btn-grid-edit" title="Editar"> ' +
                                    '            <i class="fa fa-pencil-square"></i> ' +
                                    '        </button> &nbsp;' +                                    
                                                                        
                                    '        <button class="btn btn-success" id="btn-grid-activate" name="btn-grid-activate"  title="Ativar"> ' +
                                    '           <i class="fa fa-thumbs-up"></i> ' +
                                    '        </button> &nbsp;' +                                    
                                                                        
                                    '        <button class="btn btn-warning" id="btn-grid-inactivate" name="btn-grid-inactivate"  title="Desativar"> ' +
                                    '            <i class="fa fa-thumbs-down"></i> ' +
                                    '        </button> &nbsp;' +                                    
                                                                        
                                    '        <button class="btn btn-inverse" id="btn-grid-delete" name="btn-grid-delete"  title="Excluir"> ' +
                                    '            <i class="fa fa-trash"></i> ' +
                                    '        </button> &nbsp;' +  
                                    
                                    '    </div> ' +
                                    '</script> '
            },
        
            options : {
                name: 'PopupViewModel',
           
                /* url can be a string or a object defining all urls used following the model
                 * { get: url, getById: url, save: url, delete: url } */
                url: undefined,              
                form: undefined,
                model: undefined,
                title: 'Base PopupViewmodel',                
                showNewButton: true,
                showEditButton: true,
                showActivateButton: true,
                showInactivateButton: true,
                showDeleteButton: false,
                showRecordOptions: true,
                newButtonText: 'Adicionar novo',
                popupTitle: 'Inserir/Alterar novo',
           
                grid: {
                    width: undefined,
                    height: undefined,
                    initialFilter: undefined,
                    initialSort: undefined,
                    customFilterables: undefined,
                    columns: undefined               
                },

                statusField: 'situacao',
                
                status: {
                    active: 'A',
                    inactive: 'I'
                },
                
                approvation: false,
                approvationField: 'aprovado',
                negativeField: 'idnegativa_cadastro',
                reasonField: 'motivo_reprovacao',
                
                approvationStatus: {
                    approve: 'S',
                    disapprove: 'N',
                    pendent: 'P'
                },                
                
                messages: {
                    error: 'Houve um problema ao tentar realizar esta operação. Por favor, tente novamente mais tarde.',
                    save: 'Registro SALVO com sucesso!',
                    delete: 'Registro EXCLUIDO com sucesso!',
                    activate: 'Registro ATIVADO com sucesso!',
                    inactivate: 'Registro DESATIVADO com sucesso!',
                    deleteConfirmation: 'Tem certeza que deseja realmente EXCLUIR o registro?',
                    approve: 'Registro APROVADO com sucesso!',
                    disapprove: 'Registro REPROVADO com sucesso!'
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
                AFTERAPPROVE
            ],

            createModel: function(item) {
                var that = this;
                return new that.options.model(item);                    
            },

            delete: function() {
                var that = this,                    
                    dataItem = that.grid.dataItem();

                if(!dataItem) {
                    return;
                }

                var model = that.createModel();        
                that.operation = "deleting";
                that.trigger(BEFOREDELETE, { item: dataItem.toJSON() });
            
                window.MessageBox.confirm(
                    'Exclusão de registro',
                    that.options.messages.deleteConfirmation,
                    
                    function() {
                        that.trigger(BEFOREDELETE, { item: dataItem });
                        app.showLoading();

                        $.ajax({
                            type: 'DELETE',
                            url: that.options.url.delete + '?id=' + dataItem.get(model.idField),
                            dataType: 'json',
                            
                            success: function(result) {
                                app.hideLoading();
                                
                                window.MessageBox.alert(
                                    "Exclusão de registro",
                                    that.options.messages.delete,
                                    {
                                        icon: window.MessageBox.SUCCESS,
                                        height: 120,
                                        handler: function () {                                            
                                            that.trigger(AFTERDELETE, { item: dataItem.toJSON(), result: result });
                                            that.operation = "reading";
                                        }
                                    }
                                );

                            },
                            
                            error: function(a,b,c) {
                                app.hideLoading();
                                app.ajaxError(a,b,c);
                            }
                        }); 
                    } 
                );
            },
            
            activate: function() {
                var that = this,                    
                    dataItem = that.grid.dataItem();

                if(!dataItem) {
                    return;
                }

                var model = that.createModel();      
                that.operation = "activating";
                that.trigger(BEFOREACTIVATE, { item: dataItem });
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: that.options.url.activate,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(model.idField)
                    },
                            
                    success: function(result) {
                        app.hideLoading();
                                
                        if(result.success) {
                            window.MessageBox.alert(
                                "Ativação de registro",
                                that.options.messages.activate,
                                {
                                    icon: window.MessageBox.SUCCESS,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.active);
                                        that.trigger(AFTERACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                    }
                                }
                            );
                        }
                        else {
                            window.MessageBox.alert(
                                "Ativação de registro",
                                'Houve um problema ao tentar ATIVAR o registro. Por favor, tente mais tarde!',
                                {
                                    icon: window.MessageBox.WARNING,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.inactive);
                                        that.trigger(AFTERACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                    }
                                }
                            );                            
                        }
                    },
                            
                    error: function(a,b,c) {
                        app.hideLoading();
                        app.ajaxError(a,b,c);
                    }
                }); 
            },
            
            inactivate: function() {
                var that = this,                    
                    dataItem = that.grid.dataItem();

                if(!dataItem) {
                    return;
                }

                var model = that.createModel();
                that.operation = "inactivating";
                that.trigger(BEFOREINACTIVATE, { item: dataItem });
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: that.options.url.inactivate,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(model.idField)
                    },
                            
                    success: function(result) {
                        app.hideLoading();
                                
                        if(result.success) {
                            window.MessageBox.alert(
                                "Desativação de registro",
                                that.options.messages.inactivate,
                                {
                                    icon: window.MessageBox.SUCCESS,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.statusField, that.options.status.inactive);
                                        that.trigger(AFTERINACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                    }
                                }
                            );
                        }
                        else {
                            window.MessageBox.alert(
                                "Desativação de registro",
                                'Houve um problema ao tentar DESATIVAR o registro. Por favor, tente mais tarde!',
                                {
                                    icon: window.MessageBox.WARNING,
                                    height: 120,
                                    handler: function () {
                                        dataItem.set(that.options.statusField, that.options.status.active);
                                        that.trigger(AFTERINACTIVATE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                    }
                                }
                            );                            
                        }
                    },
                            
                    error: function(a,b,c) {
                        app.hideLoading();
                        app.ajaxError(a,b,c);
                    }
                });                 
            },
            
            approve: function() {
                var that = this,                    
                    dataItem = that.grid.dataItem();

                if(!dataItem) {
                    return;
                }

                var model = that.createModel();         
                that.operation = "approving";
                that.trigger(BEFOREAPPROVE, { item: dataItem });
                app.showLoading();

                $.ajax({
                    type: 'POST',
                    url: that.options.url.approve,
                    dataType: 'json',
                    
                    data: {
                        id: dataItem.get(model.idField)
                    },
                            
                    success: function(result) {
                        app.hideLoading();
                                
                        if(result.success) {
                            window.MessageBox.alert(
                                "Aprovação de registro",
                                that.options.messages.approve,
                                {
                                    icon: window.MessageBox.SUCCESS,
                                    height: 120,
                                    handler: function () {                                        
                                        dataItem.set(that.options.approvationField, that.options.approvationStatus.approve);
                                        that.trigger(AFTERAPPROVE, { item: dataItem.toJSON(), result: result });
                                        that.operation = "reading";
                                    }
                                }
                            );
                        }
                        else {
                            window.MessageBox.alert(
                                "Aprovação de registro",
                                'Houve um problema ao tentar APROVAR o registro. Por favor, tente mais tarde!',
                                {
                                    icon: window.MessageBox.WARNING,
                                    height: 120,
                                    handler: function () {
                                        that.operation = "reading";
                                        dataItem.set(that.options.approvationField, that.options.approvationStatus.approve);
                                        that.trigger(AFTERAPPROVE, { item: dataItem.toJSON(), result: result });
                                    }
                                }
                            );                            
                        }
                    },
                            
                    error: function(a,b,c) {
                        app.hideLoading();
                        app.ajaxError(a,b,c);
                    }
                }); 
            },
            
            disapprove: function() {
                var that = this,
                    dataItem = that.grid.dataItem();

                if(!dataItem) {
                    return;
                }

                var element = $('div#disapprove-popup'), popup;
                
                if(element.length > 0) {
                    var popup = element.data('kendoReprovacaoPopup');
                    
                    if(popup) {
                        popup.destroy();
                    }
                    
                    element.each(function() {
                        this.remove();
                    });
                }
                
                that.operation = 'disapproving';
                element = $('<div id="disapprove-popup"></div>').appendTo( $('body') );                
                var model = that.createModel();
                
                popup = element.kendoReprovacaoPopup({
                    id: dataItem.get(model.idField),                    
                    url: that.options.url.disapprove,
                    
                    afterDisapprove: function(e) {
                        if(!e.result.success) {
                            return;
                        }
                        
                        dataItem.set(that.options.approvationField, that.options.approvationStatus.disapprove);
                        dataItem.set(that.options.negativeField, e.item.negative);
                        dataItem.set(that.options.reasonField, e.item.reason);
                    }
                }).data('kendoReprovacaoPopup');
                
                popup.center().open();
            },
            
            formatHtml: function(html){
                var that = this;
                return html.replace(/\{name\}/g, that.options.name.toLowerCase());
            },
       
            renderForm: function(element) {
                var that = this,
                    formElement = $(that.formatHtml(that.templates.form)).appendTo(element);
            
                that.form = new that.options.form(formElement,{
                    showDeleteButton:false,
                    showCancelButton: false
                });
            },
       
            getColumn: function(field) {
                var that = this,
                    column;
           
                $.each(that.grid.columns, function(){
                    var col = this;
               
                    if(col.field === field) {
                        column = col;
                    }
                });
           
                return column;
            },
       
            getColumnIndex: function(field) {
                var that = this,
                    index;
           
                $.each(that.grid.columns, function(idx, val){
                    var col = this;
               
                    if(col.field === field) {
                        index = idx;
                    }
                });
           
                return index;
            },
            
            addNew: function(){
                var that = this;                
                that.operation = "inserting";
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
                    button = rowFluid.find('#popup-btnNew');
       
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
                        
                        if(that.operation === "updating" && that.dataItemToBind) {
                            that.form.bindDataItem(that.dataItemToBind);                            
                            that.form.performEdit();
                        }
                        else if(that.operation === "inserting") {
                            that.form.performInsert();
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
            
            bindGridButtonsEvents: function(grid) {
                var that = this,
                    rows = grid.tbody.find('tr[role=row]');            
            
                rows.each(function() {
                    var row = $(this),
                        btnEdit       = row.find('#btn-grid-edit'),
                        btnActivate   = row.find('#btn-grid-activate'),
                        btnInactivate = row.find('#btn-grid-inactivate'),
                        btnDelete     = row.find('#btn-grid-delete');
                        
                        if(that.options.showEditButton === false) {
                            btnEdit.hide();
                        }
                        
                        if(that.options.showActivateButton === false) {
                            btnActivate.hide();
                        }
                        
                        if(that.options.showInactivateButton === false) {
                            btnInactivate.hide();
                        }
                        
                        if(that.options.showDeleteButton === false) {
                            btnDelete.hide();
                        }
                       
                        btnEdit.click(function(e) {
                            var button = $(this),
                                parent = button.parents('tr[role=row]'),
                                uid = parent.data('uid'),
                                dataItem = that.grid.dataSource.getByUid(uid);
                           
                            if(!dataItem)
                                return;

                            that.operation = 'updating';
                            that.grid.select(parent);
                            that.dataItemToBind = dataItem;
                            that.openWindow();
                            e.stopPropagation();
                        });

                        btnActivate.click(function(e) {
                            var button = $(this),
                                parent = button.parents('tr[role=row]'),
                                uid = parent.data('uid'),
                                dataItem = that.grid.dataSource.getByUid(uid);

                            if(!dataItem)
                                return;

                            that.operation = 'activating';
                            that.grid.select(parent);
                            that.activate();
                            e.stopPropagation();
                        });

                        btnInactivate.click(function(e) {
                            var button = $(this),
                                parent = button.parents('tr[role=row]'),
                                uid = parent.data('uid'),
                                dataItem = that.grid.dataSource.getByUid(uid);

                            if(!dataItem)
                                return;

                            that.operation = 'inactivating';
                            that.grid.select(parent);
                            that.inactivate();
                            e.stopPropagation();
                        });

                        btnDelete.click(function(e) {
                            var button = $(this),
                                parent = button.parents('tr[role=row]'),
                                uid = parent.data('uid'),
                                dataItem = that.grid.dataSource.getByUid(uid);

                            if(!dataItem)
                                return;

                            that.operation = 'deleting';
                            that.grid.select(parent);
                            that.delete();
                            e.stopPropagation();
                        }); 
                    });
            },
       
            renderGrid: function(element) {
                var that = this,
                    gridElement = $(that.formatHtml(that.templates.grid)).appendTo(element);
       
                var url = typeof that.options.url === 'string' 
                            ? that.options.url
                            : that.options.url.get;
                       
                that.renderNewButton(element);
                
                var template = $('body #popup-grid-buttons'); 
                
                if(template.length === 0) {
                    template = $(that.templates.defaultGridButtons).prependTo($('body'));
                }
       
                if(!that.gridButtonsColumnAdded && that.options.showRecordOptions) {
                    that.options.grid.columns.push({
                        width: '24%',
                        template: kendo.template(template.html())
                    });
                    
                    that.gridButtonsColumnAdded = true;
                }
       
                that.grid = gridElement.kendoFilterGrid({
                    model: that.options.model,
                    url: url,
                    columns: that.options.grid.columns,
                    width: that.options.grid.width,
                    height: that.options.grid.height,
                    initialFilter: that.options.grid.initialFilter,
                    initialSort: that.options.grid.initialSort,
                    customFilterables: that.options.grid.customFilterables,
                    
                    change: function(e) {
                        var grid = e.sender,
                            dataItem = grid.dataItem();
                    
                        if(!dataItem)
                            return;

                        that.dataItemToBind = dataItem;
                        that.trigger(GRIDCHANGE, { sender: that, dataItem: dataItem });
                    },
                    
                    dataBound: function(e) {
                        that.bindGridButtonsEvents(e.sender);
                    }
                }).data('kendoFilterGrid');
           
                var grouping = that.grid.wrapper.find('.k-grouping-header');           
                grouping.addClass('hidden-phone');
                that.grid.wrapper.css({ 'margin-top' : '5px' });
            },
            
            render : function() {
                var that = this,
                    element = that.element;
       
                element.html('');
                element.css({ 'padding' : '5px' });
                that.renderWindowPopup();
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
                    element = that.element.find('#popup-title h4');
                    
                element.html('<i class="fa fa-th"></i> &nbsp;' + title);
            },
            
            hideAddButton: function() {
                var that = this,
                    button = that.element.find("#popup-btnNew");
            
                button.hide();
            },
            
            showAddButton: function() {
                var that = this,
                    button = that.element.find("#popup-btnNew");
            
                button.show();
            },

            bindEvents: function() {
                var that = this;

                that.bind(AFTERDELETE, $.proxy(function(e) {
                    e.sender.grid.dataSource.read();
                }, that));

                that.bind(AFTERACTIVATE, $.proxy(function(e) {
                    e.sender.grid.dataSource.read();
                }, that));

                that.bind(AFTERINACTIVATE, $.proxy(function(e) {
                    e.sender.grid.dataSource.read();
                }, that));        
            },
       
            load: function(element, options) {
                var that = this;
                that.options = $.extend({}, that.options, options);
                that.element = element;
                that.events = that._events;
                that.render();
                that.resize();
                that.bindEvents();
            }
        });
    });
    
})(jQuery);
