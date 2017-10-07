create table historico_situacao
(
    idusuario int unsigned not null,
    dt_historico datetime default current_timestamp,
    idregistro int unsigned not null,
    tabela varchar(350) not null,
    situacao_anterior enum('A', 'I'),
    situacao_atual enum('A', 'I'),
    
    foreign key (idusuario) references usuarios(idusuario) /*,
    primary key (idusuario, dt_historico) */
);

create table historico_aprovacao
(
    idusuario int unsigned not null,
    dt_historico datetime default current_timestamp,
    idregistro int unsigned not null,
    tabela varchar(350) not null,
    situacao_anterior char(1),
    situacao_atual char(1),
    idnegativa_cadastro int unsigned,
    tp_documento enum('C', 'G', 'A') comment 'C - Contrato, G - GLA, A - Aditivo',
    observacoes text,
    
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro) /*,
    primary key (idusuario, dt_historico) */
);

create table historico
(
	idusuario int unsigned not null,
    dt_historico datetime default current_timestamp,
    model varchar(350),
    tabela varchar(350),
    controller varchar(350),
    action varchar(350),
    operacao enum('INSERT', 'UPDATE', 'DELETE'),
    valores_anteriores text,
    valores_atuais text,
    
    foreign key (idusuario) references usuarios(idusuario) /*,
    primary key (idusuario, dt_historico) */
);

create table logs
(
    dt_log datetime default current_timestamp,
    idusuario int unsigned not null,
    idpessoa_empresa int unsigned,
    classe varchar(350),
    metodo varchar(350),
    arquivo varchar(350),
    linha int,
    exception varchar(350),
    stack_trace text,
    
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idpessoa_empresa) references pessoas(idpessoa) /*,
    primary key (dt_log, idusuario) */
);