<?php

namespace App\Repositories;

use App\Models\Matricula;        
use App\Repositories\Interfaces\IMatriculaRepository;

class MatriculaRepository extends Repository implements IMatriculaRepository {
    public $use_company = false;
    
    public function __construct(Matricula $model) {
        parent::__construct($model);
    }
}