<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Repositories\Interfaces\IAlunoRepository;

class AlunoController extends ApiController
{
    public function __construct(IAlunoRepository $repository) {
        //$this->middleware('auth');
        $this->repository = $repository;
    }

    public static function registerRoutes() {
        Route::get('/aluno/id/{id}', 'AlunoController@getById');
        Route::get('/aluno/all/', 'AlunoController@getAll');
        Route::get('/aluno/data/', 'AlunoController@getData');
        Route::post('/aluno/save', 'AlunoController@postData');
        Route::post('/aluno/activate', 'AlunoController@activateData');
        Route::post('/aluno/inactivate', 'AlunoController@inactivateData');
        Route::delete('/aluno/delete', 'AlunoController@deleteData');
    }
}            