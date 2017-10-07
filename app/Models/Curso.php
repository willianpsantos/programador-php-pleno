<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\IEntity;

class Curso extends Model implements IEntity
{
    public $timestamps = false;
    
    protected $table = "curso";
    
    protected $primaryKey = "idcurso";
    
    protected $fillable = [
        'idcurso', 
        'titulo', 
        'sigla', 
        'descricao', 
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