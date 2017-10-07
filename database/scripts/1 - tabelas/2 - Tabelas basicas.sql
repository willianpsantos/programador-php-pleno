use cotton_sementes_dev;

create table estagios_fenologicos
(
    idestagio_fenologico int unsigned not null primary key auto_increment,
    nm_estagio_fenologico varchar(150),
    sigla_estagio_fenologico varchar(10),
    
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

create table categorias_produzir
(
    idcategoria_produzir int unsigned not null primary key auto_increment,
    nm_categoria_produzir varchar(50),
    sigla_categoria_produzir varchar(10),
    
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

create table tipos_pessoa_responsaveis
(
    idtipo_pessoa_responsavel int unsigned not null primary key auto_increment,
    nm_tipo_responsavel varchar(80) not null,    
    observacoes text,
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

create table tipos_entidade
(
    idtipo_entidade int unsigned not null primary key auto_increment,
    nm_tipo_entidade varchar(80) not null,
    tp_pessoa enum('F', 'J', 'A') default 'J' comment 'F - Pessoa Física, J - Pessoa Juridica, A - Ambos',
    movimentacao enum('S', 'N') default 'N',
    
    observacoes text,
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

create table tipos_embalagem
(
    idtipo_embalagem int unsigned not null primary key auto_increment,
    nm_tipo_embalagem varchar(80) not null,
    sigla_tipo_embalagem varchar(10),
    capacidade_maxima numeric(18,3),
    
    observacoes text,
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

create table cidades
(
    idcidade int unsigned not null primary key auto_increment,
    nm_cidade varchar(150) not null,
    uf char(2) not null,
    codigo_ibge varchar(30),
    latitude varchar(80),
    longitude varchar(80),
   
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
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);

create table regioes
(   
   idregiao int unsigned not null primary key auto_increment,
   nm_regiao varchar(80) not null,
   sigla_regiao varchar(20),
   observacoes text,   
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
   foreign key (idusuario_reativacao) references usuarios(idusuario)   
);

create table regiao_estados
(
    idregiao_estado int unsigned not null primary key auto_increment,
    idregiao int unsigned not null ,
    uf char(2) not null,
    observacoes text,   
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
        
    foreign key (idregiao) references regioes(idregiao),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)    
);

create table documentos
(
    iddocumento int unsigned not null primary key auto_increment,
    nm_documento varchar(150),    
    content_type varchar(50),
    extensao varchar(5),
    nm_arquivo varchar(150),
    observacoes text,
    arquivo longblob,    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
        
    foreign key (idtipo_documento) references tipos_documento(idtipo_documento),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table culturas
(
    idcultura int unsigned not null primary key auto_increment,
    nm_cultura varchar(80) not null,    
    observacoes text,
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

create table pessoas
(
    idpessoa_empresa int unsigned,
    idpessoa int unsigned not null primary key auto_increment,
    nm_pessoa varchar(150) not null,
    razao_social varchar(150),
    tp_pessoa enum('F', 'J') default 'F' comment 'F - pessoa fisica, J - pessoa juridica',
   
    cpf_cnpj varchar(25),
    insc_est_rg varchar(25),
    inscricao_municipal varchar(25),
    orgao_expedidor_rg varchar(25),
    data_expedicao_rg date,   
    renasem varchar(50),
    nacionalidade enum('B', 'N', 'E', 'P') default 'B' comment 'B - Brasileiro, N - Brasileiro Naturalizado, E - Estangeiro, P - Português equiparado', 
    nr_matricula varchar(50),
   
    matriz char(1) default 'N' ,
    idpessoa_matriz int unsigned,
    idtipo_entidade int unsigned,   
    idregiao int unsigned,
    observacoes text,
    
    aprovado enum('P', 'E', 'S', 'N') default 'P' comment 'P - Pendente, S - Aprovado, N - Negado, E - Enviado para aprovação', 
    idnegativa_cadastro int unsigned,
    motivo_reprovacao text,
    iddocumento_contrato int unsigned,
    idpessoa_empresa_cadastro int unsigned comment 'Campo utilizado no cadastro de distribuidores onde se armazena o código da empresa que o cadastrou',
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    idusuario_aprovacao int unsigned,
    dt_aprovacao datetime,
    idusuario_reprovacao int unsigned,
    dt_reprovacao datetime,
    
    idusuario_envio_aprovacao int unsigned,
    dt_envio_aprovacao datetime,
       
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idtipo_entidade) references tipos_entidade(idtipo_entidade),
    foreign key (idregiao) references regioes(idregiao),
    foreign key (idpessoa_matriz) references pessoas(idpessoa),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario),
    foreign key (iddocumento_contrato) references documentos(iddocumento),
    foreign key (idpessoa_empresa_cadastro) references pessoas(idpessoa)
);

create table usuario_pessoas
(
    idusuario_pessoa int unsigned not null primary key auto_increment,
    idusuario int unsigned not null,
    idpessoa int unsigned not null,
    
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
    foreign key (idpessoa) references pessoas(idpessoa),    
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario) 
);

create table pessoa_enderecos
(
    idpessoa_endereco int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    endereco varchar(150),
    numero varchar(20),
    bairro varchar(100),
    cep varchar(10),
    idcidade int unsigned,
    complemento varchar(150),
    tp_endereco enum('R', 'C', 'B') default 'R' comment 'R - Residencial, C - Comercial, B - Cobrança ',
    latitude varchar(80),
    longitude varchar(80),  
   
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
   
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
       
    foreign key (idpessoa) references pessoas(idpessoa),
	foreign key (idcidade) references cidades(idcidade),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);

create table pessoa_telefones
(
    idpessoa_telefone int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    codigo_pais char(3) default '55',
    ddd char(3),
    telefone varchar(20),
    tp_telefone enum('F', 'C', 'X', 'R') default 'R' comment 'F - Fixo, C - Celular, X - Fax, R - Recado ',
    principal enum('N', 'S') default 'N' comment 'S - Sim, N - Não',    
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table pessoa_emails
(
    idpessoa_email int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    email varchar(255),    
    principal enum('S', 'N') default 'N' comment 'S - Sim, N - Não',    
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table pessoa_responsaveis
(
    idpessoa_responsavel int unsigned not null primary key auto_increment,
    idpessoa_matriz int unsigned not null,
    nm_responsavel varchar(150) not null,
    telefone varchar(20) not null,
    email varchar(100),
    cpf varchar(15),
    rg varchar(50),
    orgao_expedidor_rg varchar(50),
    dt_expedicao_rg date,
    endereco varchar(150),
    idcidade int unsigned,
    idtipo_pessoa_responsavel int unsigned not null,    
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_matriz) references pessoas(idpessoa),
    foreign key (idcidade) references cidades(idcidade),
    foreign key (idtipo_pessoa_responsavel) references tipos_pessoa_responsaveis(idtipo_pessoa_responsavel),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table safras
(
    idpessoa_empresa int unsigned not null,
    idsafra int unsigned not null primary key auto_increment,
    nm_safra varchar(80),
    dt_inicio_plantio datetime,
    dt_fim_plantio datetime,
   
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
       
	foreign key (idpessoa_empresa) references pessoas(idpessoa_empresa),
    foreign key (idregiao) references regioes(idregiao),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);

create table negativas_cadastro
(
	idpessoa_empresa int unsigned not null,
    idnegativa_cadastro int unsigned not null primary key auto_increment,
    nm_negativa_cadastro varchar(150),
    descricao text,    
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
    	
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idtexto) references textos(idtexto)
);

create table pessoa_contratos
(
    idpessoa_contrato int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    idsafra int unsigned,
    iddocumento int unsigned,    
    aprovado ENUM('P', 'E', 'C', 'S', 'N', 'I') default 'P' comment 'P - Pendente de Documeto,E - Pendente de aprovação,C - Pendente de Correção,S - Aprovado,N - Reprovado,I - Inativo',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
       
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,   
    idnegativa_cadastro int unsigned, 
    
    motivo_reprovacao text,
    observacoes text,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    idusuario_envio_aprovacao int unsigned,
    dt_envio_aprovacao datetime,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idsafra) references safras(idsafra),
    foreign key (iddocumento) references documentos(iddocumento),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (idusuario_aprovacao) references usuarios(idusuario),
    foreign key (idusuario_reprovacao) references usuarios(idusuario),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario)
);

create table pessoa_gla
(
    idpessoa_gla int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    idsafra int unsigned,
    idbiotecnologia int unsigned,
    iddocumento int unsigned,    
    aprovado ENUM('P', 'E', 'C', 'S', 'N', 'I') default 'P' comment 'P - Pendente de Documeto,E - Pendente de aprovação,C - Pendente de Correção,S - Aprovado,N - Reprovado,I - Inativo',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
       
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,   
    idnegativa_cadastro int unsigned, 
    
    motivo_reprovacao text,
    observacoes text,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    idusuario_envio_aprovacao int unsigned,
    dt_envio_aprovacao datetime,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idsafra) references safras(idsafra),    
    foreign key (iddocumento) references documentos(iddocumento),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (idusuario_aprovacao) references usuarios(idusuario),
    foreign key (idusuario_reprovacao) references usuarios(idusuario),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario)
);

