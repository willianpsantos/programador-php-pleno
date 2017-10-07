<?php
    define('MAX_ITEMS_RESULT', 13);
?>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!-->  <!--<![endif]-->

<html>
<head>
    <meta charset="utf-8">
    <meta name="_token" content="{{ csrf_token() }}"/>
    <title> @yield('pageTitle') </title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">    

    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Raleway" rel="stylesheet">
    
    <link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="/assets/bootstrap/css/bootstrap-fileupload.css" rel="stylesheet">
    <link href="/assets/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet">
    <link href="/css/style-responsive.css" rel="stylesheet">
    <link id='style_color' href="/css/style-green.css" rel="stylesheet">
    <link href="/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet">
    <link href="/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet">
    <link href="/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css" rel="stylesheet">
    
    <link rel="stylesheet" href="/assets/kendo/css/kendo.common.min.css" />
    <link rel="stylesheet" href="/assets/kendo/css/kendo.rtl.min.css" />
    <link rel="stylesheet" href="/assets/kendo/css/kendo.common-bootstrap.core.min.css" />
    <link rel="stylesheet" href="/assets/kendo/css/kendo.common-bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/kendo/css/kendo.bootstrap.min.css" />    
    <link rel="stylesheet" href="/assets/flag-icon-css/css/flag-icon.min.css" />
    
    @if (Route::currentRouteName() == 'login' || Route::currentRouteName() == 'password.request' || Route::currentRouteName() == 'password.reset' || Route::currentRouteName() == 'choosecompany')
        <link href="/css/app.css" rel="stylesheet">
    @endif
    
    <link href="/css/custom.css" rel="stylesheet">    
    <link href="/css/custom-media-query.css" rel="stylesheet">
    <link href="/css/icons.css" rel="stylesheet">

    @if($use_mvvm)
    <link href="/css/widget.css" rel="stylesheet">
    @endif
