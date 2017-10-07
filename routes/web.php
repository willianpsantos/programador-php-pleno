<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('init');

//Validações
Route::post('/validacoes/cpf', 'CpfCnpjValidadorController@validar_cpf');
Route::post('/validacoes/cnpj', 'CpfCnpjValidadorController@validar_cnpj');

\App\Http\Controllers\AlunoController::registerRoutes();
\App\Http\Controllers\CursoController::registerRoutes();
\App\Http\Controllers\MatriculaController::registerRoutes();
\App\Http\Controllers\MatriculaCursoController::registerRoutes();