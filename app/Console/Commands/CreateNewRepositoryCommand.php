<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateNewRepositoryCommand extends Command
{
    protected $template = <<<REP
<?php

namespace {repository_namespace};

use {model_namespace}\\{model};        
use {interface_namespace}\\I{repository};

class {repository} extends Repository implements I{repository} {
    public function __construct({model} \$model) {
        parent::__construct(\$model);
    }
}
REP;
    
    protected $interfaceTemplate = <<<INTERFACE
<?php

namespace {interface_namespace};

interface I{repository} extends IRepository {
    //
}        
INTERFACE;
    
    protected $defaultModelNamespace = "App\\Models";
    protected $defaultRepositoriesNamespace = "App\\Repositories";
    protected $defaultRepositoriesInterfacesNamespace = "App\\Repositories\\Interfaces";

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {repository} {--m|model= : The model that will be used in the repository.} {--rn=|repository-namespace= : The new namespace for the repository class.} {--mn|model-namespace= : The new namespace for the model class.} {--in|interface-namespace= : The new namespace of the repository interface.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new model repository';

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
     * Create the repository interface that will be used for the
     * Dependency Injection.
     */
    protected function createInterface($repository, $interfaceNamespace){        
        $this->info("Building {$repository} interface...");
        $path = app_path() . "\\Repositories\\Interfaces\\I".$repository.".php";
        
        $file = fopen($path, 'w+');
        $temp = str_replace('{repository}', $repository, $this->interfaceTemplate);
        $temp = str_replace('{interface_namespace}', $interfaceNamespace, $temp);
        
        fputs($file, $temp);
        fclose($file);
        
        $this->info('Repository interface create successfully.');
    }
    
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $repository          = $this->argument('repository');
        $model               = $this->option('model');
        $repositoryNamespace = $this->option('repository-namespace');
        $modelNamespace      = $this->option('model-namespace');
        $interfaceNamespace = $this->option('interface-namespace');
        
        if($model == null || $model == ''){
            $model = 'Model';
        }
        
        if($repositoryNamespace == null || $repositoryNamespace == '') {
            $repositoryNamespace = $this->defaultRepositoriesNamespace;
        }
        
        if($modelNamespace == null || $modelNamespace == '') {
            $modelNamespace = $this->defaultModelNamespace;
        }
        
        if($interfaceNamespace == null || $interfaceNamespace == ''){
            $interfaceNamespace = $this->defaultRepositoriesInterfacesNamespace;
        }
        
        if(!class_exists("{$modelNamespace}\\{$model}")) {
            $this->info("Model class {$modelNamespace}\\{$model} do not exists.");
            exit;
        }
        
        $this->info("Building {$repository}...");
        $path = app_path() . "\\Repositories\\".$repository.".php";
        
        $file = fopen($path, 'w+');
        $temp = str_replace('{repository}',           $repository,          $this->template);
        $temp = str_replace('{model}',                $model,               $temp);
        $temp = str_replace('{repository_namespace}', $repositoryNamespace, $temp);
        $temp = str_replace('{model_namespace}',      $modelNamespace,      $temp);
        $temp = str_replace('{interface_namespace}',  $interfaceNamespace,  $temp);
        
        fputs($file, $temp);
        fclose($file);
        
        $this->createInterface($repository, $interfaceNamespace);
        
        $this->info('Repository create successfully.');
    }
}
