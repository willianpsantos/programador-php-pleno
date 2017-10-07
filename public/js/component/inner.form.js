(function($) {
    var BEFORERENDER = "beforeRender",
        AFTERRENDER = "afterRender",
        BEFORESAVE = "beforeSave",
        AFTERSAVE = "afterSave",
        BEFOREDELETE = "beforeDelete",
        AFTERDELETE = "afterDelete",
        DATABINDING = "dataBinding",
        DATABOUND = "dataBound",
        INIT = "init",       
        EDIT = "edit",
        INSERT = "insert",
        CANCEL = "cancel";    
            
    require(['app', 'kendo'], function(app, kendo) {
        
        var Widget = kendo.ui.Widget;
        
        window.InnerForm = Widget.extend({
            templates: {                
                form: '<div class="form-vertical"></div>',
                
                row: '<div class="row-fluid"></div>',
                
                control: '<div class="span{span}" {permission}> ' +
                         '    <div class="control-group"> ' +
                         '        <label class="control-label {.required}">{title}</label> ' +
                         
                         '        <div class="controls controls-row"> ' +
                         '            <input type="{type}" class="input-block-level" id="{id}" {editor} {value-primitive} {text-field} {value-field} {required} {maxlength} {format} {validator} {min} {max} {table} data-bind="{binder}: {field}, {datasource}" /> ' +
                         '        </div> ' +
                         '    </div> ' +
                         '</div>',

                controlText: '<div class="span{span}" {permission}> ' +
                             '    <div class="control-group"> ' +
                             '        <label class="control-label {.required}">{title}</label> ' +
                             
                             '        <div class="controls controls-row"> ' +
                             '            <textarea style="width:100%; height: 100px;" id="{id}" {editor} {value-primitive} {text-field} {value-field} {required} {validator} {table} data-bind="value: {field}, {datasource}"></textarea> ' +
                             '        </div> ' +
                             '    </div> ' +
                             '</div>',

                buttons : '<div class="row-fluild buttons center-block" data-bind="visible: formEnabled"> ' +                  
                          '</div>'
            },
            
            options:  {
                name: 'InnerForm',                
                model: undefined,
                rows: undefined,
                initEnabled: false,                
                dotReplaceChar: 'Z',
                masterField: undefined,
                showSaveButton: true,
            },
            
            _events: [
                BEFORERENDER,
                AFTERRENDER,
                BEFORESAVE,
                AFTERSAVE,
                DATABINDING,
                DATABOUND,
                INIT,
                BEFOREDELETE,
                AFTERDELETE,                
                EDIT,
                INSERT,
                CANCEL
            ],

            getInnerName: function() {
                return "inner" + this.options.masterField;
            },
            
            createModel: function(item) {
                var that = this;
                return new that.options.model(item);                    
            },
            
            dataItem: function() {      
                var that = this;
                
                if(that.observableObject)
                    return that.observableObject;        
                
                that.observableObject = kendo.observable(that.model.toJSON());
                return that.observableObject;
            },
            
            treatNumberFields: function(item) {
                var that = this;
                
                if(!that.numberFields || that.numberFields.length === 0) {
                   return item;
               }
               
               var isfloat = false;
               
               for(var i = 0; i < that.numberFields.length; i++) {
                   var nField = that.numberFields[i],
                       number = item[nField.field];
               
                   if(!number) 
                       continue;
                   
                   var strNumber = "",
                       newNumber;
                   
                   strNumber = number.toString();
                   
                   if(strNumber.indexOf('.') > 0) {
                       isfloat = true;
                   }
                    
                   newNumber = strNumber.replace(',', '.');   
                   
                   item[nField.field] = isfloat ?  parseFloat(newNumber) : parseInt(newNumber);
               }
               
               return item;
            },
            
            prepareToFlush: function(item) {
                
            },

            prepareToPost: function(item) {
               var that = this,
                   regex = /^inner|Enabled$|Values$|Visible$/i;
               
               for(var i in item) {
                   if(regex.test(i)) {
                       delete item[i];
                   }
                   
                   var value = item[i];
                   
                   if(value instanceof Date && value.toJSON) {
                       item[i] = value.toJSON();
                   }
               }               
               
               return that.treatNumberFields(item);
            },

            emptyDataItem: function() {
                var that = this;
                that.observableObject = undefined;
                that.backupObject = undefined;
                that.observableObject = that.createModel();
                kendo.unbind(that.formElement);
                kendo.bind(that.formElement, that.observableObject);
            },         
            
            removeAllErrors: function() {
                var that = this,
                    items = that.formElement.find('[data-required], [data-validator]');

                items.each(function() {                    
                    var item = $(this);

                    if(item.is('[data-previous-validated]')) {
                        return;
                    }

                    app.removeClassError(item);
                    app.removeIconError(item);
                });                
            },
            
            performEdit: function(fetchDropDownLists){
                var that = this;
                that.removeAllErrors();
                that.operation = 'updating';            

                if(fetchDropDownLists === undefined || fetchDropDownLists === true) {
                    that.fetchAllDropDownList();
                }

                that.enable();                
                that.formElement.find('.buttons > #btnSave').show();
                that.formElement.find('.buttons > #btnAdd').hide();
                that.formElement.find('.buttons > #btnClear').hide();
                that.formElement.find('.buttons > #btnCancel').show();

                that.trigger(EDIT);
            },
            
            performCancel: function(){
                var that = this;
                var items = that.formElement.find('[data-previous-validated]');
                items.removeAttr('data-previous-validated');
                that.removeAllErrors();   
                that.clear();
                that.disable();                

                that.formElement.find('.buttons > #btnClear').show();
                that.formElement.find('.buttons > #btnAdd').hide();
                that.formElement.find('.buttons > #btnSave').hide();
                that.formElement.find('.buttons > #btnCancel').hide();

                that.trigger(CANCEL);
                that.operation = "reading";
            },
            
            performInsert: function(fetchDropDownLists) {
                var that = this; 
                that.removeAllErrors();
                that.operation = "inserting";                

                if(fetchDropDownLists === undefined || fetchDropDownLists === true) {
                    that.fetchAllDropDownList();
                }

                that.enable();
                that.formElement.find('.buttons > #btnClear').show();
                that.formElement.find('.buttons > #btnAdd').show();
                that.formElement.find('.buttons > #btnSave').hide();
                that.formElement.find('.buttons > #btnCancel').hide();
                
                that.trigger(INSERT);
            },
            
            prepare: function(item){
                var that = this,
                    rows = that.options.rows;
                    
                var fields = that.model.fields,                
                    dataItem = item ? item : that.dataItem(),
                    innerName = that.getInnerName();

                if(dataItem.get(innerName)) {
                    fields = that.createModel().fields;
                    dataItem = dataItem.get(innerName);
                }

                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = fields[s.field],
                                type, editor;

                            if(s.field.indexOf('.') > 0) {
                                var parts = s.field.split('.'),
                                    first = parts[0];

                                field = fields[parts[0]];

                                if(!dataItem.get(s.field)) {
                                    dataItem.set(parts[0], field.defaultValue);
                                }
                            }             
                            
                            if(s.values && s.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, s.values);
                            }
                            else if(field.values && field.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, field.values);
                            }
                        });
                    });
                };
            
                prepareRows(rows);
            },
            
            bindDataItem: function(item) {                
                var that = this; 

                that.observableObject = undefined;
                that.backupObject = undefined;
                kendo.unbind(that.formElement);
                
                that.model = that.createModel(item);
                that.observableObject = kendo.observable(that.model.toJSON());
                that.backupObject = that.observableObject;
                
                that.prepare();  
                that.trigger(DATABINDING);
                kendo.bind(that.formElement, that.observableObject);                                
                that.trigger(DATABOUND, { sender: that, item: that.observableObject });
            },                  
            
            translateFormat: function(format) {
                switch(format) {
                    case 'currency':
                        return 'c2';
                    case 'percent':
                    case 'percentual':
                    case '%':
                        return 'p2';
                    default:
                        return format;
                }
            },
            
            render: function() {
                var that = this,
                    rows = that.options.rows;
            
                if(that.numberFields) {
                    delete that.numberFields;
                }
                
                that.hasUploadEditor = false;
                that.uploadField = undefined;
                that.numberFields = [];
            
                if(!rows || rows.length === 0) {
                    return;
                }
                
                that.formElement = $(that.templates.form).appendTo(that.element);                
                
                var fields = that.model.fields,                
                    dataItem = that.dataItem(),
                    permissions = [],
                    masks = [];
            
                that.trigger(BEFORERENDER);

                var renderRows = function(rows) {
                    var element = that.formElement,
                        rowElement = undefined;

                    $.each(rows, function(i, v) {
                        var row = v.row;                        
                        rowElement = $(that.templates.row).appendTo(element);
                        
                        $.each(row, function(j, s) {
                            var field = fields[s.field],
                                type, editor;

                            if(s.field.indexOf('.') > 0) {
                                var parts = s.field.split('.'),
                                    first = parts[0];

                                field = fields[parts[0]];

                                if(!dataItem.get(parts[0])) {
                                    dataItem.set(parts[0], field.defaultValue);
                                }
                            }  

                            var fieldType = s.type;

                            if(!fieldType) {
                                fieldType = field.type;
                            }
                            
                            switch(fieldType) {
                                case 'array':
                                    type = 'array';

                                    editor = s.editor 
                                               ? s.editor.toLowerCase() 
                                               : field.editor
                                                   ? field.editor.toLowerCase()
                                                   : null;
                                    break;

                                case 'password':
                                    type = 'password';

                                    editor = s.editor 
                                               ? s.editor.toLowerCase() 
                                               : field.editor
                                                   ? field.editor.toLowerCase()
                                                   : null;
                                    break;

                                case 'bool':
                                case 'boolean':
                                    type = 'checkbox';
                                    editor = 'switch';
                                    break;

                                case 'number':
                                    if(field.editor === 'numericeditor') {
                                        that.numberFields.push({ field: s.field, format: (s.format || field.format) });
                                        type = 'text';                                    
                                    }
                                    else {
                                        type = "number";
                                    }

                                    editor = s.editor 
                                            ? s.editor.toLowerCase() 
                                            : field.editor
                                                ? field.editor.toLowerCase()
                                                : null;
                                    break;                            
                                default:
                                    type = 'text';

                                    editor = s.editor 
                                            ? s.editor.toLowerCase() 
                                            : field.editor
                                                ? field.editor.toLowerCase()
                                                : null;
                                    break;                            
                            }                            
                           
                            if(field.editor === 'uploadeditor') {
                                that.hasUploadEditor = true;
                                that.uploadField = s.field;
                            }

                            var innerName = that.getInnerName() + ".";
                            
                            var html = field.type === 'text' 
                                        ? that.templates.controlText
                                        : that.templates
                                            .control
                                            .replace(/\{type\}/g, type)
                                            .replace(/\{binder\}/g, s.binder 
                                                                        ? s.binder 
                                                                        : field.binder 
                                                                            ? field.binder
                                                                            : 'value')

                                            .replace(/\{format\}/g, s.format 
                                                                        ? 'data-format="' + that.translateFormat(s.format) + '"' 
                                                                        : field.format 
                                                                            ? that.translateFormat(field.format)
                                                                            : '')
                                                                            
                                            .replace(/\{max\}/g, s.max 
                                                                    ? 'max="' + s.max + '"' 
                                                                    : field.max 
                                                                        ? 'max="' + field.max + '"'
                                                                        : "")

                                            .replace(/\{min\}/g, s.max 
                                                                    ? 'min="' + s.min + '"' 
                                                                    : field.max 
                                                                        ? 'min="' + field.min + '"'
                                                                        : "");
                        
                            html =  html.replace(/\{title\}/g, (s.title 
                                                                ? s.title 
                                                                : field.title 
                                                                    ? field.title
                                                                    : ""))

                                        .replace(/\{table\}/g, s.table 
                                                                ? 'data-table="' + s.table + '"' 
                                                                : field.table
                                                                    ? 'data-table="' + field.table + '"' 
                                                                    : "")

                                        .replace(/\{span\}/g, (s.span ? s.span : 3))
                                        .replace(/\{id\}/g, s.field.replace('.', that.options.dotReplaceChar))
                                        .replace(/\{field\}/g, innerName + s.field)

                                        .replace(/\{validator\}/g, s.validator 
                                                                    ? 'data-validator="' + s.validator + '"' 
                                                                    : field.validator
                                                                        ? 'data-validator="' + field.validator + '"' 
                                                                        : "")

                                        .replace(/\{editor\}/g, editor ? 'data-role="' + editor + '"' : '')

                                        .replace(/\{permission\}/g, s.permission 
                                                                    ? 'data-permission="' + s.permission + '"' 
                                                                    : field.permission 
                                                                        ? 'data-permission="' + field.permission + '"' 
                                                                        : '')

                                        .replace(/\{required\}/g, s.required !== undefined && s.required !== false
                                                                    ? 'data-required="' + s.required + '"'
                                                                    : field.required !== undefined && field.required !== false
                                                                        ? 'data-required="' + field.required + '"'
                                                                        : '')

                                        .replace(/\{.required\}/g, s.required !== undefined && s.required !== false
                                                                    ? 'required'
                                                                    : field.required !== undefined && field.required !== false
                                                                        ? 'required'
                                                                        : '')

                                        .replace(/\{maxlength\}/g, s.maxLength && 
                                                                    s.maxLength > 0 && 
                                                                    (!s.editor || !s.editor.toLowerCase().endsWith('dropdownlist')) &&
                                                                        (s.type === 'string')
                                                                    ? 'maxlength=' + s.maxLength
                                                                    : field.maxLength && 
                                                                        field.maxLength > 0 && 
                                                                        (!field.editor || !field.editor.toLowerCase().endsWith('dropdownlist')) &&
                                                                        (field.type === 'string')
                                                                    ? 'maxlength=' + field.maxLength
                                                                    : '');                                    
                            
                            if(s.values && s.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, s.values);
                                
                                html = html.replace(/\{datasource\}/g, ', source: ' + innerName + valuesName)
                                           .replace(/\{value\-primitive\}/g, 'data-value-primitive="true"')
                                           .replace(/\{text\-field\}/g, 'data-text-field="text"')
                                           .replace(/\{value\-field\}/g, 'data-value-field="value"');
                            }
                            else if(field.values && field.values.length > 0) {
                                valuesName = s.field.replace(".", that.options.dotReplaceChar) + 'Values';
                                dataItem.set(valuesName, field.values);
                                
                                html = html.replace(/\{datasource\}/g, ', source: ' + innerName + valuesName)
                                           .replace(/\{value\-primitive\}/g, 'data-value-primitive="true"')
                                           .replace(/\{text\-field\}/g, 'data-text-field="text"')
                                           .replace(/\{value\-field\}/g, 'data-value-field="value"');
                            }
                            else if(fieldType === 'array') {
                                 dataItem.set(valuesName, []);

                                 html = html.replace(/\{datasource\}/g, ', source: ' + valuesName)
                                            .replace(/\{value\-primitive\}/g, '')
                                            .replace(/\{text\-field\}/g, '')
                                            .replace(/\{value\-field\}/g, '');
                            }
                            else {
                                html = html.replace(/\{datasource\}/g, '')
                                           .replace(/\{value\-primitive\}/g, '')
                                           .replace(/\{text\-field\}/g, '')
                                           .replace(/\{value\-field\}/g, '');
                            }
                                
                            rowElement.append(html);
                        });
                    });
                };
            
                renderRows(rows);

                that.formElement.append(that.templates.buttons);                
                
                var keyName = that.model.idField,
                    keyValue = dataItem.get(keyName);
                
                if(!keyValue || keyValue === 0 || keyValue === '') {
                    that.formElement.find('.buttons').hide();
                }
                
                if(masks && masks.length > 0) {
                    for(var i = 0; i < masks.length; i++) {
                        var mask = masks[i];
                        that.setMask(mask.field, mask.mask);
                    }
                }
                
                that.trigger(AFTERRENDER);
            },
            
            enable: function() {
                var element = this.element,
                    children = element.find('[data-bind]');
                
                $.each(children, function() {
                    var item = $(this),
                        data = item.data();

                    if(!data || !data.handler) {
                        item.removeAttr('disabled', 'disabled');
                        return;
                    }
           
                    var handler = data.handler;

                    if(handler.enable) {
                        handler.enable();
                    }
                    else if(handler.disable) {
                        handler.disable(false);
                    }                    
                });

                this.element.find('.buttons').show();
            },
            
            disable: function() {
                var element = this.element,
                    children = element.find('[data-bind]');
                
                $.each(children, function() {
                    var item = $(this),
                        data = item.data();

                    if(!data || !data.handler) {
                        item.attr('disabled', 'disabled');
                        return;
                    }
           
                    var handler = data.handler;

                    if(handler.enable) {
                        handler.enable(false);
                    }
                    
                    if(handler.disable) {
                        handler.disable();
                    }                    
                });

                this.element.find('.buttons').hide();
            },

            clear: function() {
                var element = this.element,
                    children = element.find('[data-bind]');
                
                $.each(children, function() {
                    var item = $(this),
                        data = item.data();

                    if(!data || !data.handler) {
                        item.val('');
                        return;
                    }
           
                    var handler = data.handler;

                    if(handler.value) {
                        handler.value(null);
                    }                    
                });
            },
            
            bindEvents: function() {
                var that = this,
                    options = that.options;
                
                if(options.beforeSave)
                    that.bind(BEFORESAVE, $.proxy(options.beforeSave, that));
                
                if(options.afterSave)
                    that.bind(AFTERSAVE, $.proxy(options.afterSave, that));
                
                if(options.dataBinding)
                    that.bind(DATABINDING, $.proxy(options.dataBinding, that));
                
                if(options.dataBound)
                    that.bind(DATABOUND, $.proxy(options.dataBound, that));
                
                if(options.init)
                    that.bind(INIT, $.proxy(options.init, that));
                
                if(options.beforeRender)
                    that.bind(BEFORERENDER, $.proxy(options.beforeRender, that));
                
                if(options.afterRender)
                    that.bind(AFTERRENDER, $.proxy(options.afterRender, that));
                
                if(options.cancel)
                    that.bind(CANCEL, $.proxy(options.cancel, that));
                
                if(options.edit)
                    that.bind(EDIT, $.proxy(options.edit, that));
                
                if(options.insert)
                    that.bind(INSERT, $.proxy(options.insert));
            },
            
            items: function() {
                var that = this;
                return that.formElement.children();
            },
            
            getEditor: function(name) {
                var that = this,
                    element = that.formElement.find('#' + name.replace('.', that.options.dotReplaceChar));
            
                if(!element || element.length === 0)
                    return null;
                
                var handler = element.data().handler;
                
                if (!handler)
                    return element;
                
                return handler;
            },
            
            fetchAllDropDownList: function(){
                var that = this,
                    rows = that.options.rows;
                    
                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = s.field.replace('.', that.options.dotReplaceChar),
                                editor = that.getEditor(field);

                            if(!editor)
                                return;
                            
                            if (editor instanceof window.LookupDropDownList) {
                                if(editor instanceof kendo.ui.CidadesDropDownList && that.operation === 'inserting') {
                                    editor.ufEditor.select(0);
                                    editor.filterCities(editor.ufEditor.value());                                    
                                }
                                else {
                                    editor.dataSource.read();
                                }
                            }
                        });
                    });
                };
            
                prepareRows(rows);                
            },
            
            prepareAllDropDownList: function(){
                var that = this,
                    rows = that.options.rows;
                    
                var prepareRows = function(rows) {
                    $.each(rows, function(i, v) {
                        if(v.rows && $.isArray(v.rows)) {
                            prepareRows(v.rows);
                            return;
                        }

                        var row = v.row;
                        
                        $.each(row, function(j, s) {
                            var field = s.field.replace('.', that.options.dotReplaceChar),
                                editor = that.getEditor(field);

                            if(!editor)
                                return;
                            
                            if(!(editor instanceof window.LookupDropDownList))
                                return;
                    
                            editor.options.inForm = true;
                            
                            editor.bind('clear', function(e) {
                                var item = that.dataItem();                                    
                                item.set(s.field, null);
                            });
                        });
                    });
                };
            
                prepareRows(rows);       

                var that = this,
                    dataItem = that.dataItem();
            
                if(!dataItem)
                    return;
                
                for(var i in dataItem) {
                    var editor = that.getEditor(i.replace('.', that.options.dotReplaceChar));
                    
                    if(!editor)
                        continue;
                    
                    if(!(editor instanceof window.LookupDropDownList))
                        continue;
                    
                    editor.bind('clear', function(e) {
                        var field = e.sender.element.attr('id').replace(that.options.dotReplaceChar, '.'),
                            item = that.dataItem();
                            
                        item.set(field, null);
                    });
                }
            },
            
            validate: function() {
                var that = this;
                
                that.removeAllErrors();

                var validated = app.validate(that.formElement),
                    customValidated = true,
                    dataItem = that.dataItem(),
                    id = dataItem.get(that.model.idField);

                var elems = that.formElement.find('[data-validator]');

                elems.each(function() {
                    var item = $(this);
                    
                    if(!item.is(':visible')) {
                        return;
                    }

                    var field = item.attr('id').replace(that.options.dotReplaceChar, '.'),
                        table = item.data('table'),
                        name = item.data('validator'),
                        value = dataItem.get(field),
                        validator = app.getValidator(name);                    
                   
                    validator.setOptions({
                        form: that,
                        id: id,
                        field: field,
                        table: table,
                        dotReplaceChar: that.options.dotReplaceChar
                    });

                    var itemValidated = validator.validate(value);

                    if(!itemValidated) {
                        customValidated = false;
                    } 
                });               
                
                return validated && customValidated;
            },
            
            changeLabel: function(field, label) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                var labelElement = row.find('.control-label');
                labelElement.html(label);
            },
            
            hideEditor: function(field) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                row.hide();
            },
            
            showEditor: function(field) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                var row;
                
                if(editor.wrapper) {
                    row = editor.wrapper.parents('[class^=span]');
                }
                else if(editor.element) {
                    row = editor.element.parents('[class^=span]');
                }
                else {
                    row = editor.parents('[class^=span]');
                }
                
                row.show();
            },
            
            setMask: function(field, mask) {
                var that = this,
                    editor = that.getEditor(field);
            
                if(!editor) {
                    return;
                }
                
                editor.mask && editor.mask(mask);
            },

            makeRequired: function(field, message) {
                var that = this,
                    dataItem = that.dataItem();

                if(!message) {
                    var title = that.model.fields[field].title;
                    message = 'O campo <b> ' + title.toUpperCase() + ' </b> é obrigatório!';
                }

                that.model.fields[field].required = message;

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.attr('data-required', message);
                }
                else {
                    editor.attr('data-required', message);
                }

                parent.find('.control-label').addClass('required');
            },

            makeUnrequired: function(field) {
                var that = this,
                    dataItem = that.dataItem();
                
                that.model.fields[field].required = false;

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.removeAttr('data-required');
                }
                else {
                    editor.removeAttr('data-required');
                }

                parent.find('.control-label').removeClass('required');
            },

            changeRequiredMessage: function(field, message) {
                var that = this,
                    dataItem = that.dataItem();

                if(!message) {
                    return;
                }

                if(that.model.fields[field]) {
                    that.model.fields[field].required = message;
                }

                var editor = that.getEditor(field),
                    parent = null;

                if(editor.wrapper) {
                    parent = editor.wrapper.parents('.control-group');
                }
                else if(editor.element) {
                    parent = editor.element.parents('.control-group');
                }
                else {
                    parent = editor.parents('.control-group');
                }

                if(editor.element) {
                    editor.element.attr('data-required', message);
                }
                else {
                    editor.attr('data-required', message);
                }
            },
            
            init: function(element, options) {
                var that = this;
                that.element = $(element);
                that.options = $.extend({}, that.options, options);
                that.events = that._events;
                
                Widget.fn.init.call(that, element, that.options);                
                
                that.element.html('');                
                that.model = that.createModel();
                that.bindEvents();
                that.render();
                that.trigger(INIT);        
                
                that.formElement.data('kendo' + that.options.name, that);
            }
        });
        
        kendo.ui.plugin(window.InnerForm);        
    });
    
})(jQuery);