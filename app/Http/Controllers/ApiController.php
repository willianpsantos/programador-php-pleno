<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\QueryException;

use App\Sorts\Sort;
use App\Filters\FilterContainer;
use App\Sorts\RequestSortToEloquentSortParser;
use App\Filters\RequestFilterToEloquentFilterParser;
use App\Repositories\Core\Log;
use App\Exceptions\RegraNegocioException;

class ResponseType {
    const JSON = "json";
    const VIEW = "view";
}

class ApiController extends Controller {

    protected $responseType = ResponseType::JSON;    
    protected $modifier;
    protected $columns = null;
    protected $resolveWiths = false;

    protected $views = [
        'getAll' => null,
        'getData' => null,
        'getById' => null,
        'postData' => null,
        'deleteData' => null,
        'activateData' => null,
        'inactivateData' => null,
        'approveData' => null,
        'disapproveData' => null
    ];

    protected $routes = [
        'getAll' => null,
        'getData' => null,
        'getById' => null,
        'postData' => null,
        'deleteData' => null,
        'activateData' => null,
        'inactivateData' => null,
        'approveData' => null,
        'disapproveData' => null
    ];

    protected function getFiltersAndSorts(Request $request) {
        $filters = FilterContainer::extractFromRequest($request);
        $sorts = Sort::extractFromRequest($request);
        $dbFilters = null;
        $dbSorts = null;
        
        if($filters != null) {
            $filterParser = new RequestFilterToEloquentFilterParser();
            $dbFilters = $filterParser->parse($filters);
        }
        
        if($sorts != null) {
            $sortParser = new RequestSortToEloquentSortParser();
            $dbSorts = $sortParser->parse($sorts);
        }

        $result = new \stdClass;
        $result->filters = $dbFilters;
        $result->sorts   = $dbSorts;

        return $result;
    }

    protected function filter(Request $request, $pagination = true) {
        $fs = $this->getFiltersAndSorts($request);

        if($pagination) {
            $result = $this->repository->filterWithPaginationAndOrderBy(
                $fs->filters, 
                $fs->sorts, 
                $request->page,
                $request->take,
                null,
                $this->columns,
                $this->modifier
            );
        }
        else {
            $result = $this->repository->filterWithOrderBy(
                $fs->filters, 
                $fs->sorts, 
                null, 
                $this->columns,
                $this->modifier
            );
        }

        return $result;
    }

