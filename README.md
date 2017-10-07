## Instruções para Instalação e Execução

* Crie uma base de dados com o nome de <b> biologia_total </b>

* Configure os dados de acesso a sua base de dados no arquivo <b> .env </b> da sua aplicação (usuario, senha, porta e host)

* Execute as <b> migrations </b> da aplicaçao acessando o diretório da aplicação no seu computador pelo prompt de comando do seu sistema operacional e em seguida execute o comando:

  php artisan migrate 

* Execute comandos de limpeza do artisan:
    php artisan view:clear
    php artisan cache:clear
    php artisan config:clear
    php artisan config:cache

## Breve explicativo sobre o projeto

O sistema em questão consiste de uma aplicação voltada para o gerenciamento online de matriculas nos cursos oferecidos pelo professor Jubilut.

O sistema foi desenvolvido com o framework Laravel 5.4. Além disso, contamos com frameworks front-end, tais como o Kendo UI, jQuery e RequireJS, além de bibliotecas javascript desenvolvidas por mim mesmo para facilitar o desenvolvimento.

O sistema segue o padrão de projeto MVVM.
O sistema é uma aplicação de página única (SPA - Single Page Application)
