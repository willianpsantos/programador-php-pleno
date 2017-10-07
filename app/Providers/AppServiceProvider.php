<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
    
    public function registerRepositories() {
        
        $arrRep = array(
            'AlunoRepository',
            'CursoRepository',
            'MatriculaRepository',
            'MatriculaCursoRepository'
        );
        
        foreach($arrRep as $val) {
            
            $this->app->bind(
                'App\Repositories\Interfaces\I'.$val, 
                "App\Repositories\\{$val}"
            );
        }
        
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerRepositories();
    }
}
