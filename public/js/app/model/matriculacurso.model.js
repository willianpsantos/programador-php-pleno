define('model/matriculacurso', ['kendo'], function(kendo) {
    return kendo.data.Model.define({
       id: 'idmatricula_curso',
       
       fields: {
           'idmatricula_curso': { type: 'number', title: 'Código', editor: 'numerictextbox', readOnly: true },  
           
           'idmatricula': { 
                type: 'number', 
                title: 'Matricula',
                required: 'O campo <b> MATRICULA </b> é obrigatório!',
                editor: 'matriculadropdownlist'
           },

           'idcurso': { 
                type: 'number', 
                title: 'Curso',
                required: 'O campo <b> CURSO </b> é obrigatório!',
                editor: 'cursodropdownlist'
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

