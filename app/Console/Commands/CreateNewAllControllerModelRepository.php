<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use \Illuminate\Support\Facades\Artisan;

class CreateNewAllControllerModelRepository extends Command {

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:allbackend {name_all?} '
            . '{--t|table= : A tabela que o model mapeará.} '
            . '{--s|schema= : O schema/database que contem a tabela.} '
            . '{--r|repository= : The repository will be used by the controller.} '
            . '{--rn|repository-namespace= : The repository namespace interface.} '
            . '{--cn|controller-namespace= : The controller namespace.} '
            . '{--mn|model-namespace= : The new namespace for the model class.} '
            . '{--in|interface-namespace= : The new namespace of the repository interface.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Criar ApiController ApiModel Repository';

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
        // Argument + Option
        $name_all = $this->argument('name_all');
        $table = $this->option('table');
        $schema = $this->option('schema');
        $repository = $this->option('repository');
        $repository_namespace = $this->option('repository-namespace');
        $model_namespace = $this->option('model-namespace');
        $interface_namespace = $this->option('interface-namespace');
        $controller_namespace = $this->option('controller-namespace');


        # Verifica se o Nome padrao para os dados foi preenchido.
        if (empty($name_all))
        {
            $name_all = $this->ask('Qual o nome padrao para o model ?');
            $this->info('Nome do model : ' . $name_all);
        }

        # Verifica Nome da Tabela
        if (empty($table))
        {
            $table = $this->ask("Qual o nome da tabela referente ao modulo?");
            $this->info('Nome da tabela : ' . $table);
        }

        # Verifica o nome da BD
        if (empty($schema))
        {
            $schema = $this->ask("Qual o nome da BD utilizada?");
            $this->info('Nome da BD : ' . $schema);
        }

        # Verifica o nome do Repository
        if (empty($repository))
        {
            $repository = $this->ask('Qual o nome do Repository (Insere Automatico NameRepository)?');
        }

        # Cria o Model
        $pathApiModel = app_path() . "\\Models\\" . $name_all . ".php";
        $createFileApiModel = true;
        if (file_exists($pathApiModel))
        {
            $createFileApiModel = $this->confirm("Deseja sobrescrever o arquivo : {$pathApiModel}");
        }
        if ($createFileApiModel)
        {
            Artisan::call("make:apimodel", [
                'model' => $name_all,
                '--table' => $table,
                '--schema' => $schema,
            ]);
        }

        # Cria o Repository
        $pathRepository = app_path() . "\\Repositories\\Interfaces\\I" . $name_all . ".php";
        $createFileRepository = true;
        if (file_exists($pathRepository))
        {
            $createFileRepository = $this->confirm("Deseja sobrescrever o arquivo : {$pathRepository}");
        }
        if ($createFileRepository)
        {
            Artisan::call("make:repository", [
                'repository' => $repository . "Repository",
                '--model' => $name_all,
                '--repository-namespace' => $repository_namespace,
                '--model-namespace' => $model_namespace,
                '--interface-namespace' => $interface_namespace,
            ]);
        }

        # Cria o Controller
        $pathApiController = app_path() . "\\Http\\Controllers\\" . $name_all . ".php";
        $createFileApiController = true;
        if (file_exists($pathApiController))
        {
            $createFileApiController = $this->confirm("Deseja sobrescrever o arquivo : {$pathApiController}");
        }
        if ($createFileApiController)
        {
            Artisan::call("make:apicontroller", [
                'controller' => $repository . "Controller",
                '--repository' => $repository . "Repository",
                '--repository-namespace' => $repository_namespace,
                '--controller-namespace' => $controller_namespace,
            ]);
        }
    }

}
