<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    protected $repository;
    protected $dataResolver;
    public static $rootUrl;
    
    public static function getFileInfo($file) {        
        $splFileInfo = $file->getFileInfo();
        $splFileObject = $splFileInfo->openFile('r+');
        $size = $splFileInfo->getSize();        
        $splFileObject->fseek(0);
        $data = $splFileObject->fread($size);
        //$buffer = unpack('N', $data);
        
        $extension = $splFileInfo->getExtension();
        
        $result = new \stdClass();
        $result->extension = $extension;
        $result->buffer = $data;
        
        return $result;
    }
    
    protected function getCompany($onlyId = true) {
        $company = session('company');
        
        if(is_int($company)) {
            return $company;
        }
        
        if(is_object($company)) {            
            if($onlyId) {
                return $company->idpessoa;
            }

            return $company;
        }
        
        return null;
    }
    
    protected function getLang() {
        return session('lang');
    }
}
