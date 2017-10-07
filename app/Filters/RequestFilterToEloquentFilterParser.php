<?php

namespace App\Filters;

use App\Repositories\Core\DbOperators;

class RequestFilterToEloquentFilterParser {
    
    private function parseOperator($operator) {
        switch ($operator) {
            case FilterOperators::Equal:
                return DbOperators::Equal;
                
            case FilterOperators::NotEqual:
                return DbOperators::Different;
                
            case FilterOperators::LessThan:
                return DbOperators::LessThan;
                
            case FilterOperators::LessOrEqualThan:
                return DbOperators::LessOrEqualThan;
                
            case FilterOperators::GreaterThan:
                return DbOperators::GreaterThan;
                
            case FilterOperators::GreaterOrEqualThan:
                return DbOperators::GreaterOrEqualThan;
                
            case FilterOperators::EndsWith:
            case FilterOperators::StartsWith:
            case FilterOperators::Contains:
                return DbOperators::Like;
                
            case FilterOperators::DoesNotContain:
                return DbOperators::NotLike;
                
            case FilterOperators::IsNull:
                return DbOperators::IsNull;
                
            case FilterOperators::IsNotNull:
                return DbOperators::IsNotNull;
                
            case FilterOperators::IsIn:
                return DbOperators::In;
                
            case FilterOperators::IsNotIn:
                return DbOperators::NotIn;
                
            default:
                return DbOperators::Equal;
        }
    }
    
    private function parseValue($value, $operator) {
        switch ($operator) {
            case FilterOperators::StartsWith:
                return $value . '%';
                
            case FilterOperators::EndsWith:
                return '%' . $value;
                
            case FilterOperators::Contains:
            case FilterOperators::DoesNotContain:
                return '%' . $value . '%';
                
            case FilterOperators::IsEmpty:
            case FilterOperators::IsNotEmpty:
                return '';
                
            default:
                return $value;
        }
    }
    
    public function parse(FilterContainer $filterContainer) {
        if($filterContainer == null) {
            return null;
        }
        
        $filters = $filterContainer->filters;
        
        if($filters == null || count($filters) == 0) {
            return null;
        }
        
        $dbFilters = [];
        
        foreach($filters as $filter) {
            $dbFilters[$filter->field] = [
                'value' => $this->parseValue($filter->value, $filter->operator),
                'operator' => $this->parseOperator($filter->operator)
            ];
        }
        
        return $dbFilters;
    }
}

