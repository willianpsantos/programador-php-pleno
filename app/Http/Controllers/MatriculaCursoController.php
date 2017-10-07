<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Repositories\Interfaces\IMatriculaCursoRepository;

class MatriculaCursoController extends ApiController
{
    public function __construct(IMatriculaCursoRepository $repository) {
        //$this->middleware('auth');
        $this->repository = $repository;
    }

    public static function registerRoutes() {
        Route::get('/matriculacurso/id/{id}', 'MatriculaCursoController@getById');
        Route::get('/matriculacurso/all/', 'MatriculaCursoController@getAll');
        Route::get('/matriculacurso/data/', 'MatriculaCursoController@getData');
        Route::post('/matriculacurso/save', 'MatriculaCursoController@postData');
        Route::post('/matriculacurso/activate', 'MatriculaCursoController@activateData');
        Route::post('/matriculacurso/inactivate', 'MatriculaCursoController@inactivateData');
        Route::delete('/matriculacurso/delete', 'MatriculaCursoController@deleteData');
    }
}            