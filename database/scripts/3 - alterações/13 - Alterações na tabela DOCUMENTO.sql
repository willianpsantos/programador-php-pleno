create table lotes_documentos
(
    idlote_documento int unsigned not null primary key auto_increment,
    idusuario_cadastro int unsigned,
    dt_cadastro datetime default current_timestamp,
    qtde_arquivos int
);

alter table documentos
add idlote_documento int unsigned;

alter table documentos
add constraint `fk_documento_lote`
foreign key (idlote_documento)
references lotes_documentos(idlote_documento);