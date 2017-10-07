ALTER TABLE modulos
ADD tp_icone enum('S', 'C') default 'C' comment 'S - SVG, C - Classe CSS';

ALTER TABLE `modulos` 
CHANGE COLUMN `tp_icone` `tp_icone` ENUM('S', 'C') NULL DEFAULT 'C' COMMENT 'S - SVG, C - Classe CSS' AFTER `link`,
CHANGE COLUMN `icon_css_classe` `icon_css_classe` VARCHAR(1500) NULL DEFAULT NULL COMMENT 'Pode ser uma classe CSS ou um SVG.' ;
