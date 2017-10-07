ALTER TABLE `datas_lancamento` 
DROP COLUMN `ano`,
DROP COLUMN `mes`,
DROP COLUMN `dia`,
ADD COLUMN `data_vencimento` DATE NOT NULL AFTER `idpessoa_multiplicador`;