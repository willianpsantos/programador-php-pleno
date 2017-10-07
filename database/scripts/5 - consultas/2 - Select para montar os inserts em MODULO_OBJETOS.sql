select concat(
           'INSERT INTO modulo_objetos (nm_modulo_objeto, tp_modulo_objeto, icon_css_classe, use_mvvm, cor_padrao) VALUES (',
	       concat('''', mo.nm_modulo_objeto, '''', ', '),
	       concat('''', mo.tp_modulo_objeto, '''', ', '),
	       concat('''', coalesce(mo.icon_css_classe, ''), '''', ', '),
           concat('''', mo.use_mvvm, '''', ', '),
           concat('''', coalesce(mo.cor_padrao, ''), ''''),
           ');'          
	   ) as statement
  from cotton_sementes_testing.modulo_objetos mo;