ALTER TABLE `tipos_movimentacao` 
ADD COLUMN `mostra_em_venda` ENUM('S', 'N') NULL DEFAULT 'N' AFTER `exige_justificativa`;
