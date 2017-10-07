<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\IEntity;

class Matricula extends Model implements IEntity
{
    public $timestamps = false;
    
    protected $table = "matricula";
    
    protected $primaryKey = "idmatricula";
    
    protected $fillable = [
        'idmatricula', 
        'idaluno', 
        'turma', 
        'periodo_letivo', 
        'situacao', 
        'dt_cadastro' 
    ];
            
    protected $withs = [
        'aluno',
        'matricula_curso'
    ];

    public function aluno() {
        return $this->hasOne('App\Models\Aluno', 'idaluno', 'idaluno');
    }

    public function matricula_curso() {
        return $this->hasMany('App\Models\MatriculaCurso', 'idmatricula', 'idmatricula');
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