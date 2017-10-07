DELIMITER //

create function f_get_estoque_atual_lote(
    p_idlote   int unsigned,
    p_idpessoa int unsigned
)
returns numeric(18,3)
deterministic
begin
    declare v_total_entradas numeric(18, 3);
    declare v_total_saidas   numeric(18, 3);
    
    select sum(r.qtde_remessa)
      into v_total_entradas
      from remessas r
	 where r.idlote 		 = p_idlote
       and r.idpessoa 	     = p_idpessoa
       and r.tp_movimentacao = 'E'
       and r.situacao 		 = 'A';
       
    if (v_total_entradas is null) then
        set v_total_entradas = 0;
    end if;
       
	select sum(r.qtde_remessa)
      into v_total_saidas
      from remessas r
	 where r.idlote 		  = p_idlote
       and r.idpessoa_empresa = p_idpessoa
       and r.tp_movimentacao  = 'S'
       and r.situacao 		  = 'A';
       
	if (v_total_saidas is null) then
        set v_total_saidas = 0;
    end if;
       
	return v_total_entradas - v_total_saidas;
end
//

DELIMITER ;