<?php

namespace App\Sorts;

use Illuminate\Http\Request;

class Sort {
    public $field;
    public $dir;
    
    public static function extractFromRequest(Request $request) {
        $requestSorts = $request->sort;
        
        if($requestSorts == null || count($requestSorts) == 0) {
            return null;
        }        
        
        $sorts = [];
        
        foreach ($requestSorts as $requestSort) {
            $sort = new Sort;            
            $sort->field = $requestSort['field'];
            $sort->dir = $requestSort['dir'];
            
            array_push($sorts, $sort);
        }
        
        return $sorts;
    }
}

