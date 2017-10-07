/*
-- Query: select * from tipos_movimentacao
LIMIT 0, 50000

-- Date: 2017-08-11 09:05
*/
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('VENDA', 'S', 'N', 'S', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('DESCARTE', 'S', 'N', 'N', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('PERDA/EXTRAVIO DE MERCADORIA', 'S', 'S', 'N', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('ENTRADA EM ESTOQUE POR CADASTRO DE LOTE', 'E', 'N', 'N', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('SAÍDA POR TRANSFERÊNCIA', 'S', 'N', 'N', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('ENTRADA POR TRANSFERÊNCIA', 'E', 'N', 'N', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('CONSUMO', 'S', 'N', 'S', 'A');
INSERT INTO `tipos_movimentacao` (`idtipo_movimentacao`,`nm_tipo_movimentacao`,`tp_movimentacao`,`exige_justificativa`,`mostra_em_venda`,`situacao`) VALUES ('BONIFICAÇÃO', 'S', 'N', 'S', 'A');
