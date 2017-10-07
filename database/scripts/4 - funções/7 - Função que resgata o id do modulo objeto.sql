#use cotton_sementes_dev;

DELIMITER //

create function f_get_id_modulo_objeto(
    p_identificacao varchar(150)
)
returns int unsigned
deterministic
begin
    declare v_id int unsigned;
    
    if(p_identificacao is null) then
        return NULL;
    end if;
    
    select idmodulo_objeto
      into v_id
      from modulo_objetos
	 where nm_modulo_objeto = p_identificacao
     limit 1;
     
    return v_id;
end
//

DELIMITER ;