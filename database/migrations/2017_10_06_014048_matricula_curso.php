<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MatriculaCurso extends Migration
{
    private $table_name = 'matricula_curso';
    
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         if(Schema::hasTable($this->table_name)) {
             return;
         }
 
         Schema::create($this->table_name, function(Blueprint $table) {
			 $table->engine = 'InnoDB';
			 
             $table->increments('idmatricula_curso')->unsigned();
             $table->integer('idmatricula')->unsigned();
             $table->integer('idcurso')->unsigned();
             $table->enum('situacao', ['A', 'I']); // A - Ativo, I - Inativo
             $table->timestamp('dt_cadastro')->default(DB::raw('current_timestamp'));

             $table->foreign('idmatricula')->references('idmatricula')->on('matricula');
             $table->foreign('idcurso')->references('idcurso')->on('curso');
         });
     }
 
     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::dropIfExists($this->table_name);
     }
}
