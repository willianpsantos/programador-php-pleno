<?php

namespace App\DataResolver;

use App\DataResolver\DataResolver;
use App\Models\PessoaContratos;
use Illuminate\Http\Request;

class PessoaContratoDataResolver extends DataResolver {
    protected $field = [
        'idpessoa_contrato',
        'idpessoa',
        'idsafra',
        'nm_contrato',
        'idtipo_contrato',        
        'aprovado',
        'observacoes'
    ];
    
    protected $except = [
        'iddocumento'
    ];

    public function __construct(PessoaContratos $model) {
        parent::__construct($model);
    }
    
    public function special_idsafra(Request $request) {
        $safra = $request->input('idsafra');
        
        if($safra === 'null' || $safra === '0' || $safra === 0) {
            return null;
        }
        
        return $safra;
    }
}