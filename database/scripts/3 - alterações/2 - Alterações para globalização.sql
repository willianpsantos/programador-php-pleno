ALTER TABLE usuarios
DROP FOREIGN KEY usuarios_ibfk_1;
ALTER TABLE usuarios
DROP COLUMN ididioma,
DROP INDEX ididioma; 


alter table usuarios
add column idioma char(5);

alter table usuarios
add constraint usuarios_ibfk_1
foreign key (idioma)
references idiomas(sigla); 


alter table perfis
add column idtexto int unsigned; 

alter table perfis
add constraint modulos_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table modulos
add column idtexto int unsigned;

alter table modulos
add constraint modulo_objetos_ibfk_7
foreign key (idtexto)
references textos(idtexto);


alter table modulo_objetos
add column idtexto int unsigned;

alter table modulo_objetos
add constraint modulo_objetos_ibfk_8
foreign key (idtexto)
references textos(idtexto);


alter table operacoes
add column idtexto int unsigned;

alter table operacoes
add constraint operacoes_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table estagios_fenologicos
add column idtexto int unsigned;

alter table estagios_fenologicos
add constraint estagios_fenologicos_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table categorias_produzir
add column idtexto int unsigned;

alter table categorias_produzir
add constraint categorias_produzir_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table tipos_pessoa_responsaveis
add column idtexto int unsigned;

alter table tipos_pessoa_responsaveis
add constraint tipos_pessoa_responsaveis_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table tipos_entidade
add column idtexto int unsigned;

alter table tipos_entidade
add constraint tipos_entidade_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table tipos_embalagem
add column idtexto int unsigned;

alter table tipos_embalagem
add column capacidade_maxima numeric(18,3);

alter table tipos_embalagem
add constraint tipos_embalagem_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table tipos_movimentacao
add column idtexto int unsigned;

alter table tipos_movimentacao
add constraint tipos_movimentacao_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table culturas
add column idtexto int unsigned;

alter table culturas
add constraint culturas_ibfk_5
foreign key (idtexto)
references textos(idtexto);


alter table negativas_cadastro
add column idtexto int unsigned;

alter table negativas_cadastro
add constraint negativas_cadastro_ibfk_6
foreign key (idtexto)
references textos(idtexto);