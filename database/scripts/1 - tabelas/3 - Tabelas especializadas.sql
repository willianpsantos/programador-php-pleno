use cotton_sementes;

create table ams
(
	idpessoa_empresa int unsigned not null,
    idams int unsigned not null primary key auto_increment,
    idpessoa_multiplicador int unsigned not null,
    idcultivar int unsigned not null,
	idsafra int unsigned not null,
    
    aprovado enum('P', 'E', 'S', 'N') default 'P' comment 'P - Pendente de aprovação, S - Aprovado, N - Reprovado, E - Enviado para aprovação',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
   
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,   
    idnegativa_cadastro int unsigned,   
    iddocumento_contrato int unsigned,
    
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
    dt_envio_aprovacao datetime,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idpessoa_multiplicador) references pessoas(idpessoa),
    foreign key (idcultivar) references cultivares(idcultivar),
    foreign key (idsafra) references safras(idsafra),
    foreign key (idusuario_aprovacao) references usuarios(idusuario),
    foreign key (idusuario_reprovacao) references usuarios(idusuario),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (iddocumento_contrato) references documentos(iddocumento),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario)
);

create table areas_inscritas
(
	idpessoa_empresa int unsigned not null,
    idarea_inscrita int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,    
    idcultivar int unsigned not null,
    idsafra int unsigned not null,    
    identificacao varchar(50),
    dt_plantio date,
    area numeric(18,3) not null,
    qtd_sementes_usadas numeric(18,3),
    producao_estimada numeric(18,3),
    idcategoria_produzir int unsigned,    
    observacao text,
    
    situacao enum('A', 'I') default 'A',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idcultivar) references cultivares(idcultivar),
    foreign key (idsafra) references safras(idsafra),
    foreign key (idcategoria_produzir) references categorias_produzir(idcategoria_produzir),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

create table ams_areas_inscritas
(
    idams_area_inscrita int unsigned not null primary key auto_increment,
    idarea_inscrita int unsigned not null,    
    observacao text,
    
    situacao enum('A', 'I') default 'A',
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

create table avisos
(
	idpessoa_empresa int unsigned not null,
    idaviso int unsigned not null primary key auto_increment,
    titulo_aviso varchar(150),
    texto_aviso text,
   
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
   
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)   
);

create table avisos_envio
(
	idpessoa_empresa int unsigned not null,
    idaviso_envio int unsigned not null primary key auto_increment,
    idaviso int unsigned not null,
    aplicar_para enum('O', 'M', 'D', 'A', 'T') comment 'O - Obtentor, M - Multiplicador, D - Distribuidor, A - Agricultor, T -Todos',
   
    idsafra int unsigned,
    dt_inicio date,
    dt_fim date,
   
    situacao enum('A', 'I') default 'A',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
   
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idaviso) references avisos(idaviso),
    foreign key (idsafra) references safras(idsafra),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)      
);

create table notas_fiscais
(
	idpessoa_empresa int unsigned not null,
    idnota_fiscal int unsigned not null primary key auto_increment,
    nr_nota varchar(80) not null,
    serie_nf varchar(5),
    dt_emissao date,
    tp_nota enum('0', '1') default '0' comment '0 - Entrada, 1 - Saida',
    
    idpessoa_emissor int unsigned,
    idpessoa_destinatario int unsigned,
    idpessoa_transportadora int unsigned,
    base_calculo_icms numeric(10,2),
    valor_icms numeric(10,2),
    base_calculo_imcs_st numeric(10,2),
    valor_icms_st numeric(10,2),
    valor_total_produtos numeric(10,2),
    valor_frente numeric(10,2),
    valor_seguro numeric(10,2),
    desconto numeric(10,2),
    acrescimo numeric(10,2),
    outras_despesas numeric(10,2),
    valor_ipi numeric(10,2),
    valor_total_nota numeric(10,2),
    inscricao_municipal varchar(30),
    valor_total_servicos numeric(10,2),
    base_calc_issqn numeric(10,2),
    valor_issqn numeric(10,2),
    dados_adicionais text,
    chave_acesso varchar(50),
    iddocumento_xml_nf int unsigned,
    iddocumento_img_nf int unsigned,
    
    situacao enum('A', 'I') default 'A',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa_empresa),
    foreign key (idpessoa_emissor) references pessoas(idpessoa),
    foreign key (idpessoa_destinatario) references pessoas(idpessoa),
    foreign key (idpessoa_transportadora) references pessoas(idpessoa),
	foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)      
);

