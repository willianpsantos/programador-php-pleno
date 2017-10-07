create table textos
(
    idtexto int unsigned not null primary key auto_increment,
    nm_texto varchar(255) not null,
    idusuario_cadastro int unsigned,
    dt_cadastro datetime default current_timestamp,
    
    foreign key (idusuario_cadastro) references usuarios(idusuario_cadastro)
);

create table idiomas
(    
    sigla char(5) not null primary key unique,
    idtexto int unsigned,
    nm_idioma varchar(150),
    icon_flag_css varchar(50),
    
    foreign key (idtexto) references textos(idtexto)
);

create table texto_idiomas
(
    idtexto_idioma int unsigned not null primary key auto_increment,
    idtexto int unsigned not null,
    idioma char(5) default 'pt-BR',
    texto varchar(255) not null,
    idusuario_cadastro int unsigned,
    dt_cadastro datetime default current_timestamp,
    
    foreign key (idtexto) references textos(idtexto),
    foreign key (idusuario_cadastro) references usuarios(idusuario_cadastro),
    unique key (idtexto, idioma)
);


create table usuarios
(
    idusuario int unsigned not null primary key auto_increment,
    nm_usuario varchar(80) not null,
    login varchar(80) not null unique,
    senha text not null,
    email varchar(150) not null,
    remember_token varchar(255),
    administrador enum('S', 'N') default 'N',
    idioma char(5),
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (ididioma) references idiomas(ididioma),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idioma) references idiomas(idioma)
);

create table password_resets
(
    idusuario int unsigned not null,    
    token text,
    dt_cadastro datetime default current_timestamp,
    dt_expiracao datetime,
    
    foreign key (idusuario) references usuarios(idusuario)
);

alter table password_resets
add constraint `pk_password_reset_user`
primary key (idusuario);

create table perfis
(
    idperfil int unsigned not null primary key auto_increment,
    nm_perfil varchar(80) not null,
    administrador enum('S', 'N') default 'N',
    
    idtexto int unsigned,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idtexto) references textos (idtexto)
);

create table usuario_perfis
(
    idusuario_perfil int unsigned not null primary key auto_increment,
    idusuario int unsigned not null,
    idperfil int unsigned not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idperfil) references perfis(idperfil),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)     
);

create table modulos
(
    idmodulo int unsigned not null primary key auto_increment,
    nm_modulo varchar(80) not null,
    identificacao varchar(80) unique,
    cor_padrao varchar(10) default '#d5d5d5',
    icon_css_classe varchar(40),
    link varchar(150) default '#',
    ordem int default 1,
    use_mvvm enum('S', 'N') default 'S',
        
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    idtexto int unsigned,
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idtexto) references textos (idtexto)
);

create table modulo_objetos
(
    idmodulo_objeto int unsigned not null primary key auto_increment,
    nm_modulo_objeto varchar(80) not null,
    tp_modulo_objeto enum('M', 'T', 'C', 'P') comment 'M - Menu, T - Tela, C - Controle, P - Procedimento',   
    icon_css_classe varchar(150),
    situacao char(1) default 'A' check(situacao in ('A', 'I')),
    idtexto int unsigned,
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    use_mvvm enum('S', 'N') default 'S',
    cor_padrao varchar(10) default '#d5d5d5',
   
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idtexto) references textos (idtexto)
);

create table modulo_modulos_objetos
(
	idmodulo_modulo_objeto int unsigned not null primary key auto_increment,
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idmodulo_objeto_pai int unsigned,
    link varchar(150),
    identificacao varchar(150),
    ordem int default 1,    
    situacao char(1) default 'A' check(situacao in ('A', 'I')),
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
   
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idmodulo_objeto_pai) references modulo_objetos(idmodulo_objeto),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

create table permissao_usuario_modulos
(
    idpermissao_modulo int unsigned not null primary key auto_increment,
    idusuario int unsigned not null,
    idmodulo int unsigned not null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
   
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idmodulo) references modulos(idmodulo),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);

create table permissao_usuario_modulo_objetos
(
    idpermissao_modulo_objeto int unsigned not null primary key auto_increment,
    idusuario int unsigned not null,    
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idmodulo_objeto_pai int unsigned null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
   
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idmodulo_objeto_pai) references modulo_objetos(idmodulo_objeto),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);

create table permissao_perfil_modulos
(
    idpermissao_modulo int unsigned not null primary key auto_increment,
    idperfil int unsigned not null,
    idmodulo int unsigned not null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
    
    foreign key (idperfil) references perfis(idperfil),
    foreign key (idmodulo) references modulos(idmodulo),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);

create table permissao_perfil_modulo_objetos
(
    idpermissao_modulo_objeto int unsigned not null primary key auto_increment,
    idperfil int unsigned not null,
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idmodulo_objeto_pai int unsigned null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
    
    foreign key (idperfil) references perfis(idperfil),
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idmodulo_objeto_pai) references modulo_objetos(idmodulo_objeto),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);

create table periodo_acesso_modulos
(
    idperiodo_acesso int unsigned not null primary key auto_increment,
    uf char(2),
    idmodulo int unsigned not null,
    aplicar_para enum('P', 'U') default 'P' comment 'P - Perfil, U - Usuário',
    idperfil int unsigned null,
    idusuario int unsigned null,
    dt_inicio date not null,
    dt_fim date not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idperfil) references perfis(idperfil),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)     
);

create table periodo_acesso_modulo_objetos
(
    idperiodo_acesso int unsigned not null primary key auto_increment,
    uf char(2),
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idmodulo_objeto_pai int unsigned null,
    aplicar_para enum('P', 'U') default 'P' comment 'P - Perfil, U - Usuário',    
    idperfil int unsigned null,
    idusuario int unsigned null,
    
    dt_inicio date not null,
    dt_fim date not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idmodulo_objeto_pai) references modulo_objetos(idmodulo_objeto),
    foreign key (idperfil) references perfis(idperfil),
    foreign key (idusuario) references usuarios(idusuario),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)     
);

create table operacoes
(
    idoperacao int unsigned not null primary key auto_increment,
    nm_operacao varchar(80) not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    idtexto int unsigned,
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idtexto) references textos(idtexto)
);

create table modulo_objeto_operacoes
(
    idmodulo_objeto_operacao int unsigned not null primary key auto_increment,
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idoperacao int unsigned not null,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idoperacao) references operacoes(idoperacao),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)     
);

create table permissao_perfil_mod_obj_operacoes
(
    idpermissao_perfil_mod_obj_operacoes int unsigned not null primary key auto_increment,
    idperfil int unsigned not null,
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idoperacao int unsigned not null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
   
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idperfil) references perfis(idperfil),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);

create table permissao_usu_mod_obj_operacoes
(
    idpermissao_usu_mod_obj_operacoes int unsigned not null primary key auto_increment,
    idusuario int unsigned not null,
    idmodulo int unsigned not null,
    idmodulo_objeto int unsigned not null,
    idoperacao int unsigned not null,
   
    permitido enum('S', 'N') default 'N',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_negado datetime,
    idusuario_negado int unsigned,
    dt_permitido datetime,
    idusuario_permitido int unsigned,
   
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idmodulo) references modulos(idmodulo),
    foreign key (idmodulo_objeto) references modulo_objetos(idmodulo_objeto),
    foreign key (idoperacao) references operacoes(idoperacao),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_negado) references usuarios(idusuario),
    foreign key (idusuario_permitido) references usuarios(idusuario)    
);