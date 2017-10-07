<?php

namespace App\Filters;

use Illuminate\Http\Request;

class FilterContainer {
    
    public $logic;
    
    public $filters;
    
    public function __construct() {
        $this->filters = [];
    }
    
    public function addFilter(Filter $filter) {
        array_push($this->filters, $filter);
    }
    
    public function hasFilters() {
        return count($this->filters) > 0;
    }

    public static function extractFromRequest(Request $request) {
        $requestFilterContainer = $request->filter;
        if(!$requestFilterContainer ||
             !array_key_exists('filters', $requestFilterContainer) ||
              count($requestFilterContainer) == 0) {
            return null;
        }
        
        $filterContainer = new FilterContainer;
        $filterContainer->logic = $requestFilterContainer['logic'];        
        $requestFilters = $requestFilterContainer['filters'];
        
        foreach ($requestFilters as $requestFilter) {
            
            if (isset($requestFilter['filters'])) {
                $filterContainer->addChildFilters($requestFilter['filters'],$filterContainer);
            } else {
                $filter = new Filter;
                $filter->field =  $requestFilter['field'];
                $filter->operator = $requestFilter['operator'];
                $filter->value = $requestFilter['value'];
                $filterContainer->addFilter($filter);
            }
        }
        return $filterContainer;
    }
    
    public function addChildFilters($objfilter,$filterContainer) {
        foreach ($objfilter as $_filter) {
            if(isset($_filter['filters'])) {
                $filterContainer->addChildFilters($_filter['filters'],$filterContainer);
            } else {
                $filter = new Filter;
                $filter->field =  $_filter['field'];
                $filter->operator = $_filter['operator'];
                $filter->value = $_filter['value'];
                $filterContainer->addFilter($filter);
            }
        }
    }
}
