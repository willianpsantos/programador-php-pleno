select concat(
	       'INSERT INTO `permissao_perfil_modulos` (`idperfil`,`idmodulo`,`permitido`) VALUES (',
           concat('f_get_id_perfil(', '''', p.nm_perfil, '''', '), '),
           concat('f_get_id_modulo(', '''', m.nm_modulo, '''', '), '),
           concat('''', pfm.permitido, ''''),
           ');'
	   ) as statement       
  from permissao_perfil_modulos pfm
    inner join perfis p on (pfm.idperfil = p.idperfil)
    inner join modulos m on (pfm.idmodulo = m.idmodulo)