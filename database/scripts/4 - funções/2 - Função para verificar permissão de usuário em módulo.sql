use cotton_sementes_testing;

DELIMITER //

create function f_usuario_possui_permissao_modulo(
   p_idmodulo 	    int,
   p_identificacao  varchar(50),
   p_idusuario 		int,
   p_uf 	   		char(2)
)
returns char(1)
deterministic
begin
    declare v_permitido        char(1);    
    declare v_administrador    char(1);    
    declare v_perfil_count     int;
    declare v_idperiodo_acesso int;	
    declare v_dt_inicio		   date;
    declare v_dt_fim		   date;
    
    # Se o usuário for administrador, automaticamente permite o acesso ao módulo
    select f_is_usuario_administrador(p_idusuario)
      into v_administrador;

    if(v_administrador = 'S') then
        return 'S';
    end if;
    
    
    # Verifica se tem algum periodo de acesso cadastrado para o módulo
	select pao.idperiodo_acesso,
		   pao.dt_inicio,
           pao.dt_fim
      into v_idperiodo_acesso,
		   v_dt_inicio,
           v_dt_fim
      from periodo_acesso_modulos pao
        inner join modulos mo on (pao.idmodulo = mo.idmodulo)
	 where pao.situacao     = 'A'
       and mo.situacao      = 'A'
	   and pao.aplicar_para = 'U' # U - Usuario
       and pao.idusuario 	= p_idusuario
       and pao.uf 		 	= p_uf
       
       and (pao.idmodulo = p_idmodulo or mo.identificacao = p_identificacao)
       
       and (pao.dt_cadastro = ( select max(pao1.dt_cadastro)
			 					 from periodo_acesso_modulos pao1
                                   inner join modulos mo1 on (pao1.idmodulo = mo1.idmodulo)
			 				    where pao1.situacao     = 'A'								 
			 					  and pao1.aplicar_para = 'U' # U - Usuario
                                  and pao1.idusuario    = p_idusuario
								  and (pao1.idmodulo = p_idmodulo or mo1.identificacao = p_identificacao) ) );
                                  
    
    if (v_idperiodo_acesso is not null) then
        if (current_date between v_dt_inicio and v_dt_fim) then
            return 'S';
		else 
            return 'N';
        end if;
    end if;
     
	# Verifica se o usuário tem alguma permissão para acesso ao módulo
	select pmo.permitido
      into v_permitido
      from permissao_usuario_modulos pmo
		inner join modulos 				  mo  on (pmo.idmodulo     = mo.idmodulo)
        inner join usuarios				  usu on (pmo.idusuario    = usu.idusuario)        
     where pmo.idusuario = p_idusuario
       and mo.situacao  = 'A' /* A - Ativo */
       and usu.situacao = 'A'
	   and ( (pmo.idmodulo = p_idmodulo) or (mo.identificacao = p_identificacao) );       
    
    if(v_permitido is not null) then 
	     return v_permitido;
    end if;
    
    # Verifica se existe algum periodo de acesso para os perfis do usuário
    select pao.idperiodo_acesso,
		   pao.dt_inicio,
           pao.dt_fim
      into v_idperiodo_acesso,
		   v_dt_inicio,
           v_dt_fim
      from periodo_acesso_modulos pao
        inner join modulos mo on (pao.idmodulo = mo.idmodulo)        
	 where pao.situacao     = 'A'
       and mo.situacao      = 'A'
	   and pao.aplicar_para = 'P' # P - Perfil
       and pao.uf 		 	= p_uf     
       
       and (pao.idmodulo = p_idmodulo or mo.identificacao = p_identificacao)
              
       and (pao.idperfil in ( select up.idperfil
							    from usuario_perfis up
							   where up.idusuario = p_idusuario
								 and up.situacao  = 'A' ) )
       
       and (pao.dt_cadastro = ( select max(pao1.dt_cadastro)
			 					 from periodo_acesso_modulos pao1
                                   inner join modulos mo1 on (pao1.idmodulo = mo1.idmodulo)
			 				    where pao1.situacao     = 'A'								 
			 					  and pao1.aplicar_para = 'P' # P - Perfil
								  and (pao1.idmodulo = p_idmodulo or mo1.identificacao = p_identificacao)
                                  and (pao1.idperfil in ( select up.idperfil
													   	    from usuario_perfis up
														   where up.idusuario = p_idusuario
														     and up.situacao  = 'A' ) ) ) );
                                  
    
    if (v_idperiodo_acesso is not null) then
        if (current_date between v_dt_inicio and v_dt_fim) then
            return 'S';
		else 
            return 'N';
        end if;
    end if;
    
    # Verifica se existe alguma permissão de acesso ao módulo para os perfis do usuário
    select count(*)      
      into v_perfil_count
	  from permissao_perfil_modulos pm
        inner join modulos 				  mo  on (pm.idmodulo       = mo.idmodulo)
        inner join usuario_perfis         up  on (pm.idperfil       = up.idperfil)
        left  join periodo_acesso_modulos pao on (pm.idperfil       = pao.idperfil and 
												  pm.idmodulo       = pao.idmodulo and 
                                                  pao.aplicar_para  = 'P' 		   and
                                                  pao.situacao      = 'A')
     where up.idusuario  = p_idusuario
       and pm.permitido  = 'S'
       and mo.situacao   = 'A'
       and up.situacao   = 'A'       
	   and (pm.idmodulo  = p_idmodulo or mo.identificacao = p_identificacao) 
       and ( (pao.idperiodo_acesso is null) or (current_date between pao.dt_inicio and pao.dt_fim ) );    
       
	if(v_perfil_count > 0) then
	    return 'S';
	end if;
	
	return 'N';
end
//

DELIMITER ;