</head>
<body class="fixed-top">
   <div class="loading"></div>
    
   <!-- 
       * Variáveis de controle no arquivo layouts/includes/variables.blade.php
       * As variáveis de controle devem ter seus valores modificados nas páginas
         que herdarem do layout main
   -->
    
   <!-- Cabeçalho -->
   @if ($showTopHeader)
   @include('layouts.includes.header')
   @endif   
   
   <div id="container" class="row-fluid no-margin-top">  
      <!-- Menu principal -->
      @if ($showSidebarMainMenu)
      @include('layouts.includes.sidebar_menu')
      @endif
       
      <!-- Conteúdo principal da página -->
      <div id="main-content" class='no-margin-left {{ Route::currentRouteName() === 'login' ? 'background-login' : '' }}'>    
          
          <!-- Espaço antes do Container -->
          @if ($showTopHeader)
              <div style="height:47px;width:100%;"></div>
          @endif   

          <!-- Botões para trocar de tema --> 
          @include('layouts.includes.theme_changer')
          
          @yield('content')
      </div>
   </div>
   
   <script type="text/javascript" src="/js/jquery-3.2.0.min.js"></script>
   <script type="text/javascript" src="/js/jquery-migrate-1.4.1.min.js"></script>   
   <script type="text/javascript" src="/js/jquery-migrate-3.0.0.min.js"></script>
   
   <script src="/assets/kendo/js/kendo.all.min.js"></script>
   <script src="/assets/kendo/js/cultures/kendo.culture.pt-BR.min.js"></script>
   <script src="/assets/kendo/js/kendo.core.min.js"></script>
   <script src="/assets/kendo/js/kendo.editor.min.js"></script>
   <script src="/assets/kendo/js/kendo.dropdownlist.min.js"></script>
   <script src="/assets/kendo/js/kendo.grid.min.js"></script>
   <script src="/assets/kendo/js/kendo.colorpicker.min.js"></script>
   <script src="/assets/kendo/js/kendo.datepicker.min.js"></script>
   <script src="/assets/jquery-mask/jquery-mask.js"></script>   
   
   <script type="text/javascript" src="/js/lib/jquery.nicescroll.js"></script>
   <script type="text/javascript" src="/assets/jquery-slimscroll/jquery-ui-1.9.2.custom.min.js"></script>
   <script type="text/javascript" src="/assets/jquery-slimscroll/jquery.slimscroll.min.js"></script>
   <script type="text/javascript" src="/assets/bootstrap/js/bootstrap.min.js"></script>

   <script type="text/javascript" src="/assets/uniform/jquery.uniform.min.js"></script>
   <script type="text/javascript" src="/assets/data-tables/jquery.dataTables.js"></script>
   <script type="text/javascript" src="/assets/data-tables/DT_bootstrap.js"></script>
   <script type="text/javascript" src="/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js"></script>
   <script type="text/javascript" src="/js/lib/jquery.sparkline.js"></script>
   <script type="text/javascript" src="/assets/chart-master/Chart.js"></script>
   <script type="text/javascript" src="/js/lib/jquery.scrollTo.min.js"></script>
   
   <script type="text/javascript" src="/js/lib/easy-pie-chart.js"></script>
   <script type="text/javascript" src="/js/lib/sparkline-chart.js"></script>
   <script type="text/javascript" src="/js/lib/jquery.blockui.js"></script>
   <script type="text/javascript" src="/js/lib/jquery.validate.min.js"></script>
   <script type="text/javascript" src="/js/lib/form-validation-script.js"></script>
   <script type="text/javascript" src="/assets/uniform/jquery.uniform.min.js"></script>
   <script type="text/javascript" src="/assets/flot/jquery.flot.js"></script>
   <script type="text/javascript" src="/assets/flot/jquery.flot.pie.js"></script>
   <script type="text/javascript" src="/assets/chart-master/Chart.js"></script>
   <script type="text/javascript" src="/js/lib/jQuery.dualListBox-1.3.js"></script>
   <script type="text/javascript" src="/js/lib/galleria-1.4.2.js"></script>
   <script type="text/javascript" src="/assets/bootstrap-toggle-buttons/static/js/jquery.toggle.buttons.js"></script>
   <script type="text/javascript" src="/js/require.js"></script>

   <script src="https://code.highcharts.com/highcharts.js"></script>
   <script src="https://code.highcharts.com/modules/data.js"></script>
   <script src="https://code.highcharts.com/modules/drilldown.js"></script>
   
   @if (Route::currentRouteName() != 'login') 
   <script type="text/javascript">
       $(window).load(function() {
           var loading = $('.loading');
           loading.fadeOut();
       });    
   </script>
   @endif
   
   <script type="text/javascript">
       requirejs.config({
           baseUrl: '/js',
           paths: {
               app: '/js/app',
               lib: 'js/app/lib',           
               model: 'js/app/model',
               viewmodel: '/js/app/viewmodel',
               form: '/js/app/form',
               lang: '/js/app/lang',
               jquery: 'jquery-1.9.1.min'
           }
       });
       
       define('jquery', function() {
           return window.$;
       });       
       
       define('kendo', function() {              
          return window.kendo; 
       });
   </script>   

   <script type="text/javascript" src="/js/applib.js"></script>   
   <script type="text/javascript" src="/js/appurls.js"></script>

    <!-- Translation Messages -->
   <script type="text/javascript" src="/js/app/lang/messages/pt.js"></script>
   <script type="text/javascript" src="/js/app/lang/messages/es.js"></script>
   <script type="text/javascript" src="/js/app/lang/messages/en.js"></script>   
   
   <script type="text/javascript" src="/js/component/lookup.dropdownlist.js"></script>
   <script type="text/javascript" src="/js/component/messagebox.js"></script>   
   <script type="text/javascript" src="/js/lib/common-scripts.js"></script>
   <script type="text/javascript" src="/js/component/numeric.editor.js"></script>
   
   @include('layouts.includes.scripts')
   
   <script type="text/javascript">
       $(function(){
           $.ajaxSetup({
               headers: { 
                   'X-CSRF-Token' : $('meta[name=_token]').attr('content') 
               }
           });
           
           require(['app'], function(app) {               
               app.lang('pt');
           });
       });
   </script>

   @if ($showSidebarMainMenu == true)
   <script type="text/javascript">
       $(function(){
          require(['app', 'kendo'], function(app, kendo) {
               app.maxItems = {{ MAX_ITEMS_RESULT }};
               app.mainContent = $('#main-content');
           
               app.mainContent
                  .removeClass('no-margin-left')
                  .parent()
                  .removeClass('no-margin-top');          
              
               $('#sidebar ul.sidebar-menu [data-menu-name]').click(function(e){
                   var a = $(this),
                       menuName = a.data('menu-name');
                       href = a.attr('href');

                   $('#sidebar ul.sidebar-menu ul.sub li').removeClass('active');
                   a.closest('li').addClass('active');
                   
                   @if ($use_mvvm)
                   e.preventDefault();
                   app.destroyAllWidgets(app.mainContent);               
                   app.loadViewModel(menuName);
                   @else
                   app.currentMenu({
                       module: app.currentModule,
                       menu: menuName
                   });

                   return true;
                   @endif
               });
           });
       });    
   </script>
   @else
   <script type="text/javascript">
       $(function(){
           window.localStorage.removeItem('currentViewModel');
       });
   </script>
   @endif
   
   @yield('script')

</body>
</html>