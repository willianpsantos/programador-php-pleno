ALTER TABLE `pessoa_gla`
CHANGE COLUMN `aprovado` `aprovado` ENUM('P','E','C','S','N','I') NULL DEFAULT 'P' COMMENT 'P - Pendente de Documeto,E - Pendente de aprovação,C - Pendente de Correção,S - Aprovado,N - Reprovado,I - Inativo' AFTER `iddocumento`;
