<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Repositories\Interfaces\IMatriculaRepository;

class MatriculaController extends ApiController
{
    public function __construct(IMatriculaRepository $repository) {
        //$this->middleware('auth');
        $this->repository = $repository;
    }

    public static function registerRoutes() {
        Route::get('/matricula/id/{id}', 'MatriculaController@getById');
        Route::get('/matricula/all/', 'MatriculaController@getAll');
        Route::get('/matricula/data/', 'MatriculaController@getData');
        Route::post('/matricula/save', 'MatriculaController@postData');
        Route::post('/matricula/activate', 'MatriculaController@activateData');
        Route::post('/matricula/inactivate', 'MatriculaController@inactivateData');
        Route::delete('/matricula/delete', 'MatriculaController@deleteData');
    }
}            