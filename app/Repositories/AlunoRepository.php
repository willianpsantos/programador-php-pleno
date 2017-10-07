<?php

namespace App\Repositories;

use App\Models\Aluno;        
use App\Repositories\Interfaces\IAlunoRepository;

class AlunoRepository extends Repository implements IAlunoRepository {
    public $use_company = false;
    
    public function __construct(Aluno $model) {
        parent::__construct($model);
    }
}