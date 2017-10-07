<?php

namespace App\Models\Interfaces;

interface IEntity {
    function getTableName();
    function getPrimaryKeyName();
    function getFillables();
    function getWiths();
}

