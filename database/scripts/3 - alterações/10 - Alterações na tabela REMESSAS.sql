ALTER TABLE `remessas` 
DROP FOREIGN KEY `remessas_ibfk_8`;

ALTER TABLE `remessas` 
CHANGE COLUMN `nota_fiscal` `nota_fiscal` DECIMAL(20,0) NULL DEFAULT NULL AFTER `idnota_fiscal`,
CHANGE COLUMN `serie_nf` `serie_nf` CHAR(3) NULL DEFAULT NULL AFTER `nota_fiscal`,
CHANGE COLUMN `data_emissao_nf` `data_emissao_nf` DATE NULL DEFAULT NULL AFTER `serie_nf`,
CHANGE COLUMN `idcfop` `idcfop` INT(10) UNSIGNED NULL DEFAULT NULL AFTER `data_emissao_nf`,
CHANGE COLUMN `idtipo_movimentacao` `idtipo_movimentacao` INT(10) unsigned null,
CHANGE COLUMN `qtde_remessa` `qtde_remessa` DECIMAL(18,4) NULL DEFAULT NULL ,

ADD COLUMN `iddata_lancamento` INT UNSIGNED NULL AFTER `idcfop`,
ADD COLUMN `dt_vencimento` DATE NULL AFTER `iddata_lancamento`,
ADD COLUMN `valor_ptax` DECIMAL(18,4) NULL AFTER `dt_vencimento`,
ADD COLUMN `valor_saco` DECIMAL(18,4) NULL AFTER `valor_ptax`,
ADD COLUMN `valor_a_pagar` DECIMAL(18,4) NULL AFTER `valor_saco`,
ADD INDEX `remessas_ibfk_10_idx` (`iddata_lancamento` ASC);

ALTER TABLE `remessas` 
ADD CONSTRAINT `remessas_ibfk_8`
  FOREIGN KEY (`idtipo_movimentacao`)
  REFERENCES `tipos_movimentacao` (`idtipo_movimentacao`);