create table pessoa_aditivos
(
    idpessoa_aditivo int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    idsafra int unsigned,
    idpessoa_contrato int unsigned,
    iddocumento int unsigned,    
    aprovado ENUM('P', 'E', 'C', 'S', 'N', 'I') default 'P' comment 'P - Pendente de Documeto,E - Pendente de aprovação,C - Pendente de Correção,S - Aprovado,N - Reprovado,I - Inativo',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
       
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,   
    idnegativa_cadastro int unsigned, 
    
    motivo_reprovacao text,
    observacoes text,
    
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    idusuario_envio_aprovacao int unsigned,
    dt_envio_aprovacao datetime,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idsafra) references safras(idsafra),    
    foreign key (iddocumento) references documentos(iddocumento),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (idusuario_aprovacao) references usuarios(idusuario),
    foreign key (idusuario_reprovacao) references usuarios(idusuario),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario)
);

create table parametros
(   
   idparametro int unsigned not null primary key auto_increment,
   chave varchar(150),
   valor varchar(150),   
   situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
   dt_cadastro datetime default current_timestamp,
   idusuario_cadastro int unsigned,
   dt_alteracao datetime,
   idusuario_alteracao int unsigned,
   dt_inativacao datetime,
   idusuario_inativacao int unsigned,
   dt_reativacao datetime,
   idusuario_reativacao int unsigned,   
   
   foreign key (idpessoa_empresa) references pessoas(idpessoa),
   foreign key (idusuario_cadastro) references usuarios(idusuario),
   foreign key (idusuario_alteracao) references usuarios(idusuario),
   foreign key (idusuario_inativacao) references usuarios(idusuario),
   foreign key (idusuario_reativacao) references usuarios(idusuario)
);


