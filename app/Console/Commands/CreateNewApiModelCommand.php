<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateNewApiModelCommand extends Command
{
    protected $template = <<<MOD
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\IEntity;

class {model} extends Model implements IEntity
{
    public \$timestamps = false;
    
    protected \$table = "{table}";
    
    protected \$primaryKey = "{primarykey}";
    
    protected \$fillable = [
{fillable}
    ];
            
    protected \$withs = null;
    
    public function getFillables() {
        return \$this->fillable;
    }

    public function getPrimaryKeyName() {
        return \$this->primaryKey;
    }

    public function getTableName() {
        return \$this->table;
    }

    public function getWiths() {
        return \$this->withs;
    }
}    
MOD;
    
    protected $sql_get_table = <<<TAB
select count(table_name) as total
  from information_schema.TABLES
 where table_schema = ?
   and table_name   = ?
TAB;


    protected $sql_get_columns = <<<COL
select column_name,
       column_key,
       extra
  from information_schema.COLUMNS
 where table_schema = ?
   and table_name   = ?
order by ordinal_position
COL;
    
    protected $sql_get_fk = <<<FK
select replace(column_name, 'id', '') as with_name,
       column_name,
       referenced_table_name,
       referenced_column_name
  from information_schema.KEY_COLUMN_USAGE
 where table_schema = ?
   and table_name   = ?
   and referenced_table_schema is not null
   and referenced_table_name is not null
   and referenced_column_name is not null
   and column_name not in (
       'idusuario_cadastro',
       'idusuario_alteracao',
       'idusuario_inativacao',
       'idusuario_reativacao',
       'idusuario_aprovacao',
       'idusuario_reprovacao',
       'idusuario_negado',
       'idusuario_permitido'
   )
FK;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:apimodel {model} {--t|table= :A tabela que o model mapeará.} {--s|schema= :O schema/database que contem a tabela.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria um novo Model com todas as configurações';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
    
    protected function makeWith($table, $localKey, $foreignKey) {
        $with_template = <<<WIT
public function {with}() {
    return \$this->hasOne('{model}', '{local}', '{foreign}');                
}

WIT;
        $model = $this->getModelFromTable($table);
        $temp = str_replace('{with}', $table, $with_template);
        $temp = str_replace('{model}', $model, $temp);
        $temp = str_replace('{local}', $localKey, $temp);
        $temp = str_replace('{foreign}', $foreignKey, $temp);
        
        return $temp;
    }

    protected function getColumns($schema, $table) {
        $columns = DB::select($this->sql_get_columns, [$schema, $table]);
        
        if($columns == null || count($columns) == 0) {
            $this->info("A tabela {$schema}.{$table} não possui colunas.");
            return null;
        }
        
        return $columns;
    }
    
    protected function tableExists($schema, $table) {
        $result = DB::select($this->sql_get_table, [$schema, $table]);
        
        if($result == null || count($result) == 0) {
            $this->info("A tabela {$schema}.{$table} não existe.");
            return false;
        }
        
        return $result[0]->total > 0;
    }
    
    protected function makeFillable($columns) {
        $fillable = "";
        
        for($i = 0; $i < count($columns); $i++) {
            $col = $columns[$i];
            
            if($i == count($columns) - 1) {
                $fillable = $fillable . "        '{$col->column_name}' ";
            }
            else {
                $fillable = $fillable . "        '{$col->column_name}', \n";
            }
        }
        
        return $fillable;
    }
    
    protected function getPrimaryKey($columns) {
        $primaryKey = "";
        
        foreach ($columns as $column) {
            if($column->column_key === "PRI" || $column->extra === "auto_increment") {
                $primaryKey = $column->column_name;
            }
        }
        
        return $primaryKey;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $model = $this->argument('model');
        $table = $this->option('table');
        $schema = $this->option('schema');
        
        if(!$this->tableExists($schema, $table)) {
            $this->info("Tabela n existe");
            return;
        }
        
        $columns = $this->getColumns($schema, $table);
        
        if($columns == null) {
            $this->info("Coluna n existe");
            return;
        }
        
        $fillable = $this->makeFillable($columns);
        $primaryKey = $this->getPrimaryKey($columns);
        $temp = str_replace('{model}', $model, $this->template);
        $temp = str_replace('{table}', $table, $temp);
        $temp = str_replace('{fillable}', $fillable, $temp);
        $temp = str_replace('{primarykey}', $primaryKey, $temp);
        $this->info($temp);
        
        $path = app_path() . "\\Models\\" . $model . ".php";
        $file = fopen($path, "w+");
        fputs($file, $temp);
        
        fclose($file);
        
        $this->info('Model criado com sucesso.');
    }
}
