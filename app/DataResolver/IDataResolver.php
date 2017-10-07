<?php

namespace App\DataResolver;

use Illuminate\Http\Request;

interface IDataResolver {
    function getData(Request $request);
}

