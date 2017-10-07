define('model/curso', ['kendo'], function(kendo) {
    return kendo.data.Model.define({
       id: 'idcurso',
       
       fields: {
           'idcurso': { type: 'number', title: 'Código', editor: 'numerictextbox', readOnly: true },  
           
           'sigla': { 
                type: 'string', 
                title: 'Sigla do Curso', 
                maxLength: 10
            },
           
           'titulo': { 
               type: 'string', 
               title: 'Título do Curso', 
               maxLength: 150,
               required: 'O campo <b> TÍTULO DO CURSO </b> é obrigatório!'
           },

           'descricao': { 
                type: 'text', 
                title: 'Descrição'
            },
           
           'situacao': { 
               type: 'string', 
               title: 'Situação', 
               maxLength: 1, 
               
               values : [ 
                   { text: 'Ativo', value: 'A' }, 
                   { text: 'Inativo', value: 'I'} 
               ], 
               
               defaultValue: 'A',
               editor: 'dropdownlist', 
               readOnly: true 
            }
        }
    });
});

