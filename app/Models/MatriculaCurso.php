<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\IEntity;

class MatriculaCurso extends Model implements IEntity
{
    public $timestamps = false;
    
    protected $table = "matricula_curso";
    
    protected $primaryKey = "idmatricula_curso";
    
    protected $fillable = [
        'idmatricula_curso', 
        'idmatricula', 
        'idcurso', 
        'situacao', 
        'dt_cadastro' 
    ];
            
    protected $withs = [
        'matricula',
        'matricula.aluno',
        'curso'
    ];

    public function matricula() {
        return $this->hasOne('App\Models\Matricula', 'idmatricula', 'idmatricula');
    }

    public function curso() {
        return $this->hasOne('App\Models\Curso', 'idcurso', 'idcurso');
    }
    
    public function getFillables() {
        return $this->fillable;
    }

    public function getPrimaryKeyName() {
        return $this->primaryKey;
    }

    public function getTableName() {
        return $this->table;
    }

    public function getWiths() {
        return $this->withs;
    }
}    