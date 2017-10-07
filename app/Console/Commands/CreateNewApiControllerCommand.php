<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateNewApiControllerCommand extends Command
{
    protected $template = <<<CON
<?php

namespace {controller_namespace};

use Illuminate\Http\Request;
use {repository_namespace}\I{repository};

class {controller} extends ApiController
{
    public function __construct(I{repository} \$repository) {
        \$this->middleware('auth');
        \$this->repository = \$repository;
    }
}            
CON;

    protected $defaultRepository = "Repository";
    protected $defaultControllerNamespace = "App\Http\Controllers";
    protected $defaultRepositoryInterfaceNamespace = "App\Repositories\Interfaces";

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:apicontroller {controller} {--r|repository= : The repository will be used by the controller.} {--rn|repository-namespace= : The repository namespace interface.} {--cn|controller-namespace= : The controller namespace.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a new API Controller.';

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
        $controller          = $this->argument('controller');
        $repository          = $this->option('repository');
        $repositoryNamespace = $this->option('repository-namespace');
        $controllerNamespace = $this->option('controller-namespace');
        
        if($repositoryNamespace == null || $repositoryNamespace == '') {
            $repositoryNamespace = $this->defaultRepositoryInterfaceNamespace;
        }
        
        if($controllerNamespace == null || $controllerNamespace == '') {
            $controllerNamespace = $this->defaultControllerNamespace;
        }
        
        if($repository == null || $repository == '') {
            $repository = $this->defaultRepository;
        }
        
        $path = app_path() . "\\Http\\Controllers\\" . $controller . ".php";
        
        $file = fopen($path, 'w+');
        $temp = str_replace('{controller_namespace}', $controllerNamespace, $this->template);
        $temp = str_replace('{repository_namespace}', $repositoryNamespace, $temp);
        $temp = str_replace('{repository}',           $repository,          $temp);
        $temp = str_replace('{controller}',           $controller,          $temp);
        
        fputs($file, $temp);
        fclose($file);
        
        $this->info('API Controller create successfully.');
    }
}
