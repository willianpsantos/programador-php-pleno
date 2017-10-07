SELECT concat(
           'INSERT INTO `permissao_perfil_modulo_objetos` (`idperfil`, `idmodulo`, `idmodulo_objeto`, `idmodulo_objeto_pai`, `permitido`) VALUES (',           
			concat('f_get_id_perfil(', '''', p.nm_perfil, '''', '), '),
            concat('f_get_id_modulo(', '''', m.nm_modulo, '''', '), '),
            concat('f_get_id_modulo_objeto(', '''', mo.nm_modulo_objeto, '''', '), '),
            concat('f_get_id_modulo_objeto(', coalesce(concat('''', mop.nm_modulo_objeto, ''''), 'NULL'), '), '),
            concat('''', 'S', '''', ');')
		) as statement
  FROM permissao_perfil_modulo_objetos pfmo
    inner join perfis	      p   on (pfmo.idperfil = p.idperfil)
    inner join modulos 		  m   on (pfmo.idmodulo = m.idmodulo)
    inner join modulo_objetos mo  on (pfmo.idmodulo_objeto = mo.idmodulo_objeto)
    left  join modulo_objetos mop on (pfmo.idmodulo_objeto_pai = mop.idmodulo_objeto);    