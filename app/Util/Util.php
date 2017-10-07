<?php 

namespace App\Util;

class Util {
    
    public static function verifyIfExists($repository, $filters) {
        return $exists = $repository->verifyIfExists($filters);
    }

    public static function validar_cpf($cpf = null) {
 
        // Verifica se um número foi informado
        if(empty($cpf)) {
            return false;
        }

        // Elimina possivel mascara
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $cpf = str_pad($cpf, 11, '0', STR_PAD_LEFT);
     
        // Verifica se o numero de digitos informados é igual a 11 
        if (strlen($cpf) != 11) {
            return false;
        }

        // Verifica se nenhuma das sequências invalidas abaixo 
        // foi digitada. Caso afirmativo, retorna falso
        if ($cpf == '00000000000' || 
            $cpf == '11111111111' || 
            $cpf == '22222222222' || 
            $cpf == '33333333333' || 
            $cpf == '44444444444' || 
            $cpf == '55555555555' || 
            $cpf == '66666666666' || 
            $cpf == '77777777777' || 
            $cpf == '88888888888' || 
            $cpf == '99999999999') {
            return false;            
        }
        
        // Calcula os digitos verificadores para verificar se o
        // CPF é válido
        for ($t = 9; $t < 11; $t++) {
             
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf{$c} * (($t + 1) - $c);
            }

            $d = ((10 * $d) % 11) % 10;

            if ($cpf{$c} != $d) {
                return false;
            }
        }
 
        return true;
    }

    public static function validar_cnpj($cnpj) {
	    $cnpj = preg_replace('/[^0-9]/', '', (string) $cnpj);
	
        // Valida tamanho
	    if (strlen($cnpj) != 14) {
		    return false;
        }

        // Verifica se nenhuma das sequências invalidas abaixo 
        // foi digitada. Caso afirmativo, retorna falso
        if ($cnpj == '00000000000000' || 
            $cnpj == '11111111111111' || 
            $cnpj == '22222222222222' || 
            $cnpj == '33333333333333' || 
            $cnpj == '44444444444444' || 
            $cnpj == '55555555555555' || 
            $cnpj == '66666666666666' || 
            $cnpj == '77777777777777' || 
            $cnpj == '88888888888888' || 
            $cnpj == '99999999999999') {
            return false;            
        }
	    
        // Valida primeiro dígito verificador
	    for ($i = 0, $j = 5, $soma = 0; $i < 12; $i++) {
		    $soma += $cnpj{$i} * $j;
		    $j = ($j == 2) ? 9 : $j - 1;
	    }

	    $resto = $soma % 11;

	    if ($cnpj{12} != ($resto < 2 ? 0 : 11 - $resto)) {
		    return false;
        }
	
        // Valida segundo dígito verificador
	    for ($i = 0, $j = 6, $soma = 0; $i < 13; $i++) {
		    $soma += $cnpj{$i} * $j;
		    $j = ($j == 2) ? 9 : $j - 1;
	    }

	    $resto = $soma % 11;
	    return $cnpj{13} == ($resto < 2 ? 0 : 11 - $resto);
    }

    public static function cpf_complete_validation($repository, $filters, $cpf = null) {
        $exists = Util::verifyIfExists($repository, $filters);
        $result = new \stdClass;
        $result->id = null;

        if($exists) {
            $result->success = false;
            $result->id = $exists;
            $result->message = __('messages.cpfalreadyexists');
        }
        else {
            $valid = Util::validar_cpf($cpf);
            $result->success = $valid;

            if(!$valid) {
                $result->message = __('messages.cpfinvalid');
            }
        }

        return $result;
    }

    public static function cnpj_complete_validation($repository, $filters, $cnpj = null) {
        $exists = Util::verifyIfExists($repository, $filters);
        $result = new \stdClass;
        $result->id = null;

        if($exists) {
            $result->success = false;
            $result->id = $exists;
            $result->message = __('messages.cnpjalreadyexists');
        }
        else {
            $valid = Util::validar_cnpj($cnpj);
            $result->success = $valid;

            if(!$valid) {
                $result->message = __('messages.cnpjinvalid');
            }
        }

        return $result;
    }
}