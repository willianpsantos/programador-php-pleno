ALTER TABLE `pessoas` 
ADD COLUMN `idpessoa_empresa_cadastro` INT UNSIGNED NULL COMMENT 'Campo utilizado para o cadastro de distribuidores onde é armazenado o código da empresaque cadastrou o distribuidor.' AFTER `iddocumento_contrato`,

ADD INDEX `pessoas_ibfk_20_idx` (`idpessoa_empresa_cadastro` ASC);
ALTER TABLE `pessoas` 
ADD CONSTRAINT `pessoas_ibfk_20`
  FOREIGN KEY (`idpessoa_empresa_cadastro`)
  REFERENCES `pessoas` (`idpessoa`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;