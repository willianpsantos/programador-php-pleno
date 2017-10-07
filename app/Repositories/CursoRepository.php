<?php

namespace App\Repositories;

use App\Models\Curso;        
use App\Repositories\Interfaces\ICursoRepository;

class CursoRepository extends Repository implements ICursoRepository {
    public $use_company = false;
    
    public function __construct(Curso $model) {
        parent::__construct($model);
    }
}