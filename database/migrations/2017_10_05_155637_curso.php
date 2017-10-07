<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Curso extends Migration
{
    private $table_name = 'curso';

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
			
            $table->increments('idcurso')->unsigned();
            $table->string('titulo', 150);
            $table->string('sigla', 10)->nullable();
            $table->text('descricao')->nullable();
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
