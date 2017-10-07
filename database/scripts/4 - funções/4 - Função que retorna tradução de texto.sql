use cotton_sementes_dev;

DELIMITER //

create function f_get_text(
    p_idtexto int unsigned,
    p_idioma char(5),
    p_default varchar(255)
)
returns varchar(255)
deterministic
begin
    declare v_text varchar(255);

    if(p_idtexto is null) or (p_idioma is null) then
        return p_default;
    end if;
    
    select texto
	  into v_text
      from texto_idiomas
	 where idtexto = p_idtexto
	   and idioma  = p_idioma;
       
    if(v_text is null) then
        return p_default;
    end if;
    
    return v_text;
end
//

DELIMITER ;