require(['app'], function(app) {
   app.messages.en = {
       selectCompany: 'Select the company',
       
       selectCompanyRequired: 'Select a valid company and try again!',
       
       selectCompanyTitle: 'Change the selected company',
       
       changeCompany: 'Change company',
       
       close: 'Close',
       
       negative: 'Record Negative',
       
       negativeRequired: 'The <b> RECORD NEGATIVE </b> field is required!',
       
       negativeDescription: 'Record Negative Description',
       
       aditionalInformation: 'Aditional Informations',
       
       disapproveTitle: 'Record Disapprove',
       
       disapproveMessages: {
           disapprove: 'Record DISAPPROVED successfully!',
           problem: "There's a problem when try to DISAPPROVE this record. Please, try again later!"
       },
       
       confirmDisapprove: 'Confirm Disapprove',
       
       fileRequired: 'Select a file and try again!',
       
       documentName: 'Document Name',
       
       fileTitle: 'Do File Upload',
       
       fileMessages: {
           typenotallowed: 'File type not allowed'
       },
       
       saveButton: 'Save',
       
       cancelButton: 'Cancel',
       
       editButton: 'Edit',
       
       deleteButton: 'Delete',
       
       activateButton: 'Activate',
       
       inactivateButton: 'Inactivate',
       
       approveButton: 'Approve',
       
       disapproveButton: 'Disapprove',
       
       verifyButton: 'Verify',
       
       formMessages : {
           error: "There's a problem when try complete this operation. Please, try again later.",
           save: 'Record SAVED successfully!',
           delete: 'Record REMOVED successfully!',
           activate: 'Record ACTIVATED successfully!',
           inactivate: 'Record INACTIVATED successfully!',
           deleteConfirmation: 'Are you really sure you want DELETE this record?',
           approve: 'Record APPROVED successfully!',
           disapprove: 'Record REPPROVED successfully!',
           saveTitle: 'Insert/Update Record',
           deleteTitle: 'Delete Record',
           activateTitle: 'Record Activate',
           inactivateTitle: 'Record Inactivate',
           approveTitle: 'Record Approval',
           cpf_cnpjTitle: 'Record Duplicated',
           cpf_cnpj: 'Already exists a #ENTIDADE# with that #CPF_CNPJ#. </br> Do you want to COPY the record?'
        },
       
       id: 'ID',
       
       filterGridNoRecords: "There's no records in search!",
       
       filterGridGroupableEmpty: 'Drop a column here to group the informations by this column.',
       
       filterGridPageMessages: {
          display: 'Showing {0} of {2} items',
          of: 'of',
          first: 'Go to first page',
          last: 'Go to last page',
          next: 'Next page',
          previous: 'Previous page',
          refresh: 'Refresh'
       },
       
       filterGridFilterableMessages : {
           and: 'and',
           or: 'or',
           filter: 'Filter',
           clear: 'Clear',
           info: 'Filter by',
           isFalse: 'false',
           isTrue: 'true',
           search: 'Search',
           selectValue: 'Select',
           cancel: 'Cancel'
       },
       
       filterGridFilterableOperators : {
           string: {
               eq: 'Equals',
            //    neq: 'Different',
            //    isnull: 'Is Null',
            //    isnotnull: 'Is Not Null',
            //    isempty: 'Is Empty',
            //    isnotempty: 'Is Not Empty',
            //    startswith: 'Starts With',
            //    endswith: 'Ends With',
               contains: 'Contains',
            //    doesnotcontain: "Doesn't Contain",
            //    gte: 'Greater or equal than',
            //    gt: 'Greater than',
            //    lte: 'Less or equal than',
            //    lt: 'Less than'
           },

           number: {
               eq: 'Equals',
               neq: 'Different',
            //    gte: 'Greater or equals than',
            //    gt: 'Greater than',
            //    lte: 'Less or equal than',
            //    lt: 'Less than'
           },

           enums: {
               eq: 'Equals',
               neq: 'Different'
           },

           date: {
               eq: 'Equals',
               neq: 'Different'
           }
       },

       invalidEmail: 'Format e-mail is invalid!',
       invalidName: 'Name has some invalid characters!',
       invalidYear: 'Year invalid!',
       invalidDate: 'Date invalid!',
       invalidCoord: 'Coordinate invalid!',
       textWithSpaces: 'Text has some unnecessary spaces in the begining or in the end of text!',
       addButton: 'Add',
       clearButton: 'Clear',
       addFileButton: 'Add File',
       responsable_user: 'Usuário Responsável',
       date_disapproval: 'Data da Reprovação',
       reason: 'Aditional Informations'
   }; 
});