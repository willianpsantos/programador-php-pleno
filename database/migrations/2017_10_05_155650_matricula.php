<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Matricula extends Migration
{
    private $table_name = 'matricula';
    
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
			 
             $table->increments('idmatricula')->unsigned();
             $table->integer('idaluno')->unsigned();
             $table->string('turma', 50);
             $table->string('periodo_letivo', 10);
             $table->enum('situacao', ['A', 'I']); // A - Ativo, I - Inativo
             $table->timestamp('dt_cadastro')->default(DB::raw('current_timestamp'));

             $table->foreign('idaluno')->references('idaluno')->on('aluno');
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
