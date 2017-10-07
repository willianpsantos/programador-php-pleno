use cotton_sementes;

ALTER TABLE `ams` DROP FOREIGN KEY `ams_ibfk_2`;
ALTER TABLE `ams` DROP FOREIGN KEY `ams_ibfk_3`;
ALTER TABLE `ams` DROP FOREIGN KEY `ams_ibfk_4`;
ALTER TABLE `ams` DROP FOREIGN KEY `ams_ibfk_7`;
ALTER TABLE `ams` DROP FOREIGN KEY `ams_ibfk_8`;
ALTER TABLE `ams` 
DROP COLUMN `idpessoa_multiplicador`,
DROP COLUMN `idcultivar`,
DROP COLUMN `idsafra`,
DROP COLUMN `idnegativa_cadastro`,
DROP COLUMN `iddocumento_contrato`;

DROP TABLE `ams_areas_inscritas`;

ALTER TABLE `areas_inscritas` DROP FOREIGN KEY `areas_inscritas_ibfk_3`;
ALTER TABLE `areas_inscritas` 
DROP COLUMN `idsafra`,
CHANGE COLUMN `idpessoa` `idpessoa_proprietario`  int(10) UNSIGNED NOT NULL AFTER `idarea_inscrita`;

ALTER TABLE `areas_inscritas`
DROP COLUMN `idams`,
ADD COLUMN `idams`  int(10) UNSIGNED NOT NULL AFTER `idarea_inscrita`,
ADD INDEX `idams` (`idams`) USING BTREE;

ALTER TABLE `areas_inscritas` DROP FOREIGN KEY `areas_inscritas_ibfk_9`;

ALTER TABLE `areas_inscritas`
DROP COLUMN `idnegativa_cadastro`;

ALTER TABLE `areas_inscritas`
MODIFY COLUMN `identificacao`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `idcultivar`,
MODIFY COLUMN `dt_plantio`  date NOT NULL AFTER `identificacao`,
MODIFY COLUMN `qtd_sementes_usadas`  decimal(18,3) NOT NULL AFTER `area`,
MODIFY COLUMN `idcategoria_produzir`  int(10) UNSIGNED NOT NULL AFTER `producao_estimada`,
MODIFY COLUMN `situacao`  enum('A','I') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'A' AFTER `observacao`,
ADD COLUMN `nm_propriedade`  varchar(150) NOT NULL AFTER `idpessoa_proprietario`,
ADD COLUMN `idcidade`  int UNSIGNED NOT NULL AFTER `producao_estimada`,
ADD COLUMN `latitude`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `idcidade`,
ADD COLUMN `longitude`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL AFTER `latitude`,
ADD COLUMN `endereco`  varchar(150) NOT NULL AFTER `longitude`;

ALTER TABLE `areas_inscritas`
ADD COLUMN `tp_area`  enum('P','C') NULL AFTER `situacao`;

ALTER TABLE `ams`
MODIFY COLUMN `aprovado`  enum('P','E','S','N','C','I') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'P' COMMENT '\'P - Pendente de Documeto,E - Pendente de aprovação,C - Pendente de Correção,S - Aprovado,N - Reprovado,I - Inativo\'' AFTER `idams`,
ADD COLUMN `idnegativa_cadastro`  int(10) UNSIGNED NULL AFTER `idusuario_reprovacao`;

ALTER TABLE `ams` ADD CONSTRAINT `ams_ibfk_14` FOREIGN KEY (`idnegativa_cadastro`) REFERENCES `negativas_cadastro` (`idnegativa_cadastro`);

ALTER TABLE `ams`
ADD COLUMN `idgermoplasma`  int(10) UNSIGNED NULL AFTER `idams`,
ADD INDEX `idgermoplasma` (`idgermoplasma`) USING BTREE ;

ALTER TABLE `ams` ADD CONSTRAINT `ams_ibfk_idgermoplasma` FOREIGN KEY (`idgermoplasma`) REFERENCES `germoplasmas` (`idgermoplasma`);

ALTER TABLE `areas_inscritas`
MODIFY COLUMN `endereco`  varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL AFTER `longitude`;

ALTER TABLE `ams`
ADD COLUMN `idobtentor`  int(10) UNSIGNED NULL DEFAULT NULL AFTER `idgermoplasma`,
ADD INDEX `idobtentor` (`idobtentor`) USING BTREE ;

ALTER TABLE `ams` ADD CONSTRAINT `ams_ibfk_idobtentor` FOREIGN KEY (`idobtentor`) REFERENCES `pessoas` (`idpessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `areas_inscritas`
MODIFY COLUMN `nm_propriedade`  varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `idpessoa_proprietario`,
MODIFY COLUMN `identificacao`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `idcultivar`,
MODIFY COLUMN `dt_plantio`  date NULL DEFAULT NULL AFTER `identificacao`,
MODIFY COLUMN `latitude`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `idcidade`,
MODIFY COLUMN `longitude`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `latitude`,
MODIFY COLUMN `endereco`  varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `longitude`;

ALTER table areas_inscritas
ADD idcategoria_plantada int unsigned;

ALTER table areas_inscritas
ADD constraint `fk_area_inscr_cat_plantada`
foreign key (idcategoria_plantada)
references categorias_produzir(idcategoria_produzir);

ALTER TABLE `areas_inscritas`
ADD COLUMN `idsafra`  int(10) UNSIGNED NULL AFTER `endereco`,
ADD INDEX `idsafra` (`idsafra`) USING BTREE ;

ALTER TABLE `areas_inscritas` ADD CONSTRAINT `areas_inscritas_ibfk_11` FOREIGN KEY (`idsafra`) REFERENCES `safras` (`idsafra`) ON DELETE RESTRICT ON UPDATE RESTRICT;


ALTER TABLE `ams`
ADD COLUMN `iddocumento`  int(10) UNSIGNED NULL DEFAULT NULL AFTER `situacao`,
ADD INDEX `iddocumento` (`iddocumento`) USING BTREE ;

ALTER TABLE `ams` ADD CONSTRAINT `ams_ibfk_12` FOREIGN KEY (`iddocumento`) REFERENCES `documentos` (`iddocumento`) ON DELETE RESTRICT ON UPDATE RESTRICT;

