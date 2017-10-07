define('model/matricula', ['kendo'], function(kendo) {
    return kendo.data.Model.define({
       id: 'idmatricula',
       
       fields: {
           'idmatricula': { type: 'number', title: 'Código', editor: 'numerictextbox', readOnly: true },  
           
           'idaluno': { 
                type: 'number', 
                title: 'Aluno',
                required: 'O campo <b> ALUNO </b> é obrigatório!',
                editor: 'alunodropdownlist'
           },

           'turma': {
               type: 'string',
               title: 'Turma',
               maxLength: 50
           },

           'periodo_letivo': {
               type: 'string',
               title: 'Período Letivo',
               maxLength: 10
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

