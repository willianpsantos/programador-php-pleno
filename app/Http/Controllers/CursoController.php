<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Repositories\Interfaces\ICursoRepository;

class CursoController extends ApiController
{
    public function __construct(ICursoRepository $repository) {
        //$this->middleware('auth');
        $this->repository = $repository;
    }

    public static function registerRoutes() {
        Route::get('/curso/id/{id}', 'CursoController@getById');
        Route::get('/curso/all/', 'CursoController@getAll');
        Route::get('/curso/data/', 'CursoController@getData');
        Route::post('/curso/save', 'CursoController@postData');
        Route::post('/curso/activate', 'CursoController@activateData');
        Route::post('/curso/inactivate', 'CursoController@inactivateData');
        Route::delete('/curso/delete', 'CursoController@deleteData');
    }
}            