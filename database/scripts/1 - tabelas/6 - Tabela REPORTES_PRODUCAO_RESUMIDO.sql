create table reportes_producao_resumido
(
    idreporte_producao_resumido int unsigned not null primary key auto_increment,
    idpessoa_empresa int unsigned not null,
    idcultivar int unsigned not null,
    fase int default 1,
    area numeric(18,3) not null,
    volume_produzido numeric(18,3),
    
    aprovado ENUM('P', 'E', 'A', 'V', 'S', 'N') default 'P' comment 'P - Pendente de aprovação,  E - Enviado para aprovação de AI, A - Aguardando volume produzido, V - Enviado para aprovação de volume produzido, S - Aprovado, N - Reprovado',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
   
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,
    idnegativa_cadastro int unsigned, 
    
    motivo_reprovacao text,
    observacoes text,
    
    situacao enum('A', 'I') default 'A',
    
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    idusuario_envio_aprovacao int unsigned,
    dt_envio_aprovacao datetime
);