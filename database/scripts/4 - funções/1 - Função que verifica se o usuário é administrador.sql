use cotton_sementes;

DELIMITER //

create function f_is_usuario_administrador(
    p_idusuario int
)
returns char(1)
deterministic
begin
   declare v_adm_count int;
   
   select count(idusuario)
     into v_adm_count
	 from usuarios 
	where idusuario = p_idusuario
      and administrador = 'S';
      
    if(v_adm_count > 0) then
        return 'S';
    end if;
    
    select count(idusuario_perfil)
      into v_adm_count
      from usuario_perfis
        inner join perfis on (perfis.idperfil = usuario_perfis.idperfil)
	 where usuario_perfis.idusuario = p_idusuario
	   and perfis.administrador = 'S';
       
	if(v_adm_count > 0) then
        return 'S';
    end if;
    
    return 'N';
end
//

DELIMITER ;