    protected function formatFilterResult(Request $request, $result, $view = null) {
        $type = $this->getResponseType($request);

        switch ($type) {
            case ResponseType::VIEW:
                if (isset($this->views[$view]) && !empty($this->views[$view])){
                    return view($this->views[$view], [ 'result' => $result ]);
                } 

                return  redirect()->route($this->routes[$view], [ 'result' => $result ]);

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }

    protected function getResponseType(Request $request) {
        $header = $request->header('X-RESPONSE-TYPE');

        if(empty($header)) {
            return $this->responseType;
        }

        return $header;
    }

    protected function treatException(\Exception $ex) {
        $message = "";
        
        if($ex instanceof RegraNegocioException) {                  
            $message = $ex->getMessage();
        }
        else {            
            $env = env('APP_ENV', 'dev');

            if(strpos($env, 'dev') !== false || strpos($env, 'test') !== false) {
                throw $ex;
            } 
            
            $message = __('messages.errorsave');
        }

        return $message;
    }

    protected function resolveData(Request $request) {
        $data = null;
        $values = null;
        
        if(empty($this->dataResolver)) {
            $data = $request->data;
			
			if(empty($data)) {
                $data = $request->all();
            }

            $values = (array) $data;
        }
        else {
            $values = $this->dataResolver->getData($request);
        }

        return $values;
    }

    protected function save(Request $request) {
        $values = $this->resolveData($request);        
        $entity = $this->repository->save($values, $this->resolveWiths);
        return $entity;
    }
    
    protected function remove(Request $request) {
        $result = new \stdClass();        
        $id = $request->id;

        try {
            $success = $this->repository->delete($id);
            $result->success = $success;
            if($success) {
                $result->message = __('messages.deletesuccess');
            }
        }
        catch(\Exception $ex) {            
            $result->success = false;
            $result->message = $this->treatException($ex);
        }

        return $result;
    }
    
    protected function searchById(Request $request) {
        $id = $request->id;

        if(empty($id) || $id === 0) {
            return null;
        }

        $entity = $this->repository->getById($id);
        return $entity;
    }


    /**********************************************************************************/
    /*                                      ACTIONS                                   */
    /**********************************************************************************/
    public function getAll(Request $request) {
        try {        
            $data = $this->filter($request, false);  

            $result = new \StdClass;
            $result->data = $data;
            $result->total = count($data);

            return $this->formatFilterResult($request, $result, 'getAll');
        }
        catch(RegraNegocioException $rx) {
            $result = new \stdClass;
            $result->success = false;
            $result->message = $rx->getMessage();

            return response()->json($result);
        }
    }
    
    public function getData(Request $request) {
        try {        
            $result = $this->filter($request);        

            return $this->formatFilterResult($request, $result, 'getData');
        }
        catch(RegraNegocioException $rx) {
            $result = new \stdClass;
            $result->success = false;
            $result->message = $rx->getMessage();

            return response()->json($result);
        }
    }

    public function getDataReturningView(Request $request) {                
        $result = $this->repository->getAllWithPagination(
            $request->page,
            $request->take,
            null,
            $this->columns,
            $this->modifier
        );
               
        return view($this->views['getData'], [ 
            'result' => $result,
            'menus'  => Cache::get("{$this->module}.menus"),
            'module' => $this->module
        ]);
    }

    public function paginate(Request $request) {
        $model = $this->repository->getModel();

        $paginator = $model->paginate($request->take);

        return view($this->views['getData'], [ 
            'result' => $paginator,
            'menus' => Cache::get("{$this->module}.menus"),
            "module" => $this->module
        ]);
    }
    
    public function getById(Request $request) {        
        $type = $this->getResponseType($request);
        $entity = $this->searchById($request);

        switch ($type) {
            case ResponseType::VIEW:
                $values = $entity;

                if(empty($values)) {
                    $values = [];
                }

                $menus = Cache::get("{$this->module}.menus");                
                $request->session()->flash('menus', $menus);
                $request->session()->flash('module', $this->module);

                if (isset($this->routes['getById']) && !empty($this->routes['getById'])){
                    return redirect()->route($this->routes['getById'],  $values );                    
                }

                return view($this->views['getById'], compact('values'));
            case ResponseType::JSON:
            default:
                return response()->json($entity);
        }
    }

    public function postData(Request $request) {
        $type = $this->getResponseType($request);
        $result = new \stdClass;

        try {
            try {            
                $this->repository->current_controller = get_class($this);
                $this->repository->current_action = __FUNCTION__;

                $entity = $this->save($request);        
                $result->success = true;
                $result->entity = $entity;
            }
            catch(RegraNegocioException $rx) {
                $result->success = false;
                $result->message = $rx->getMessage();
            }
        } 
        catch(\Exception $ex) {
            $result->success = false;
            $result->message = $this->treatException($ex);
        }

        switch ($type) {            
            case ResponseType::VIEW:
                $pk_entity = $entity->getKeyName();
                $request->session()->flash('result', $result);

                if (isset($this->views['postData']) && !empty($this->views['postData'])){
                    return view($this->views['postData'], $entity->$pk_entity);
                } 

                return  redirect()->route($this->routes['postData'],  $entity->$pk_entity );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
    
    public function deleteData(Request $request) {
        $type = $this->getResponseType($request);
        $result = $this->remove($request);

        switch ($type) {
            case ResponseType::VIEW:
                if (isset($this->views['deleteData']) && !empty($this->views['deleteData'])){
                    return view($this->views['deleteData'], [ 'result' => $result ]);
                } 

                return  redirect()->route($this->routes['deleteData'],  [ 'result' => $result ] );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
    
    public function activateData(Request $request) {
        $type = $this->getResponseType($request);
        $result = new \stdClass();
        $id = $request->id;

        try {
            try {
                $this->repository->setLogger($this->getLogger());
                $this->repository->current_controller = get_class($this);
                $this->repository->current_action = __FUNCTION__;
                $this->repository->user = $request->user()->idusuario;

                $success = $this->repository->activate($id);
                $result->success = $success;

                if($success) {
                    $result->message = __('messages.activate');
                }
            }
            catch(RegraNegocioException $rx) {
                $result->success = false;
                $result->message = $rx->getMessage();
            }
        } 
        catch(\Exception $ex) {
            $result->success = false;
            $result->message = $this->treatException($ex);
        }

        switch ($type) {
            case ResponseType::VIEW:
                
                if (isset($this->views['activateData']) && !empty($this->views['activateData'])){
                    return view($this->views['activateData'], [ 'result' => $result ]);
                }

                return redirect()->route($this->routes['activateData'],  [ 'result' => $result ] );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
    
    public function inactivateData(Request $request) {
        $type = $this->getResponseType($request);
        $result = new \stdClass();
        $id = $request->id;

        try {
            try {
                $this->repository->setLogger($this->getLogger());
                $this->repository->current_controller = get_class($this);
                $this->repository->current_action = __FUNCTION__;
                $this->repository->user = $request->user()->idusuario;

                $success = $this->repository->inactivate($id);
                $result->success = $success;

                if($success) {
                    $result->message = __('messages.inactivate');
                }
            }
            catch(RegraNegocioException $rx) {
                $result->success = false;
                $result->message = $rx->getMessage();
            }
        }
        catch(\Exception $ex) {
            $result->success = false;
            $result->message = $this->treatException($ex);
        }

        switch ($type) {
            case ResponseType::VIEW:
                if (isset($this->views['inactivateData']) && !empty($this->views['inactivateData'])){
                    return view($this->views['inactivateData'], [ 'result' => $result ]);
                }

                return  redirect()->route($this->routes['inactivateData'],  [ 'result' => $result ] );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
    
    public function approveData(Request $request) {
        $type = $this->getResponseType($request);
        $id = $request->id;
        
        $this->repository->user = $request->user()->idusuario;
        $this->repository->current_controller = get_class($this);
        $this->repository->current_action = __FUNCTION__;        
        $this->repository->setLogger($this->getLogger());

        $success = $this->repository->approve($id);
        
        $result = new \stdClass();
        $result->success = $success;

        switch ($type) {
            case ResponseType::VIEW:
                if (isset($this->views['approveData']) && !empty($this->views['inactiapproveDatavateData'])){
                    return view($this->views['approveData'], [ 'result' => $result ]);
                }

                return  redirect()->route($this->routes['approveData'],  [ 'result' => $result ] );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
    
    public function disapproveData(Request $request) {
        $type     = $this->getResponseType($request);
        $id       = $request->id;
        $negative = $request->negative;
        $reason   = $request->reason;        

        $this->repository->user = $request->user()->idusuario;
        $this->repository->current_controller = get_class($this);
        $this->repository->current_action = __FUNCTION__;
        
        $this->repository->setLogger($this->getLogger());
        $success = $this->repository->disapprove($id, $negative, $reason);
        
        $result = new \stdClass();
        $result->success = $success;

        switch ($type) {
            case ResponseType::VIEW:
                if (isset($this->views['disapproveData']) && !empty($this->views['disapproveData'])){
                    return view($this->views['disapproveData'], [ 'result' => $result ]);
                }

                return  redirect()->route($this->routes['disapproveData'],  [ 'result' => $result ] );

            case ResponseType::JSON:
            default:
                return response()->json($result);
        }
    }
}