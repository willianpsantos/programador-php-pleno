<?php

namespace App\DataResolver;

use Illuminate\Database\Eloquent\Model;

class DataResolver implements IDataResolver {
    protected $field = [];
    protected $except = [];
    public $special = [];
    protected $model;

    public function __construct(Model $model) {
        $this->model = $model; 
        $this->bindSpecials();
    }
    
    protected function isOnExcept($field) {
        if(empty($this->except) || count($this->except) === 0) {
            return false;
        }
        
        foreach ($this->except as $except) {
            if($except === $field) {
                return true;
            }
        }
        
        return false;
    }
    
    protected function hasSpecialTreatment($field) {
        if(empty($this->special) || count($this->special) === 0) {
            return false;
        }
        
        if(array_key_exists($field, $this->special)) {
            return true;
        }
        
        return false;
    }
    
    protected function bindSpecials() {
        $class = get_class($this);
        $methods = get_class_methods($class);               
       
        foreach ($this->field as $field) {
            $fnname = "special_{$field}";
            
            if(array_search($fnname, $methods)) {
                $this->special[$field] = $fnname;
            }
        }
    } 
    
    protected function invokeSpecial($field, $request) {
        $class = get_class($this);
        $name = $this->special[$field];
        $method = new \ReflectionMethod($class, $name);
        
        if(!$method) {
            return null;
        }
        
        $result = $method->invoke($this, $request);
        return $result;
    }

    public function getData(\Illuminate\Http\Request $request) {
        $fillable = null;
        
        if(empty($this->field) || count($this->field) === 0) {
            $fillable = $this->model->getFillable();
        }
        else {
            $fillable = $this->field;
        }
        
        $values = [];
        
        foreach ($fillable as $field) {
            if($this->isOnExcept($field)) {
                continue;
            }
            
            if($this->hasSpecialTreatment($field)) {
                $values[$field] = $this->invokeSpecial($field, $request);
            }
            else {
                $values[$field] = $request->input($field);
            }
        }
        
        return $values;
    }
}