<?php

namespace App\Filters;

class FilterOperators {
    const Equal = "eq";
    const NotEqual = "neq";
    const IsNull = "isnull";
    const IsNotNull = "isnotnull";
    const LessThan = "lt";
    const LessOrEqualThan = "lte";
    const GreaterThan = "gt";
    const GreaterOrEqualThan = "gte";
    const StartsWith = "startswith";
    const EndsWith = "endswith";
    const Contains = "contains";
    const DoesNotContain = "doesnotcontain";
    const IsEmpty = "isempty";
    const IsNotEmpty = "isnotempty";
    const IsIn = "isin";
    const IsNotIn = "isnotin";
}