create table fazendas
(
    idpessoa_empresa int unsigned not null,
    idfazenda int unsigned not null primary key auto_increment,   
    idpessoa_proprietario int unsigned not null,
    idregiao int unsigned not null,
    nm_fazenda varchar(150),
    nr_matricula varchar(150),
   
    endereco varchar(150),
    numero varchar(20),
    bairro varchar(100),
    cep varchar(10),
    idcidade int unsigned,
    complemento varchar(150),    
    latitude varchar(50),
    longitude varchar(50),   
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
   
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idpessoa_proprietario) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);

create table biotecnologias
(
    idbiotecnologia int unsigned not null primary key auto_increment,
    nm_biotecnologia varchar(100) not null,
    idpessoa_obtentor int unsigned not null,
    idcultura int unsigned not null,
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',    
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
        
    foreign key (idpessoa_obtentor) references pessoas(idpessoa),
    foreign key (idcultura) references culturas(idcultura),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table germoplasmas
(
    idgermoplasma int unsigned not null primary key auto_increment,
    nm_germoplasma varchar(100) not null,
    idpessoa_obtentor int unsigned not null,
    idcultura int unsigned not null,
    
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_obtentor) references pessoas(idpessoa),
    foreign key (idcultura) references culturas(idcultura),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)        
);

create table cultivares
(    
    idcultivar int unsigned not null primary key auto_increment,
    nm_cultivar varchar(80) not null,
    idcultura int unsigned not null,
    idbiotecnologia int unsigned not null,
    idgermoplasma int unsigned not null,   
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
       
    foreign key (idcultura) references culturas(idcultura),
    foreign key (idbiotecnologia) references biotecnologias(idbiotecnologia),
    foreign key (idgermoplasma) references germoplasmas(idgermoplasma),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);

create table pms
(	
    idpms int unsigned not null primary key auto_increment,
    pms_inicial numeric(18,3) not null,
    pms_final numeric(18,3) not null,
    
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
    foreign key (idusuario_reativacao) references usuarios(idusuario)   
);

create table ptax
(	
    idptax int unsigned not null primary key auto_increment,
	mes tinyint not null,
    ano smallint not null,
    valor numeric(18,3) not null,
    
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
    foreign key (idusuario_reativacao) references usuarios(idusuario) 
);

create table grupos_economicos
(
    idgrupo_economico int unsigned not null primary key auto_increment,
    idpessoa_multiplicador int unsigned not null,
    nm_grupo_economico varchar(150) not null,
    tp_pessoa enum('F', 'J') default 'F' comment 'F - Pessoa Física, J - Pessoa Jurídica',
    email varchar(150),    
    cpf_cnpj varchar(30),
    telefone varchar(30),
    endereco varchar(150),
    numero varchar(20),
    bairro varchar(100),
    cep varchar(10),
    idcidade int unsigned,
    complemento varchar(150),    
    latitude varchar(50),
    longitude varchar(50),   
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
   
    foreign key (idpessoa_multiplicador) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
    
);

create table vendedores
(
    idvendedor int unsigned not null primary key auto_increment,
    idpessoa_empresa int unsigned not null,
	nm_vendedor varchar(150) not null,
	cpf varchar(15),
    email varchar(150),
    telefone varchar(30),
    
    observacoes text,
    situacao enum('A', 'I') default 'A' comment 'A - Ativo, I - Inativo',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
   
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)       
);