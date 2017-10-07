<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\IEntity;

class Aluno extends Model implements IEntity
{
    public $timestamps = false;
    
    protected $table = "aluno";
    
    protected $primaryKey = "idaluno";
    
    protected $fillable = [
        'idaluno', 
        'nome', 
        'email', 
        'dt_nascimento', 
        'situacao', 
        'dt_cadastro' 
    ];
            
    protected $withs = null;
    
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