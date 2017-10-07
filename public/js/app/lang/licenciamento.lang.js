(function($){
    require(['app'], function(app) {
        var translator = {
            'pt' : {
                "iddocumento" : 'Documento',
                
                "cooperadoTitle": "Licenciamento de GLAs de Cooperados",                

                "agricultorTitle": "Licenciamento de GLAs de Agricultores", 

                "cooperadoOperacaoTitle": "Aprovação de GLAs de Cooperados",

                "agricultorOperacaoTitle": "Aprovação de GLAs de Agricultores", 

                "distribuidorTitle": "Consulta e Alteração de Contratos de Distribuidores",                

                "multiplicadorTitle": "Consulta e Alteração de Contratos de Multiplicador",                

                "approveTitle": 'Aprovação de GLA',

                "approveMessage": "GLA aprovado com sucesso!",

                "approveError": "Houve um problema ao tentar APROVAR A GLA!",

                "situacao" : { title: "Situação" },
                
                "idpessoa_empresa": { title: "Codigo da empresa" },

                "idpessoa": { title: "Código" },

                "nm_pessoa": { title: "Nome" },

                "nm_biotecnologia": { title: 'Biotecnologia' },

                "tp_pessoa": { title: 'Tipo', required: 'O campo <b> TIPO </b> é obrigatório!' },
                
                "nm_tipo_entidade": { title: "Tipo Entidade" },
                "nm_pessoa": { title: "Nome" },
                "uf": { title: "UF" },
                "nm_cidade": { title: "Municipio" },
                "aprovado": { title: "Status" },
                "situacao": { title: "Situação" },
                "iddocumento": { title: "Documento" },

                "P" : {title: "Pendente de Documeto"},
                "E" : {title: "Pendente de aprovação"},
                "C" : {title: "Pendente de Correção"},
                "S" : {title: "Aprovado"},
                "N" : {title: "Reprovado"},
                "I" : {title: "Inativo"},
                
                "sendToApproval" : { title: "Enviar Para Aprovação" }
            }, 

            'es': {
                "iddocumento" : 'Documento',
                
                "title": "Licenciamento de GLAs de Agricultores",    

                "cooperadoTitle": "Licenciamento de GLAs de Agricultores",                

                "agricultorTitle": "Licenciamento de GLAs de Agricultores", 

                "approveTitle": 'Aprovação de GLA',

                "approveMessage": "GLA aprovado com sucesso!",            

                "distribuidorTitle": "Consulta e Alteração de Contratos de Distribuidores",                

                "multiplicadorTitle": "Consulta e Alteração de Contratos de Multiplicador",                

                "cooperadoOperacaoTitle": "Aprovação de GLAs de Cooperados",

                "agricultorOperacaoTitle": "Aprovação de GLAs de Agricultores", 

                "situacao" : { title: "Situação" },
                
                "idpessoa_empresa": { title: "Codigo da empresa" },

                "idpessoa": { title: "Código" },

                "nm_pessoa": { title: "Nome" },

                "nm_biotecnologia": { title: 'Biotecnologia' },

                "tp_pessoa": { title: 'Tipo', required: 'O campo <b> TIPO </b> é obrigatório!' },
                
                "nm_tipo_entidade": { title: "Tipo Entidade" },
                "nm_pessoa": { title: "Nome" },
                "uf": { title: "UF" },
                "nm_cidade": { title: "Municipio" },
                "aprovado": { title: "Status" },
                "situacao": { title: "Situação" },
                "iddocumento": { title: "Documento" },

                "P" : {title: "Pendente de Documeto"},
                "E" : {title: "Pendente de aprovação"},
                "C" : {title: "Pendente de Correção"},
                "S" : {title: "Aprovado"},
                "N" : {title: "Reprovado"},
                "I" : {title: "Inativo"},
                
                "sendToApproval" : { title: "Enviar Para Aprovação" }          
            },

            'en': {
                "iddocumento" : 'Documento',
                
                "title": "Licenciamento de GLAs de Agricultores", 

                "cooperadoTitle": "Licenciamento de GLAs de Agricultores",                

                "agricultorTitle": "Licenciamento de GLAs de Agricultores", 

                "distribuidorTitle": "Consulta e Alteração de Contratos de Distribuidores",                

                "multiplicadorTitle": "Consulta e Alteração de Contratos de Multiplicador", 

                "cooperadoOperacaoTitle": "Aprovação de GLAs de Cooperados",

                "agricultorOperacaoTitle": "Aprovação de GLAs de Agricultores",                

                "approveTitle": 'Aprovação de GLA',

                "approveMessage": "GLA aprovado com sucesso!",               

                "situacao" : { title: "Situação" },
                
                "idpessoa_empresa": { title: "Codigo da empresa" },

                "idpessoa": { title: "Código" },

                "nm_pessoa": { title: "Nome" },

                "nm_biotecnologia": { title: 'Biotecnologia' },

                "tp_pessoa": { title: 'Tipo', required: 'O campo <b> TIPO </b> é obrigatório!' },
                
                "nm_tipo_entidade": { title: "Tipo Entidade" },
                "nm_pessoa": { title: "Nome" },
                "uf": { title: "UF" },
                "nm_cidade": { title: "Municipio" },
                "aprovado": { title: "Status" },
                "situacao": { title: "Situação" },
                "iddocumento": { title: "Documento" },

                "P" : {title: "Pendente de Documeto"},
                "E" : {title: "Pendente de aprovação"},
                "C" : {title: "Pendente de Correção"},
                "S" : {title: "Aprovado"},
                "N" : {title: "Reprovado"},
                "I" : {title: "Inativo"},
                
                "sendToApproval" : { title: "Enviar Para Aprovação" }            
            }
        };
        
        app.translators.push({
           name: 'licenciamento',
           messages: translator
        });
    });
})(jQuery);