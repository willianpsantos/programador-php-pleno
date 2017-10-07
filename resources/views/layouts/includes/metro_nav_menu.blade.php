@if ($showSidebarMainMenu)
<div class="metro-nav">
@else
<div class="metro-nav" style="margin-top:34px; display:flow-root;">
@endif    
    <!-- $module variable defined in HomeController -->
    @foreach($modules as $module)
        <div class="metro-nav-block" style='background-color:{{ $module->cor_padrao }};'>
            <a data-identification-module='{{ $module->identificacao }}'
               href="{{ route("modulos", ['module' => $module->identificacao]) }}">

                <i class="{{ $module->icon_css_classe }}"></i>
                
                <div class="info">
                    {{ mb_strtoupper($module->nm_modulo) }}
                </div>
            </a>
        </div>  
    @endforeach
</div>