create table nota_fiscal_itens
(
    idnota_fiscal_item int unsigned not null primary key auto_increment,
    idnota_fiscal int unsigned not null,
    coo_produto varchar(50),
    desc_produto varchar(150),
    ncm varchar(10),
    cst char(3),
    cfop varchar(10),
    unidade varchar(10),
    quantidade numeric(18,4),
    valor_unitario numeric(10,4),
    valor_total numeric(10,2),
    base_calc_icms numeric(10,2),
    valor_icms numeric(10,2),
    valor_ipi numeric(10,2),
    aliquota_ipi numeric(10,2),
    aliquota_icms numeric(10,2),
    
    situacao enum('A', 'I') default 'A',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idnota_fiscal) references notas_fiscais(idnota_fiscal),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

create table reportes_producao_cultivar
(
	idpessoa_empresa int unsigned not null,
    idreporte_producao int unsigned not null primary key auto_increment,
    idarea_inscrita int unsigned,
    idcultivar int unsigned not null,
    area_descartada numeric(18,3),
    qtde_descartada numeric(18,3),
    qtde_algodao_em_caroco numeric(18,3),
    nm_algodoeira varchar(80),
    idcidade int unsigned,
    qtde_entrada_ubs numeric(18,3),
    qtde_outras_destinacoes numeric(18,3),
    qtde_caroco_beneficiado numeric(18,3),
    qtde_caroco_aguardando_benef numeric(18,3),    

    observacoes text,
    observacoes_ubs text,
    observacoes_sementes text,
    
    aprovado enum('P', 'E', 'S', 'N') default 'P' comment 'P - Pendente de aprovação, S - Aprovado, N - Reprovado, E - Enviado para aprovação',
   
    dt_aprovacao datetime,
    idusuario_aprovacao int unsigned,
   
    dt_reprovacao datetime,
    idusuario_reprovacao int unsigned,   
    idnegativa_cadastro int unsigned,   
    iddocumento_contrato int unsigned,
    
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
    dt_envio_aprovacao datetime,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idcultivar) references cultivares(idcultivar),
    foreign key (idcidade) references cidades(idcidade),
    foreign key (idusuario_aprovacao) references usuarios(idusuario),
    foreign key (idusuario_reprovacao) references usuarios(idusuario),
    foreign key (idnegativa_cadastro) references negativas_cadastro(idnegativa_cadastro),
    foreign key (iddocumento_contrato) references documentos(iddocumento),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario),
    foreign key (idusuario_envio_aprovacao) references usuarios(idusuario)
);

create table reportes_producao_area_inscrita
(
	idpessoa_empresa int unsigned not null,
    idreporte_producao int unsigned not null primary key auto_increment,
    idarea_inscrita int unsigned not null,
    qtde_arroba numeric(18,3),
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
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idarea_inscrita) references areas_inscritas(idarea_inscrita),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

create table lotes
(
	idpessoa_empresa int unsigned not null,
    idlote int unsigned not null primary key auto_increment,
    identificacao varchar(50) not null,
    tp_proveniencia enum('P', 'C', 'T', 'M') default 'P' comment 'P - Própria, C - Cooperado, T - Terceiros, M - Mista',
    
    idarea_inscrita int unsigned not null,
    idcultivar int unsigned not null,
    idbiotecnologia int unsigned not null,
    idcategoria_produzir int unsigned not null,
    idtipo_embalagem int unsigned not null,
    idpms int unsigned,
    qtde_pms int(10),
    peso_embalagens numeric(18,3),
    nr_embalagens int,
    peso_total_lote numeric(18,3),
    idremessa_entrada int unsigned,
    qtde_remessas int(10),
    
    situacao enum('A', 'I') default 'A',
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idcultivar) references cultivares(idcultivar),
    foreign key (idbiotecnologia) references biotecnologias(idbiotecnologia),
    foreign key (idcategoria_produzir) references categorias_produzir(idcategoria_produzir),
    foreign key (idtipo_embalagem) references tipos_embalagem(idtipo_embalagem),
    foreign key (idpms) references pms(idpms),
    foreign key (idremessa_entrada) references remessas(idremessas),
    foreign key (idarea_inscrita) references areas_inscritas(idarea_inscrita),    
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

