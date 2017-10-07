(function($){
    require(['app'], function(app) {
        var translator = {
            'pt' : {
                "newButtonText": 'Adicionar Novo Agricultor',
                
                "title": "Agricultores",
                
                "tab": {
                    items: [
                        {text: 'Lista', content: ''},
                        {text: 'Dados', content: ''},
                        {text: 'GLA', content: ''},
                    ]
                },
                
                "idpessoa_empresa": { title: "Codigo da empresa" },

                "idpessoa": { title: "Código do Agricultor" },

                "nm_pessoa": { title: "Nome do Agricultor" },

                "tp_pessoa": { title: 'Tipo do agricultor', required: 'O campo <b> TIPO DO AGRICULTOR </b> é obrigatório!' },

                "cpf_cnpj": { "title": "CPF/CNPJ" },

                "insc_est_rg": { "title": "Inscrição Estadual" },

                "inscricao_municipal": { "title": "Inscrição Municipal" },

                "orgao_expedidor_rg": { "title": "Orgao expedidor RG" },

                "data_expedicao_rg": { "title": "Data de expedição RG" },

                "renasem": { "title": "RENASEM" },

                "nacionalidade": { 
                    "title": "Nacionalidade",
                    "values": [
                        { "text": "Brasileiro", "value": "B" },
                        { "text": "Brasileiro Naturalizado", "value": "N" },
                        { "text": "Estangeiro", "value": "E" },
                        { "text": "Português equiparado", "value": "P" }
                    ]
                },

                "matriz": {
                    "title": "Matriz",
                    "values": [
                        { "text": "Não", value: 'N' },
                        { "text": "Sim", value: 'S' }
                    ]
                },

                "idpessoa_matriz": { "title": "Código da Matriz" },

                "idtipo_entidade": { title: 'Tipo de Entidade' },

                "idregiao": { title: 'Região' },

                "observacoes": { "title": "Observações" },

                "situacao": { 
                    "title": "Situação",
                    "values": [
                        { "text": "Ativo", value: 'A' },
                        { "text": "Inativo", value: 'I' }
                    ]
                }  
            }, 

            'es': {
                "newButtonText": 'Añadir Nuevo Agricultor',
                
                "title": "Agricultores",
                
                "tab": {
                    items: [
                        {text: 'Lista', content: ''},
                        {text: 'Dados', content: ''},
                        {text: 'GLA', content: ''},
                    ]
                },
                
                "idpessoa_empresa": { title: "Codigo de la empresa" },

                "idpessoa": { title: "Codigo del Agricultor" },

                "nm_pessoa": { title: "Nombre del Agricultor" },

                "tp_pessoa": { title: 'Tipo de agricultor', required: 'El campo <b> TIPO DE AGRICULTOR </b> es obligatorio!' },

                "cpf_cnpj": { "title": "CPF/CNPJ" },

                "insc_est_rg": { "title": "Inscripción Estadual" },

                "inscricao_municipal": { "title": "Inscripción Municipal" },

                "orgao_expedidor_rg": { "title": "Entidad expedidor RG" },

                "data_expedicao_rg": { "title": "Data de expedición RG" },

                "renasem": { "title": "RENASEM" },

                "nacionalidade": { 
                    "title": "Nacionalidad",
                    "values": [
                        { "text": "Brasileño", "value": "B" },
                        { "text": "Brasileño Naturalizado", "value": "N" },
                        { "text": "Estranjero", "value": "E" },
                        { "text": "Portugues equiparado", "value": "P" }
                    ]
                },

                "matriz": {
                    "title": "Matriz",
                    "values": [
                        { "text": "No", value: 'N' },
                        { "text": "Si", value: 'S' }
                    ]
                },

                "idpessoa_matriz": { "title": "Código de la Matriz" },

                "idtipo_entidade": { title: 'Tipo de Entidad' },

                "idregiao": { title: 'Región' },

                "observacoes": { "title": "Observaciones" },

                "situacao": { 
                    "title": "Situación",
                    "values": [
                        { "text": "Activo", value: 'A' },
                        { "text": "Inactivo", value: 'I' }
                    ]
                }              
            },

            'en': {
                "newButtonText": 'Add New Farmer',
                
                "title": "Farmers",
                
                "tab": {
                    items: [
                        {text: 'List', content: ''},
                        {text: 'Data', content: ''},
                        {text: 'GLA', content: ''},
                    ]
                },
                
                "idpessoa_empresa": { title: "Company ID" },

                "idpessoa": { title: "Farmer ID" },

                "nm_pessoa": { title: "Farmer Name" },

                "tp_pessoa": { title: 'Farmer Kind', required: 'The <b> FARMER KIND </b> field is required!' },

                "cpf_cnpj": { "title": "CPF/CNPJ" },

                "insc_est_rg": { "title": "State Entry" },

                "inscricao_municipal": { "title": "City Entry" },

                "orgao_expedidor_rg": { "title": "Dispatcher Social ID" },

                "data_expedicao_rg": { "title": "Dispatch Date Social ID" },

                "renasem": { "title": "RENASEM" },

                "nacionalidade": { 
                    "title": "Nationality",
                    "values": [
                        { "text": "Brazilian", "value": "B" },
                        { "text": "Naturalized Brazilian", "value": "N" },
                        { "text": "Foreign", "value": "E" },
                        { "text": "Equated Portuguese", "value": "P" }
                    ]
                },

                "matriz": {
                    "title": "Is a Head Office?",
                    "values": [
                        { "text": "Yes", value: 'S' },
                        { "text": "No", value: 'N' }
                    ]
                },

                "idpessoa_matriz": { "title": "Head Office ID" },

                "idtipo_entidade": { title: 'Entity Kind' },

                "idregiao": { title: 'Region' },

                "observacoes": { "title": "Comments" },

                "situacao": { 
                    "title": "State",
                    "values": [
                        { "text": "Active", value: 'A' },
                        { "text": "Inactive", value: 'I' }
                    ]
                }              
            }
        };
        
        app.translators.push({
           name: 'agricultores',
           messages: translator
        });
    });
})(jQuery);