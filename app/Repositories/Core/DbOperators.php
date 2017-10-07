<?php

namespace App\Repositories\Core;

/**
 * Has all main operators used in the database, plus the special operators used by the Eloquent ORM
 */
class DbOperators {
    const Equal = '=';
    const Different = '<>';
    const GreaterThan = '>';
    const LessThan = '<';
    const GreaterOrEqualThan = '>=';
    const LessOrEqualThan = '<=';
    const In = 'in';
    const NotIn = 'not in';
    const Between = 'between';
    const IsNull = 'is null';
    const IsNotNull = 'is not null';
    const Exists = 'exists';
    const Like = 'like';
    const NotLike = 'not like';
    
    /* Specifics operators of Laravel */
    const WhereDate = 'wheredate';
    const WhereMonth = 'wheremonth';
    const WhereDay = 'whereday';
    const WhereYear = 'whereyear';
    const WhereColumn = 'wherecolumn';
}