create table tipos_movimentacao
(
    idtipo_movimentacao int unsigned not null primary key auto_increment,
    nm_tipo_movimentacao varchar(80) not null,
    tp_movimentacao enum('E', 'S', 'A') default 'S' comment 'E - Entrada, S - Saida, A- Ambos',
    exige_justificativa enum('S', 'N') default 'N' comment 'S- Sim, N - Não',
    
	situacao char(1) default 'A' check(situacao in ('A', 'I')),
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

create table cfop
(
    idcfop int unsigned not null primary key auto_increment,
    nm_cfop varchar(500) not null,
    codigo_cfop varchar(100) not null,
    
    situacao char(1) default 'A' check(situacao in ('A', 'I')),
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

create table remessas
(
	idpessoa_empresa int unsigned not null,
    idremessa int unsigned not null primary key auto_increment,
    idpessoa int unsigned not null,
    idlote int unsigned not null,
    tp_movimentacao enum('E', 'S') default 'S' comment 'E - Entrada, S - Saida',
    idtipo_movimentacao int unsigned,
    qtde_remessa numeric(18,3),
    idremessa_origem int unsigned,
    idnota_fiscal int unsigned,
    idcfop int unsigned,
    nota_fiscal numeric(20),
    serie_nf char(3),
    data_emissao_nf date,
    iddata_lancamento INT UNSIGNED,
    dt_vencimento DATE NULL,
    valor_ptax DECIMAL(18,4) NULL,
    valor_saco DECIMAL(18,4) NULL,
    valor_a_pagar DECIMAL(18,4) NULL,    
    justificativa text,
    observacoes text,
    
    situacao char(1) default 'A' check(situacao in ('A', 'I')),
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idpessoa) references pessoas(idpessoa),
    foreign key (idlote) references lotes(idlote),
    foreign key (idcfop) references cfop(idcfop),
    foreign key (idtipo_movimentacao) references tipos_movimentacao(idtipo_movimentacao),
    foreign key (idnota_fiscal) references notas_fiscais(idnota_fiscal),
    foreign key (idremessa_origem) references remessas(idremessa),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);

/*create table movimentacoes
(
	idpessoa_empresa int unsigned not null,
    idmovimentacao int unsigned not null primary key auto_increment,
    idtipo_movimentacao int unsigned not null,
	idremessa int unsigned not null,
    idusuario int unsigned not null,
    qtde_movimentacao numeric(18,3),
    observacoes text,
    
    situacao char(1) default 'A' check(situacao in ('A', 'I')),
    dt_cadastro datetime default current_timestamp,
    idusuario_cadastro int unsigned,
    dt_alteracao datetime,
    idusuario_alteracao int unsigned,
    dt_inativacao datetime,
    idusuario_inativacao int unsigned,
    dt_reativacao datetime,
    idusuario_reativacao int unsigned,
    
    foreign key (idpessoa_empresa) references pessoas(idpessoa),
    foreign key (idtipo_movimentacao) references tipos_movimentacao(idtipo_movimentacao),
	foreign key (idremessa) references remessas(idremessa),
    foreign key (idusuario) references usuarios(idusuario),
    foreign key (idusuario_cadastro) references usuarios(idusuario),
    foreign key (idusuario_alteracao) references usuarios(idusuario),
    foreign key (idusuario_inativacao) references usuarios(idusuario),
    foreign key (idusuario_reativacao) references usuarios(idusuario)
);*/

CREATE TABLE `datas_lancamento` (
  `iddata_lancamento` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idpessoa_multiplicador` int(10) unsigned NOT NULL,
  `dia` tinyint(4) NOT NULL,
  `ano` smallint(6) NOT NULL,
  `valor` decimal(18,3) NOT NULL,
  `situacao` enum('A','I') DEFAULT 'A' COMMENT 'A - Ativo, I - Inativo',
  `dt_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `idusuario_cadastro` int(10) unsigned DEFAULT NULL,
  `dt_alteracao` datetime DEFAULT NULL,
  `idusuario_alteracao` int(10) unsigned DEFAULT NULL,
  `dt_inativacao` datetime DEFAULT NULL,
  `idusuario_inativacao` int(10) unsigned DEFAULT NULL,
  `dt_reativacao` datetime DEFAULT NULL,
  `idusuario_reativacao` int(10) unsigned DEFAULT NULL,
  
  PRIMARY KEY (`iddata_lancamento`),
  KEY `idpessoa_multiplicador` (`idpessoa_multiplicador`),
  KEY `idusuario_cadastro` (`idusuario_cadastro`),
  KEY `idusuario_alteracao` (`idusuario_alteracao`),
  KEY `idusuario_inativacao` (`idusuario_inativacao`),
  KEY `idusuario_reativacao` (`idusuario_reativacao`),
  CONSTRAINT `data_lancamento_ibfk_1` FOREIGN KEY (`idpessoa_multiplicador`) REFERENCES `pessoas` (`idpessoa`),
  CONSTRAINT `data_lancamento_ibfk_2` FOREIGN KEY (`idusuario_cadastro`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `data_lancamento_ibfk_3` FOREIGN KEY (`idusuario_alteracao`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `data_lancamento_ibfk_4` FOREIGN KEY (`idusuario_inativacao`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `data_lancamento_ibfk_5` FOREIGN KEY (`idusuario_reativacao`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;