<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Repositories\Interfaces\IRepository;
use App\Repositories\Core\DbOperators;
use App\Repositories\Core\DbSortDirection;
use App\Models\Interfaces\IEntityDateTimeFields;

define('ITEMS_PER_PAGE', 15);
define('MAX_ITEMS_RESULT', 500);

class Repository implements IRepository {        
    protected $model;
    
    public $user;
    public $company = null;
    public $filter_user = false;    
    public $filter_pessoa = false;
    public $use_company = true;
    public $remove_company = true;
    public $add_company = true;
    public $output_sql = false;
    public $approvation = false;
    public $include_own_company = false;
    public $globalization = false;
    public $throw_exception_if_no_pk = true;
    
    public $user_field = 'idusuario_cadastro';
    public $company_field = 'idpessoa_empresa'; 
    public $company_table = "pessoas";
    public $approved_field = 'aprovado';
    public $output_sql_break_line = ' | ';
    public $date_column_prefix = "dt_";
    public $can_view_no_approved_record_permission = "podevisualizarcadastronaoaprovado";
    public $current_controller = "";
    public $current_action = "";
    
    public $lang = "pt-BR";
    public $lang_field = "idioma";
    public $field_to_translate = "nm";

    public function __construct(Model $model) {
        $this->model = $model;
    }
    
    private function isSpecialFilter($operator) {
        switch ($operator) {
            case DbOperators::Between:                
            case DbOperators::In:
            case DbOperators::NotIn:
            case DbOperators::WhereColumn:
            case DbOperators::WhereDate:
            case DbOperators::WhereDay:
            case DbOperators::WhereMonth:
            case DbOperators::WhereYear:
            case DbOperators::IsNull:
            case DbOperators::IsNotNull:
            case DbOperators::Exists:
                return true;                
            default:
                return false;                
        }
    }
    
    protected function addSpecialFilters($operator, $key, $value, $model = null){
        if($model == null) {
            $model = $this->model;
        }
        
        switch ($operator) {
            case DbOperators::Between:
                $model = $model->whereBetween($key, $value); //$value will be an array with two values
                break;
            case DbOperators::In:                
                $model = $model->whereIn($key, $value); //$value will be an array with many values
                break;
            case DbOperators::NotIn:
                $model = $model->whereNotIn($key, $value); //$value will be an array with many values
                break;
            case DbOperators::WhereColumn:
                $model = $model->whereColumn($key, $value); //$value will be a string
                break;
            case DbOperators::WhereDate:
                $model = $model->whereDate($key, $value); //$value will be a string
                break;
            case DbOperators::WhereDay:
                $model = $model->whereDay($key, $value); //$value will be a integer
                break;
            case DbOperators::WhereMonth:
                $model = $model->whereMonth($key, $value); //$value will be a integer
                break;
            case DbOperators::WhereYear:
                $model = $model->whereYear($key, $value); //$value will be a integer
                break;
            case DbOperators::IsNull:
                $model = $model->whereNull($key); //$value will be null
                break;
            case DbOperators::IsNotNull:
                $model = $model->whereNotNull($key); //$value will be null
                break;
            case DbOperators::Exists:
                $model = $model->whereExists($key, $value); //$value will be a Closure function
                break;                
        }
        
        return $model;
    }

    protected function addFilters($filters, $model = null) {
        $addKey = function($model, $key, $filter, $operator = null) {
            if(!strpos($key, '.')) {
                if($operator) {
                    $model = $model->where($key, $operator, $filter);                
                }
                else {
                    $model = $model->where($key, $filter);                
                }

                return $model;
            }

            $parts = collect(explode('.', $key));
            $last = $parts->pop();
            $join = $parts->implode('.');

            $this->operator = $operator;
            $this->filter = $filter;
            $this->last = $last;

            $model = $model->whereHas($join, function($query) {
                if($this->operator) {
                    $query->where($this->last, $this->operator, $this->filter);                
                }
                else {
                    $query->where($this->last, $this->filter);                
                }
            });

            return $model;
        };

        if($model == null){
            $model = $this->model;
        }
        
        if($filters == null || count($filters) == 0) {
            return $model;
        }        
        
        $keys = array_keys($filters);        
        
        foreach ($keys as $key) {
            $filter = $filters[$key];
            
            if(!is_array($filter)) {
                $model = $addKey($model, $key, $filter); 
                continue;
            }            
            
            $value = $filter['value'];
            $operator = $filter['operator'];        
            
            if($this->isSpecialFilter($operator)) {                
                $model = $this->addSpecialFilters($operator, $key, $value, $model);
            }
            else {
                $model = $addKey($model, $key, $value, $operator); //$value will be of any type
            }
        }
        
        return $model;
    }
    
