select concat(
           'INSERT INTO modulo_modulos_objetos (idmodulo, idmodulo_objeto, idmodulo_objeto_pai, link, identificacao, ordem, situacao) VALUES (',
	       concat('f_get_id_modulo(', '''', m.identificacao, '''', '), '),
	       concat('f_get_id_modulo_objeto(', '''', mo.nm_modulo_objeto, '''', '), '),
	       concat('f_get_id_modulo_objeto(', coalesce(concat('''', mop.nm_modulo_objeto, ''''), 'NULL') , '), '),	       
           concat(coalesce(concat('''', mmo.link, ''''), 'NULL'), ','),
           concat(coalesce(concat('''', mmo.identificacao, ''''), 'NULL'), ','),
 	       concat(coalesce(mmo.ordem, 'NULL'), ','),	       
           concat("'", 'A', "'", ');')           
	   ) as statement
  from cotton_sementes_dev.modulo_modulos_objetos mmo
    inner join modulos        m   on (mmo.idmodulo = m.idmodulo)
	 inner join modulo_objetos mo  on (mmo.idmodulo_objeto = mo.idmodulo_objeto)
	 left  join modulo_objetos mop on (mmo.idmodulo_objeto_pai = mop.idmodulo_objeto)