<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Repositories\UsuarioRepository;
use App\Repositories\Core\DbSortDirection;
use App\Repositories\Core\DbOperators;
use App\Models\Usuarios;
use App\Models\MenuItem;
use App\Models\ModuloObjetos;

use Illuminate\Hashing\BcryptHasher;
use Illuminate\Support\Facades\Crypt;
use App\Models\Documentos;
use App\Repositories\ParametroRepository;

class RepositoryTest extends TestCase
{
    public function testRepository() {
        $repository = resolve('\App\Repositories\Interfaces\IMatriculaRepository');

        
    }
}