    protected function addOrderBy($orderBy, $model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        if(empty($orderBy) || count($orderBy) == 0) {
            return $model;
        }
        
        $keys = array_keys($orderBy);

        foreach($keys as $orderColumn) {            
            $orderDir = $orderBy[$orderColumn];
            
            if($orderDir ==  null || $orderBy == '') {
                $orderDir = DbSortDirection::Ascending;
            }
                    
            $model = $model->orderBy($orderColumn, $orderDir);    
        }
               
        return $model;
    }
    
    protected function addPagination($page, $take, $model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        return $model->skip(($page - 1) * $take)
                     ->take($take);
    }
    
    protected function addSelectColumns($model, $columns) {
        $temp = $model;
        if($columns != null && count($columns) > 0) {            
            foreach ($columns as $column) {
                $temp = $temp->addSelect($column);
            }
            
            $this->outputSql($temp);            
        }
        
        return $temp;
    }
    
    protected function addWith($with, $model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        $ownWith = $with;
        
        if($ownWith === null) {            
            $ownWith = $model->getWiths();            
        }
        
        if(empty($ownWith) || count($ownWith) == 0) {
            return $model;
        }
        
        return $model->with($ownWith);
    }
    
    protected function outputSql($model) {
        if($this->output_sql == true){
            echo $model->toSql() . $this->output_sql_break_line;
        }
    }
    
    protected function formatPageResult($total, $data) {
        $result = new \stdClass();
        $result->total = $total;
        $result->data = $data;
        return $result;
    }
    
    protected function addUserSelect($model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        return $model->whereRaw("( ({$this->user_field} = {$this->user}) or (f_is_usuario_administrador({$this->user}) = 'S') )");                    
    }
    
    /**
     * Adiciona o tipo da pessoa na consulta
     * @param Model $model
     * @return retorna o Builder com where
     */
    protected function addTipoPessoa($model = null) {
        if($model == null) {
            $model = $this->model;
        }

        return $model->where('idtipo_entidade', '=', $this->idtipo_entidade);
    }

    protected function addCompany($model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        $table = $this->model->getTable();
        
        if($table !== $this->company_table || !$this->include_own_company) {
            return $model->where($this->company_field, '=', $this->company);
        }
        
        $pk = $this->model->getPrimaryKeyName();
        
        $sql = " ( ({$this->company_field} = {$this->company}) or " .
               "   ({$pk} = {$this->company}) ) ";
               
        return $model->whereRaw($sql);
    }
    
    protected function addApproved($model = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        return $model->whereRaw("(
            (f_usuario_possui_permissao_modulo_objeto(null, '{$this->can_view_no_approved_record_permission}', {$this->user}) = 'S' and aprovado in ('P', 'S', 'N')) or
            (aprovado = 'S')
        )");
    }
    
    protected function processGlobalization($model = null, $single = false, $id = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        $process = function(&$entity) {
            if(empty($entity) || empty($entity->texto)) {
                return;
            }
            
            $texto_idioma = $entity->texto
                                   ->texto_idiomas
                                   ->where($this->lang_field, '=', $this->lang)
                                   ->first();
            
            if(empty($texto_idioma)) {
                return;
            }
            
            $entity[$this->field_to_translate] = $texto_idioma->texto;
        };
        
        if($single) {
            $result = $model->find($id);
            $process($result);
            return $result;
        }
        
        $result = $model->get();
        
        foreach ($result as $entity) {
            $process($entity);
        }
        
        return $result;
    }
    
