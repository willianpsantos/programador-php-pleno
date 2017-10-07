select concat(
           'INSERT INTO modulos (nm_modulo, identificacao, cor_padrao, icon_css_classe, link, use_mvvm, ordem) VALUES (',
	       concat('''', m.nm_modulo, '''', ', '),
	       concat('''', m.identificacao, '''', ', '),
	       concat('''', m.cor_padrao, '''', ', '),
           concat('''', m.icon_css_classe, '''', ', '),
           concat('''', m.link, '''', ', '),
           concat('''', m.use_mvvm, '''', ', '),
 	       concat(m.ordem), 
           ');'          
	   ) as statement
  from cotton_sementes_testing.modulos m;