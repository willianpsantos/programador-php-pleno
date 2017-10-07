select concat(
	       'INSERT INTO `perfis` (`nm_perfil`,`administrador`) VALUES (',
           concat('''', p.nm_perfil, '''', ','),
           concat('''', p.administrador, ''''),
           ');'
	   ) as statement       
  from perfis p;