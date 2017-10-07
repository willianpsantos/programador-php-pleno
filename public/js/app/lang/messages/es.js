require(['app'], function(app) {
   app.messages.es = {
       selectCompany: 'Seleccione la empresa',
       
       selectCompanyRequired: 'Seleccione una empresa válida y intente nuevamente!',
       
       selectCompanyTitle: 'Cambie la empresa seleccionada',
       
       changeCompany: 'Cambiar Empresa',
       
       close: 'Cerrar',
       
       negative: 'Negativa de Registro',
       
       negativeRequired: 'El campo <b> NEGATIVA DE REGISTRO </b> es obligatorio!',
       
       negativeDescription: 'Descripción de la negativa de registro',
       
       aditionalInformation: 'Informaciones adicionales',
       
       disapproveTitle: 'Reprobación de Registro',
       
       disapproveMessages: {
           disapprove: 'Registro REPROBADO con éxito!',
           problem: 'Ha habido un problema al intentar REPROBAR el registro. Por favor, intente de nuevo después!'
       },
       
       confirmDisapprove: 'Confirmar Reprobación',
       
       fileRequired: 'Seleccione un archivo y intente de nuevo!',
       
       documentName: 'Nombre del documento',
       
       fileTitle: 'Realizar Upload de Archivo',
       
       fileMessages: {
           typenotallowed: 'Tipo de archivo no es permitido!'
       },
       
       saveButton: 'Salvar',
       
       cancelButton: 'Cancelar',
       
       editButton: 'Editar',
       
       deleteButton: 'Eliminar',
       
       activateButton: 'Activar',
       
       inactivateButton: 'Inactivar',
       
       approveButton: 'Aprobar',
       
       disapproveButton: 'Reprobar',
       
       verifyButton: 'Comprobar',
       
       formMessages : {
           error: 'Ha habido un problema al intentar realizar esta operación. Por favor, intente de nuevo después.',
           save: 'Registro SALVO con éxito!',
           delete: 'Registro ELIMINADO con éxito!',
           activate: 'Registro ACTIVADO con éxito!',
           inactivate: 'Registro DESACTIVADO con éxito!',
           deleteConfirmation: '¿Estas seguro de que desea ELIMINAR este registro?',
           approve: 'Registro APROVADO con éxito!',
           disapprove: 'Registro REPROVADO con éxito!',
           saveTitle: 'Incluir/Editar Registro',
           deleteTitle: 'Eliminar Registro',
           activateTitle: 'Activación de Registro',
           inactivateTitle: 'Inactivación de Registro',
           approveTitle: 'Aprobación de Registro',
           cpf_cnpjTitle: 'Registro Duplicado',
           cpf_cnpj: 'Ya existe un #ENTIDADE# con este #CPF_CNPJ#. ¿Desea COPIAR la información?'
       },
       
       id: 'Código',
       
       filterGridNoRecords: 'No hay registros encontrados!',
       
       filterGridGroupableEmpty: 'Arrastre una columna hasta aqui para agrupar las informaciónes por esta columna.',
       
       filterGridPageMessages: {
          display: 'Mostrando {0} de {2} itens',
          of: 'de',
          first: 'Vaya a la primera página',
          last: 'Vaya a la ultima página',
          next: 'Página Siguiente',
          previous: 'Página anterior',
          refresh: 'Actualizar'
       },
       
       filterGridFilterableMessages : {
           and: 'e',
           or: 'o',
           filter: 'Filtrar',
           clear: 'Limpiar',
           info: 'Filtrar por',
           isFalse: 'falso',
           isTrue: 'verdadero',
           search: 'Busquear',
           selectValue: 'Seleccione',
           cancel: 'Cancelar'
       },
       
       filterGridFilterableOperators : {
           string: {
               eq: 'Igual',
            //    neq: 'Diferente',
            //    isnull: 'Es nulo',
            //    isnotnull: 'No es nulo',
            //    isempty: 'Es vacío',
            //    isnotempty: 'No es vacío',
            //    startswith: 'Empieza con',
            //    endswith: 'Termina con',
               contains: 'Contiene',
            //    doesnotcontain: 'No contiene',
            //    gte: 'Es mayor o igual que',
            //    gt: 'Es mayor que',
            //    lte: 'Es menos o igual que',
            //    lt: 'Es menos que'
           },

           number: {
               eq: 'Igual',
               neq: 'Diferente',
            //    gte: 'Es mayor o igual que',
            //    gt: 'Es mayor que',
            //    lte: 'Es menos o igual que',
            //    lt: 'Es menos que'
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

       invalidEmail: 'Dirección de e-mail estas en un formato invalido!',
       invalidName: 'Nombre presenta caracteres invalidos!',
       invalidYear: 'Ano invalido!',
       invalidDate: 'Data invalidos!',
       invalidCoord: 'Coordenada invalida!',
       textWithSpaces: 'Texto presenta espacios innecesarios en el principio o en el final del texto!',
       addButton: 'Añadir',
       clearButton: 'Limpiar',
       addFileButton: 'Añadir Arquivo',
       responsable_user: 'Usuário Responsável',
       date_disapproval: 'Data da Reprovação',
       reason: 'Informaciónes Adicionales'
   }; 
});