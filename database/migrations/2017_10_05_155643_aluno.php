<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Aluno extends Migration
{
    private $table_name = 'aluno';

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
			 
             $table->increments('idaluno')->unsigned();
             $table->string('nome', 150);
             $table->string('email', 150);
             $table->date('dt_nascimento')->nullable();
             $table->enum('situacao', ['A', 'I']); // A - Ativo, I - Inativo
             $table->timestamp('dt_cadastro')->default(DB::raw('current_timestamp'));
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
