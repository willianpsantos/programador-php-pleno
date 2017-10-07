require(['app'], function(app) {
   app.messages.pt = {
       selectCompany: 'Selecione a empresa',
       
       selectCompanyRequired: 'Selecione uma empresa válida e tente novamente!',
       
       selectCompanyTitle: 'Trocar a empresa selecionada',
       
       changeCompany: 'Trocar Empresa',       
       
       close: 'Fechar',
       
       negative: 'Negativa de Cadastro',
       
       negativeRequired: 'O campo <b> NEGATIVA DE CADASTRO </b> é obrigatório!',
       
       negativeDescription: 'Descrição da negativa de cadastro',
       
       aditionalInformation: 'Informaçoes adicionais',
       
       disapproveTitle: 'Reprovação de Registro',
       
       disapproveMessages: {
           disapprove: 'Registro REPROVADO com sucesso!',
           problem: 'Houve um problema ao tentar REPROVAR o registro. Por favor, tente mais tarde!'
       },
       
       confirmDisapprove: 'Confirmar Reprovação',
       
       fileRequired: 'Selecione um arquivo e tente novamente!',
       
       documentName: 'Nome do documento',
       
       fileTitle: 'Realizar Upload de Arquivo',
       
       fileMessages: {
           typenotallowed: 'Tipo de arquivo não permitido'
       },
       
       saveButton: 'Salvar',
       
       cancelButton: 'Cancelar',
       
       editButton: 'Editar',
       
       deleteButton: 'Excluir',
       
       activateButton: 'Ativar',
       
       inactivateButton: 'Inativar',
       
       approveButton: 'Aprovar',
       
       disapproveButton: 'Reprovar',
       
       verifyButton: 'Verificar',
       
       formMessages : {
           error: 'Houve um problema ao tentar realizar esta operação. Por favor, tente novamente mais tarde.',
           save: 'Registro SALVO com sucesso!',
           delete: 'Registro EXCLUIDO com sucesso!',
           activate: 'Registro ATIVADO com sucesso!',
           inactivate: 'Registro DESATIVADO com sucesso!',
           deleteConfirmation: 'Tem certeza que deseja realmente EXCLUIR o registro?',
           approve: 'Registro APROVADO com sucesso!',
           disapprove: 'Registro REPROVADO com sucesso!',
           saveTitle: 'Incluir/Alterar Registro',
           deleteTitle: 'Excluir Registro',
           activateTitle: 'Ativação de Registro',
           inactivateTitle: 'Desativação de Registro',
           approveTitle: 'Aprovação de Registro',
           cpf_cnpjTitle: 'Registro Duplicado',
           cpf_cnpj: 'Já existe um #ENTIDADE# com este #CPF_CNPJ#. </br> Deseja COPIAR as informações?'
       },
       
       id: 'Código',
       
       filterGridNoRecords: 'Não há registros encontrados!',
       
       filterGridGroupableEmpty: 'Arraste uma coluna até aqui para agrupar as informações por esta coluna.',
       
       filterGridPageMessages: {
          display: 'Mostrando {0} de {2} itens',
          of: 'de',
          first: 'Vá para a primeira página',
          last: 'Vá para a última página',
          next: 'Próxima página',
          previous: 'Página anterior',
          refresh: 'Atualizar'
       },
       
       filterGridFilterableMessages : {
           and: 'e',
           or: 'ou',
           filter: 'Filtrar',
           clear: 'Limpar',
           info: 'Filtrar por',
           isFalse: 'falso',
           isTrue: 'verdadeiro',
           search: 'Pesquisar',
           selectValue: 'Selecione',
           cancel: 'Cancelar'
       },
       
       filterGridFilterableOperators : {
           string: {
               eq: 'Igual',
            //    neq: 'Diferente',
            //    isnull: 'É nulo',
            //    isnotnull: 'Não é nulo',
            //    isempty: 'É vazio',
            //    isnotempty: 'Não é vazio',
            //    startswith: 'Começa com',
            //    endswith: 'Termina com',
               contains: 'Contem',
            //    doesnotcontain: 'Não contem',
            //    gte: 'É maior ou igual que',
            //    gt: 'É maior que',
            //    lte: 'É menor ou igual que',
            //    lt: 'É menor que'
           },

           number: {
               eq: 'Igual',
               neq: 'Diferente',
            //    gte: 'É maior ou igual que',
            //    gt: 'É maior que',
            //    lte: 'É menor ou igual que',
            //    lt: 'É menor que'
           },

           enums: {
               eq: 'Igual',
               neq: 'Diferente'
           },

           date: {
               eq: 'Igual',
               neq: 'Diferente'
           }
       },

       invalidEmail: 'E-mail está em um formato inválido!',
       invalidName: 'Nome apresenta caracteres inválidos!',
       invalidYear: 'Ano inválido!',
       invalidDate: 'Data inválida!',
       invalidCoord: 'Coordenada inválida!',
       textWithSpaces: 'Texto apresenta espaços desnecessários no começo ou no fim do texto!',

       addButton: 'Adicionar',
       clearButton: 'Limpar',

       addFileButton: 'Adicionar Arquivo',
       responsable_user: 'Usuário Responsável',
       date_disapproval: 'Data da Reprovação',
       reason: 'Informações Adicionais'
   }; 
});