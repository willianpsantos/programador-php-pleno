require(['app'], function(app) {
    
    String.prototype.rawUrl = function(){
        var regex = /\{\w+\}/g,
        match, matches = [],
        url = this;
        
        while(match = regex.exec(url)) {
            matches.push(match[0]);
        }
        
        for(var i = 0; i < matches.length; i++) {
            var value = arguments[i];
            match = matches[i];
            
            if(!value) {
                value = "";
            }
            
            url = url.replace(match, value);
        }
        
        return url;
    };
    
    app.urls = {
        aluno: {
            all: '/aluno/all',
            get: '/aluno/data',
            getById: '/aluno/id/{id}',
            save: '/aluno/save',
            activate: '/aluno/activate',
            inactivate: '/aluno/inactivate',
            delete: '/aluno/delete'                
        },

        curso: {
            all: '/curso/all',
            get: '/curso/data',
            getById: '/curso/id/{id}',
            save: '/curso/save',
            activate: '/curso/activate',
            inactivate: '/curso/inactivate',
            delete: '/curso/delete'                
        },

        matricula: {
            all: '/matricula/all',
            get: '/matricula/data',
            getById: '/matricula/id/{id}',
            save: '/matricula/save',
            activate: '/matricula/activate',
            inactivate: '/matricula/inactivate',
            delete: '/matricula/delete'                
        },

        matriculacurso: {
            all: '/matriculacurso/all',
            get: '/matriculacurso/data',
            getById: '/matriculacurso/id/{id}',
            save: '/matriculacurso/save',
            activate: '/matriculacurso/activate',
            inactivate: '/matriculacurso/inactivate',
            delete: '/matriculacurso/delete'                
        }
    };    
});