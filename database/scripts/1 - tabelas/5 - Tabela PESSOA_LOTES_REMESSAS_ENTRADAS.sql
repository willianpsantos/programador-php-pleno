create table pessoa_lotes_remessas_entradas
(
    idpessoa_lote_remessa_entrada int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    idlote int unsigned not null,
    idremessa int unsigned not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',    
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idusuario_cadastro)   references usuarios(idusuario),
    foreign key (idusuario_alteracao)  references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idpessoa) 			   references pessoas(idpessoa),
    foreign key (idlote) 			   references lotes(idlote),
    foreign key (idremessa) 		   references remessas(idremessa)
);