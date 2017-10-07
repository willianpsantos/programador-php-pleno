<?php

namespace App\Repositories;

use App\Models\MatriculaCurso;        
use App\Repositories\Interfaces\IMatriculaCursoRepository;

class MatriculaCursoRepository extends Repository implements IMatriculaCursoRepository {
    public $use_company = false;
    
    public function __construct(MatriculaCurso $model) {
        parent::__construct($model);
    }
}