    protected function saveGlobalization($entity) {
        $class  = get_class($entity);
        $lang   = $this->lang;
        $field  = $this->field_to_translate;
        $idtext = $entity['idtexto'];
        $text   = $entity[$this->field_to_translate];
        
        
        if(!empty($idtext)) {            
            $sql = <<<SQL
select count(*) as total
  from texto_idiomas
 where idtexto = ?
   and idioma  = ?
SQL;
            
            $result = DB::select($sql, [$idtext, $lang]);
            
            if($result[0]->total > 0) {
                DB::table('texto_idiomas')
                  ->where('idtexto', '=', $idtext)
                  ->where('idioma',  '=', $lang)
                  ->update([ 'texto' => $text ]);
            }
            else {
                DB::table('texto_idiomas')->insert([
                    'idtexto' => $idtext,
                    'idioma'  => $lang,
                    'texto'   => $text
                ]);
            }
            return;
        }
        
        $id = DB::table('textos')->insertGetId([
            'nm_texto'           => $class . "::" .$field,
            'idusuario_cadastro' => $this->user
        ]);

        DB::table('texto_idiomas')->insert([
            'idtexto' => $id,
            'idioma'  => $lang,
            'texto'   => $text
        ]);
        
        $table = $this->model->getTable();
        $primaryKey = $this->model->getPrimaryKeyName();
        
        DB::table($table)
          ->where($primaryKey, '=', $entity[$primaryKey])
          ->update([ 'idtexto' => $id ]);
    }

    /**
    * Return then underlying model used by    
    */
    public function getModel() {
        return $this->model;
    }    

    /** 
     * Verify if the authenticated user is a administrator
     * 
     * @param object $user The authenticated user. Can be only the the id or a object with the user informations.
     * @return bool True if is a administrator. Otherwise, returns false.
     */
    public function administrator($user) {
        $user_id = null;
        
        if(is_int($user)) {
            $user_id = $user;
        }
        else if($user instanceof Usuarios) {
            $user_id = $user->idusuario;
        }
        
        $result = DB::select('select f_is_usuario_administrador(?) as admin', [$user_id]);
        return $result[0]->admin == 'S';
    }    

