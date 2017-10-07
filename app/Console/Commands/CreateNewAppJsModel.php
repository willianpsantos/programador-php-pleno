<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateNewAppJsModel extends Command {

    protected $schema = '';
    protected $table = '';
    protected $pk = '';
    protected $row_columns = '';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:jsmodel {nm_field?} '
            . '{--m|model= : O nome da model utilizada.} '
            . '{--t|table= : A tabela que o model mapeara.} '
            . '{--s|schema= : O schema/database que contem a tabela.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria uma nova js model';

    # Sql verifica se Schema existe
    protected $sql_schema_search = <<<SSE
SELECT
    count(table_name) as total
FROM 
    information_schema.TABLES
WHERE
    table_schema = ?    
SSE;

    #  Sql verifica se Table existe
    protected $sql_table_search = <<<STS
SELECT
    count(table_name) as total
FROM 
    information_schema.TABLES
WHERE
    table_schema = ?
    AND table_name = ?
STS;

    # Sql todas as colunas de uma determinada tabela.
    protected $sql_get_columns = <<<COL
SELECT
    TABLE_NAME,
    COLUMN_KEY,
    DATA_TYPE,
    COLUMN_NAME,
    COLUMN_DEFAULT,
    COLUMN_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    NUMERIC_PRECISION,
    IS_NULLABLE
FROM
    information_schema.COLUMNS
WHERE
    table_schema = ?
    AND table_name   = ?
    AND COLUMN_NAME NOT IN ('dt_cadastro','idusuario_cadastro','dt_alteracao','idusuario_alteracao','dt_inativacao','idusuario_inativacao','dt_reativacao','idusuario_reativacao')
ORDER BY ordinal_position
COL;

# Sql para consultar a PK
    protected $sql_get_pkcolumns = <<<CPK
SELECT
    COLUMN_KEY,
    DATA_TYPE,
    COLUMN_NAME,
    CHARACTER_MAXIMUM_LENGTH,
    NUMERIC_PRECISION,
    IS_NULLABLE
FROM
    information_schema.COLUMNS
WHERE
    table_schema = ?
    AND table_name   = ?
    AND COLUMN_KEY = ?
ORDER BY ordinal_position
CPK;

    # Template do arquivo model.js
    protected $_template = <<<TPL
define('model/{{model}}', ['kendo'], function (kendo) {
return kendo.data.Model.define({
        id : '{{pk}}',
        
        fields : 
            {{fields}}
    });
});
TPL;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        # Valores informado por padrao
        $nm_field = $this->argument('nm_field');
        $model = $this->option('model');
        $this->table = $this->option('table');
        $this->schema = empty($this->option('schema')) ? DB::connection()->getDatabaseName() : $this->option('schema'); // Schema personalizada

        # Verufica se o Nome do arquivo foi informado por padrao
        if (empty($nm_field))
        {
            $nm_field = $this->ask("Qual o nome do arquivo a ser criado ?");
        }

        # Verufica se o Nome da Model foi informado por padrao
        if (empty($model))
        {
            $model = $this->ask("Qual o nome da Model ?");
        }

        /**
         *  Verifica se foi informado um nome de schema ou se pega o valor padrao
         *  Verifica se a schema existe, obrigando passar uma valida.
         */
        do
        {
            # Verifica se a Schema/DB existe
            $existSchema = $this->schemaExists();

            # Solicitacao para informar uma Schema/DT valida.
            if (!$existSchema)
            {
                $this->schema = $this->ask("Nome da schema/database invalido. Qual o nome correto?");
            }
        }
        while (!$existSchema);

        # Verifica se o Nome da Tabela foi informado corretamente
        do
        {
            # Verifica se foi informado um valor por padrao
            if (empty($this->table))
            {
                $this->table = $this->ask("Qual o nome da tabela referente ao model?");
            }

            # Verifica se tabela existe
            $existTable = $this->tableExists();

            # Solicita o nome correto da tabela.
            if (!$existTable)
            {
                $this->table = $this->ask("Nome da tabela invalido. Qual o nome correto?");
            }
        }
        while (!$existTable);

        # Pega o valor da PK
        $this->pk = $this->getPrimary();

        # tratamento das colunas
        $columns = $this->getColumns();

        foreach ($columns as $column)
        {
            $this->treatColumns($column);
        }

        $this->_template = str_replace("{{pk}}", $this->getPrimary(), $this->_template);
        $this->_template = str_replace("{{model}}", strtolower($model), $this->_template);
        $this->_template = str_replace("{{fields}}", json_encode($this->row_columns, JSON_PRETTY_PRINT), $this->_template);

        $path = app_path() . "\\..\\public\\js\\app\\model\\" . strtolower($nm_field) . ".model.js";

        $createFileModel = true;

        if (file_exists($path))
        {
            $createFileModel = $this->confirm("Deseja sobrescrever o arquivo : {$path}");
        }

        if ($createFileModel)
        {
            $file = fopen($path, 'w+');
            fputs($file, $this->_template);
            fclose($file);
            $this->info("Arquivo criado com sucesso. Local ({$path})");
        }
    }

    /**
     * Verifica se existe a schema/database
     * @return boolean se existe a tabela
     */
    private function schemaExists()
    {
        try {
            $result = DB::select($this->sql_schema_search, [$this->schema]);
            return $result[0]->total > 0;
        }
        catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Verifica se existe a tabela
     * @return boolean se existe a tabela
     */
    private function tableExists()
    {
        try {
            $result = DB::select($this->sql_table_search, [$this->schema, $this->table]);
            return $result[0]->total > 0;
        }
        catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Retorna as Colunas de uma determinada tabela.
     * @return array Retona array com objetos interno
     */
    private function getColumns()
    {
        try {
            $columns = DB::select($this->sql_get_columns, [$this->schema, $this->table]);
            return $columns;
        }
        catch (\Exception $e) {
            return array();
        }
    }

    /**
     * Retorna a PK de uma tabela.
     * @return string Retorna o nome da columa PK
     */
    private function getPrimary()
    {
        try {
            $columns = DB::select($this->sql_get_pkcolumns, [$this->schema, $this->table, 'PRI']);
            return (count($columns) > 0) ? $columns[0]->COLUMN_NAME : '';
        }
        catch (\Exception $e) {
            return '';
        }
    }

    /**
     * Tratar todas as colunas
     */
    private function treatColumns($column)
    {
        $nm_column = $column->COLUMN_NAME;
        $default_column = $column->COLUMN_DEFAULT;
        $isNullable = $column->IS_NULLABLE;
        $binder = null;
        $pk = $this->getPrimary();        

        switch ($column->DATA_TYPE)
        {
            case 'smallint' :            
            case 'int' :
                $c_type = 'number';
                $mxLenght = $column->NUMERIC_PRECISION;
                break;

            case 'decimal' :
                $c_type = "number";
                $binder = "number";
                $editor = "numericeditor";
                break;

            case 'enum' :
                $editor = 'dropdownlist';
                preg_match_all('~\'([^\']*)\'~', $column->COLUMN_TYPE, $matches);
                $values = array();

                foreach($matches[1] as $value){
                    $values[] = array(
                        "text" => $value,
                        "value" => $value,
                    );
                }

                $c_type = 'string';
                $mxLenght = $column->CHARACTER_MAXIMUM_LENGTH;
                break;
            
            case 'varchar' :
                $mxLenght = $column->CHARACTER_MAXIMUM_LENGTH;
                $c_type = 'string';
                break;

            case 'date' :
            case 'datetime' :
                $c_type = 'date';
                $editor = 'dateeditor';
                $binder = "date";
                $validator = 'datevalidator';
                $mxLenght = $column->CHARACTER_MAXIMUM_LENGTH;
                break;

            case 'text' :
                $c_type = 'text';
                $mxLenght = $column->CHARACTER_MAXIMUM_LENGTH;
                break;
            
            default :
                $c_type = '';
                $mxLenght = '';
                break;
        }

        if($column->COLUMN_NAME === 'idcidade') {
            $binder = 'city';
            $editor = 'cidadeeditor';
        }

        if($column->COLUMN_NAME === 'cpf' || 
            $column->COLUMN_NAME === 'cnpj' || 
             $column->COLUMN_NAME === 'cpf_cnpj' || 
              $column->COLUMN_NAME == 'cnpj_cpf') {
        
            $validator = "cpfcpnjvalidator";
            $table = $column->TABLE_NAME;
        }

        if(substr($column->COLUMN_NAME, 3) === 'nm_') {
            $validator = 'namevalidator';
        }

        $arrAux = array();

        !empty($c_type)    ? $arrAux['type'] = $c_type                                     : '';
        !empty($nm_column) ? $arrAux['title'] = ucfirst(str_replace("_", " ", $nm_column)) : '';
        !empty($mxLenght)  ? $arrAux['maxLength'] = $mxLenght                              : '';

        isset($values) && !empty($values) ? $arrAux['values'] = $values : '';
        isset($editor) && !empty($editor) ? $arrAux['editor'] = $editor : '';

        isset($default_column) && !empty($default_column)                    ? $arrAux['defaultValue'] = $default_column : $arrAux['defaultValue'] = null;
        isset($isNullable)     && !empty($isNullable) && $isNullable == "NO" ? $arrAux['required'] = true                : '';
        isset($binder)         && !empty($binder)                            ? $arrAux["binder"] = $binder               : '';
        isset($table)          && !empty($table)                             ? $arrAux["table"] = $table                 : '';
        isset($validator)      && !empty($validator)                         ? $arrAux["validator"] = $validator         : '';
        $column->COLUMN_NAME === 'situacao' || $column->COLUMN_NAME === $pk  ? $arrAux['readOnly'] = true                : ''; 
        
        $this->row_columns[$nm_column] = ($arrAux);
    }
}
