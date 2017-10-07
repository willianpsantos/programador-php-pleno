ALTER TABLE `cotton_sementes_testing`.`remessas` 
ADD COLUMN `pms` DECIMAL(18,4) NULL AFTER `idusuario_reativacao`;

ALTER TABLE `cotton_sementes_testing`.`remessas` 
ADD COLUMN `germinacao` INT(10) NULL AFTER `pms`;

ALTER TABLE `cotton_sementes_testing`.`remessas` 
ADD COLUMN `idcultivar` INT(10) NOT NULL AFTER `germinacao`;


ALTER TABLE `cotton_sementes_testing`.`remessas` 
CHANGE COLUMN `idcultivar` `idcultivar` INT(10) UNSIGNED NOT NULL ;
