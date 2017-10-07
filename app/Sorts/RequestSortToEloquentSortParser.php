<?php

namespace App\Sorts;

class RequestSortToEloquentSortParser {
    public function parse($sorts) {
        if($sorts == null || count($sorts) == 0) {
            return null;
        }
        
        $dbSorts = [];
        
        foreach($sorts as $sort) {
            $dbSorts[$sort->field] = $sort->dir;
        }
        
        return $dbSorts;
    }
}

