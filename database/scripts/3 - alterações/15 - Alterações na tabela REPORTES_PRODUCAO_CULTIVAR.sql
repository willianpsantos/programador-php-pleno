ALTER TABLE reportes_producao_cultivar
ADD area numeric(18,3),
ADD aprovado enum('P', 'E', 'S', 'N') default 'P' comment 'P - Pendente de aprovação, S - Aprovado, N - Reprovado, E - Enviado para aprovação',   
ADD dt_aprovacao datetime,
ADD idusuario_aprovacao int unsigned,
   
ADD dt_reprovacao datetime,
ADD idusuario_reprovacao int unsigned,   
ADD idnegativa_cadastro int unsigned,   

ADD idusuario_envio_aprovacao int unsigned,
ADD dt_envio_aprovacao datetime,

ADD motivo_reprovacao text;

ALTER TABLE reportes_producao_cultivar
ADD CONSTRAINT `fk_reporte_prod_usu_aprov`
foreign key (idusuario_aprovacao) 
references usuarios(idusuario);

ALTER TABLE reportes_producao_cultivar
ADD CONSTRAINT `fk_reporte_prod_usu_env_aprov`
foreign key (idusuario_envio_aprovacao) 
references usuarios(idusuario);
    
ALTER TABLE reportes_producao_cultivar
ADD CONSTRAINT `fk_reporte_prod_usu_reprov`
foreign key (idusuario_reprovacao) 
references usuarios(idusuario);

ALTER TABLE reportes_producao_cultivar
ADD CONSTRAINT `fk_reporte_prod_neg_cad`
foreign key (idnegativa_cadastro) 
references negativas_cadastro(idnegativa_cadastro);