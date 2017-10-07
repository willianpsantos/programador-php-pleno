define('model/aluno', ['kendo'], function(kendo) {
    return kendo.data.Model.define({
       id: 'idaluno',
       
       fields: {
           'idaluno': { type: 'number', title: 'Código', editor: 'numerictextbox', readOnly: true },           
           
           'nome': { 
               type: 'string', 
               title: 'Nome do Aluno', 
               maxLength: 150,
               required: 'O campo <b> NOME DO ALUNO </b> é obrigatório!',
               validator: "NameValidator"
           },

           'email': { 
                type: 'string', 
                title: 'E-mail', 
                maxLength: 150,
                required: 'O campo <b> E-MAIL </b> é obrigatório!',
                validator: "EmailValidator"
            },

            'dt_nascimento': { 
                type: 'date', 
                title: 'Data de Nascimento',
                validator: 'DateValidator',
                editor: 'dateeditor',
                binder: 'date'
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