    /**
    * Count the records based on filters results
    * @param array $filters The filters to filter the results
    * @return int The result count
    */
    public function countRecords($filters = null, $model = null, $modifier = null, $arguments = null) {
        if($model == null) {
            $model = $this->model;
        }
        
        $model = $this->addFilters($filters, $model);
        
        if($this->filter_pessoa) {
            $model = $this->addTipoPessoa($model);
        }

        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }

        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        return $model->count();
    }

    /**
     * Save a new instance of the entity passed by parameter.
     * The entity should be a \Illuminate\Database\Eloquent\Model that
     * implements the \App\Models\Interfaces\IEntity interface.
     * 
     * @param array $values A array with columns and values to be inserted or updated.
     * @return \Illuminate\Database\Eloquent\Model a updated instance of the model
     */
    public function save($values, $resolveWiths = false) {
        if($this->use_company) {
            if(empty($this->company) || !isset($this->company)) {
                throw new \App\Exceptions\RegraNegocioException(__('messages.nocompanyselected'));
            }
        }   

        $primaryKey = $this->model->getPrimaryKeyName();
        
        if($primaryKey == null || $primaryKey == '') {
            if($this->throw_exception_if_no_pk) {
                throw new \Exception(__('messages.noprimarykey', [ 'model' => get_class($this->model) ]));
            }
        }        

        if($this->use_company && $this->add_company) {
            $values[$this->company_field] = $this->company;
        }
        else if($this->remove_company) {
            unset($values[$this->company_field]);
        }
        
        if(!array_key_exists($primaryKey, $values)) {
            $entity = $this->model->create($values);

            if($resolveWiths) {
                $withs = $this->model->getWiths();
                $entity = $this->model->with($withs)->find($entity->$primaryKey);
            }

            return $entity;
        }

        $keyValue = $values[$primaryKey];
        $previous = null;
        
        if($keyValue != null || $keyValue > 0) {
            $previous = $this->model->find($keyValue);
            array_shift($values);
        }
        
        if($this->model instanceof IEntityDateTimeFields) {
            $dateFields = $this->model->getDateTimeFields();
            
            foreach ($dateFields as $dateField) {
                if(!array_key_exists($dateField, $values)) {
                    continue;
                }

                $value = $values[$dateField];

                if($value === null || $value === 'null') {
                    $values[$dateField] = null;
                    continue;
                }
                
                $date = new \DateTime($value);
                $values[$dateField] = $date->format('Y-m-d H:i:s');
            }
        }

        $keys = array_keys($values);

        foreach($keys as $key) {
            $value = $values[$key];
            
            if($value === 'null' || $value === 'undefined') {
                $values[$key] = null;
            }
        }

        if(empty($primaryKey) || !isset($primaryKey)) {

            if($resolveWiths) {
                $withs = $this->model->getWiths();
                $entity = $this->model->with($withs)->save($values);
            }
            else {
                $entity = $this->model->save($values);
            }

            if($this->globalization) {
                $this->saveGlobalization($entity);
            }

            return $entity;
        }

        if($resolveWiths) {
            $withs = $this->model->getWiths();
            $entity = $this->model->with($withs)->updateOrCreate(
                [$primaryKey => $keyValue],
                $values
            );
        }
        else {
            $entity = $this->model->updateOrCreate(
                [$primaryKey => $keyValue],
                $values
            );
        }
        
        if($this->globalization) {
            $this->saveGlobalization($entity);
        }        
        
        return $entity;
    }
    
    /**
     * Applies multiple updates using the $filters parameter to filter the records
     * and $updates parameter to update the specified columns with the new values.
     * 
     * @param array $filters The filters that will be used to filter the records.
     * 
     * The structure of the $filter array must be: 
     * [ 'column_name' => value ] or 
     * [ 
     *     'column_name' => [ 
     *         'value'    => value, 
     *         'operator' => operator to use in the query (use DbOperators enum to see all operators)
     *     ] 
     * ]
     * 
     * @param array $updates The columns with values to update data into the table.    
     */
    public function massUpdate($filters, $updates) {
        $model = $this->addFilters($filters); 
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        $model->update($updates);
    }
    
    /**
     * Delete the record fetched by the $id passed by parameter.
     * 
     * @param object $id The primary key value to retrieve the record. Can be any type.
     */
    public function delete($id){
        $result = $this->model->find($id);
        $previous = json_decode($result->toJson());
        $count = $this->model->destroy($id);
       
        return $count > 0;
    }

    /** 
     * Delete all records that matchs the filters passed.
     * 
     * @param array $filtes The filters will be used to filter the rows.
     */
    public function massDelete($filters) {
        $model = $this->addFilters($filters);
        $deletedRows = $model->delete();
        return $deletedRows > 0;
    }
    
    /**
     * Activate a record. Put 'A' in status column.
     * 
     * @param object $id The primary key value to retrieve the record. Can be any type.
     */
    public function activate($id){
        $table = $this->model->getTable();        
        $primaryKey = $this->model->getPrimaryKeyName();
        $values = array();
        
        $values = [ 'situacao' => 'A' ];        
                
        $count = DB::table($table)
                   ->where($primaryKey, $id)
                   ->update($values) > 0;

        return $count > 0;
    }
    
    /**
     * Inactivate a record. Put 'I' in status column.
     * 
     * @param object $id The primary key value to retrieve the record. Can be any type.
     */
    public function inactivate($id) {
        $table = $this->model->getTable();        
        $primaryKey = $this->model->getPrimaryKeyName();
        $values = array();
        
        $values = [ 'situacao' => 'I' ];
        
        $count = DB::table($table)
                   ->where($primaryKey, $id)
                   ->update($values) > 0;

        return $count > 0;
    }
    
    /**
     * Get all records in the table.
     * 
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */    
    public function getAll($with = null, $columns = null, $modifier = null, $arguments = null){
        $model = $this->addWith($with);
        $model = $this->addSelectColumns($model, $columns);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $model = $model->take(MAX_ITEMS_RESULT);
        $this->outputSql($model);
        
        if($this->globalization) {
            return $this->processGlobalization($model);            
        }

        return $model->get();
    }
    
    /**
     * Get all records in the table applying data pagination to them. The current page is automatically
     * detected by the laravel framework.
     *      
     * @param int $page The number of the page starting by 1.
     * @param int $take The number of records will be returned by page.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     *      
     */
    public function getAllWithPagination($page, $take = ITEMS_PER_PAGE, $with = null, $columns = null, $modifier = null, $arguments = null){        
        $total = $this->countRecords(null, null, $modifier, $arguments);        
        $model = $this->addWith($with);
        $model = $this->addSelectColumns($this->addPagination($page, $take, $model), $columns);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $this->outputSql($model);
        $data = null;
        if($this->globalization) {
            $data = $this->processGlobalization($model);
        }
        else {
            $data = $model->get();
        }
        
        
        return $this->formatPageResult($total, $data);
    }
    
    /**
     * Get all records in the table applying ordering them according the
     * orders by passed. The current page is automatically detected by the laravel framework.
     * 
     * @param array $orderBy The order by column [colmun_name => direction]     
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function getAllWithOrderBy($orderBy, $with = null, $columns = null, $modifier = null, $arguments = null) {
        $model = $this->addWith($with);
        $model = $this->addSelectColumns($this->addOrderBy($orderBy, $model), $columns);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $model = $model->take(MAX_ITEMS_RESULT);
        $this->outputSql($model);
        
        if($this->globalization) {
            return $this->processGlobalization($model);            
        }
        
        return $model->get();
    }
    
    /**
     * Get all records in the table applying data pagination to them and ordering them according the
     * orders by passed. The current page is automatically detected by the laravel framework.
     * 
     * @param array $orderBy The order by column [colmun_name => direction]
     * @param int $page The number of the page starting by 1.
     * @param int $take The number of records will be returned by page.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function getAllWithPaginationAndOrderBy($orderBy, $page, $take = ITEMS_PER_PAGE, $with = null, $columns = null, $modifier = null, $arguments = null) {        
        $total = $this->countRecords(null, null, $modifier, $arguments);
        
        $model = $this->addWith($with);
        
        $model = $this->addSelectColumns(
            $this->addPagination(
                $page, 
                $take, 
                $this->addOrderBy($orderBy, $model)
            ), 
            $columns
        );
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }

        if($this->use_company) {
            $model = $this->addCompany($model);
        }

        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
                
        $this->outputSql($model);
        $data = null;
        
        if($this->globalization) {
            $data = $this->processGlobalization($model);
        }
        else {
            $data = $model->get();
        }
        
        return $this->formatPageResult($total, $data);
    }
    
    /**
     * Get a single record filtered by your primary key id.
     * 
     * @param object $id The primary key value to retrieve the record. Can be any type.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function getById($id, $with = null, $columns = null){
        $model = $this->addWith($with);        
        $model = $this->addSelectColumns($model, $columns);

        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        $this->outputSql($model);
        
        if($this->globalization) {
            return $this->processGlobalization($model, true, $id);
        }
        
        return $model->find($id);
    }
    
    /**
     * Filter records in the database using specified filters
     * 
     * @param array $filters The filters that will be used to filter the records.
     * 
     * The structure of the $filter array must be: 
     * [ 'column_name' => value ] or 
     * [ 
     *     'column_name' => [ 
     *         'value'    => value, 
     *         'operator' => operator to use in the query (use DbOperators enum to see all operators)
     *     ] 
     * ]
     * 
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function filter($filters, $with = null, $columns = null, $modifier = null, $arguments = null){
        $model = $this->addWith($with);        
        $model = $this->addSelectColumns($model, $columns);        
        $model = $this->addFilters($filters, $model);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $model = $model->take(MAX_ITEMS_RESULT);
        $this->outputSql($model);   
        
        if($this->globalization) {
            return $this->processGlobalization($model);            
        }
        
        return $model->get();
    }
    
    /**
     * Filter records in the database using specified filters and ordering them.
     * 
     * @param array $filters The filters that will be used to filter the records.
     * @param array $orderBy The columns to order by.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function filterWithOrderBy($filters, $orderBy, $with = null, $columns = null, $modifier = null, $arguments = null) {
        $model = $this->addWith($with);        
        $model = $this->addSelectColumns($model, $columns);        
        $model = $this->addFilters($filters, $model);                 
        $model = $this->addOrderBy($orderBy, $model);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $model = $model->take(MAX_ITEMS_RESULT);
        $this->outputSql($model);
        
        if($this->globalization) {
            return $this->processGlobalization($model);            
        }
        
        return $model->get();
    }
    
    /**
     * Filter records in the database using specified filters and applying data pagination. The current page is automatically
     * detected by the laravel framework.
     * 
     * @param array $filters The filters that will be used to filter the records.
     * @param int $page The number of the page starting by 1.
     * @param int $take The number of records will be returned by page.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function filterWithPagination($filters, $page, $take = ITEMS_PER_PAGE, $with = null, $columns = null, $modifier = null, $arguments = null){
        $total = $this->countRecords($filters, null, $modifier, $arguments);
        
        $model = $this->addWith($with);        
        $model = $this->addSelectColumns($model, $columns);        
        $model = $this->addFilters($filters, $model);
        $model = $this->addPagination($page, $take, $model);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->use_company) {
            $model = $this->addCompany($model);
        }
        
        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
        
        $this->outputSql($model);
        $data = null;
        
        if($this->globalization) {
            $data = $this->processGlobalization($model);            
        }
        else {
            $data = $model->get();
        }
        
        return $this->formatPageResult($total, $data);
    }    
    
    /**
     * Filter records in the database using specified filters and ordering them, applying the data pagination. The current page is automatically
     * detected by the laravel framework.
     * 
     * @param array $filters The filters that will be used to filter the records.
     * @param array $orderBy The columns to order by.    
     * @param int $page The number of the page starting by 1. 
     * @param int $take The number of records will be returned by page.
     * @param array $columns An array with the columns to be selected. Null or empty array will return all columns.
     */
    public function filterWithPaginationAndOrderBy($filters, $orderBy, $page, $take = ITEMS_PER_PAGE, $with = null, $columns = null, $modifier = null, $arguments = null) {
        $total = $this->countRecords($filters, null, $modifier, $arguments);
        
        $model = $this->addWith($with);
        $model = $this->addSelectColumns($model, $columns);
        $model = $this->addFilters($filters, $model);
        $model = $this->addOrderBy($orderBy, $model);
        $model = $this->addPagination($page, $take, $model);
        
        if($this->filter_user) {
            $model = $this->addUserSelect($model);
        }
        
        if($this->filter_pessoa) {
            $model = $this->addTipoPessoa($model);
        }        

        if($this->use_company) {
            $model = $this->addCompany($model);
        }

        if($this->approvation) {
            $model = $this->addApproved($model);
        }
        
        if(!empty($modifier)) {
            if(empty($arguments)) {
                $arguments = [];
            }
            
            $arguments['company'] = $this->company;            
            $model = $modifier($this, $model, $arguments);
        }
                
        $this->outputSql($model);
        $data = null;
        
        if($this->globalization) {
            $data = $this->processGlobalization($model);
        }
        else {
            $data = $model->get();
        }
        
        return $this->formatPageResult($total, $data);
    }

    /**
     * Return the SQL generated by the Eloquent Model
     */
    public function toSql() {
        return $this->model->toSql();
    }
    
    public function verifyIfExists($filters) {
        $filter_user = $this->filter_user;
        $this->filter_user = false;
        $result = $this->filter($filters);
        $this->filter_user = $filter_user;
        
        if(!$result || $result->count() == 0) {
            return false;
        }
        
        return $result->first()->getKey();
    }

    public function approve($id, $type = null, $returnObject = false) {
        $table = $this->model->getTable();        
        $primaryKey = $this->model->getPrimaryKeyName();
        $values = array();
        
        $values = [
            'aprovado' => 'S'
        ];
        
        $previous = $this->model->find($id);
        
        $count = DB::table($table)
                   ->where($primaryKey, $id)
                   ->update($values) > 0;
        
        return $count > 0;
    }

    public function disapprove($id, $negative, $reason, $type = null) {
        $table = $this->model->getTable();        
        $primaryKey = $this->model->getPrimaryKeyName();
        $values = array();
        
        $values = [ 'aprovado' => 'N' ];
        
        $previous = $this->model->find($id);

        $count = DB::table($table)
                   ->where($primaryKey, $id)
                   ->update($values) > 0;

        return $count > 0;        
    }
}