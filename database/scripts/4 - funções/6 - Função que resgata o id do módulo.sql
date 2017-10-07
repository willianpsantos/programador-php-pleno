#use cotton_sementes_dev;

DELIMITER //

create function f_get_id_modulo(
	p_identificacao varchar(150)
)
returns int unsigned
deterministic
begin
    declare v_id int unsigned;
    
    select idmodulo
      into v_id
      from modulos
	 where identificacao = p_identificacao;
     
	if(v_id is not null) then
        return v_id;
    end if;
    
    select idmodulo
      into v_id
      from modulos
	 where nm_modulo = p_identificacao;
     
	return v_id;
end
//

DELIMITER ;