ALTER TABLE `cotton_sementes_testing`.`lotes` 
ADD COLUMN `qtde_pms` INT(10) NULL AFTER `idremessa_entrada`;

ALTER TABLE `lotes`
ADD COLUMN `germinacao`  int(10) NULL DEFAULT NULL AFTER `qtde_pms`;

