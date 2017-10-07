<?php

namespace App\DataResolver;

use App\DataResolver\DataResolver;
use App\Models\PessoaGla;
use Illuminate\Http\Request;

class PessoaGlaDataResolver extends DataResolver {
    protected $field = [
        'idpessoa_gla', 
        'idpessoa', 
        'idsafra', 
        'idbiotecnologia', 
        'iddocumento', 
        'aprovado', 
        'observacoes',
        'situacao',
    ];
    
    protected $except = [
        'iddocumento'
    ];

    public function __construct(PessoaGla $model) {
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