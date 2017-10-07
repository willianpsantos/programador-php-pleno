ALTER TABLE pessoa_gla
ADD idlote_documento int unsigned;

ALTER TABLE pessoa_gla
ADD CONSTRAINT `fk_pessoa_gla_lote_documento`
FOREIGN key (idlote_documento)
references lotes_documentos(idlote_documento);