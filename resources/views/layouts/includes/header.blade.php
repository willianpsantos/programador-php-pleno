<div id="header" class="navbar navbar-inverse navbar-fixed-top">       
    <div class="navbar-inner">
        <div class="container-fluid">   
            <!-- Desktop menu icon -->
            @if ($showSidebarHeaderIcon) 
                <div class="sidebar-toggle-box hidden-phone">
                    <div class=" icon-reorder tooltips fa fa-bars fa-3x" data-placement="right" data-original-title="Toggle Navigation"></div>
                </div>
            @endif
            <?php
                $systemTitle = __('messages.systemtitle');
            ?>
            <span class="brand logo">
                <a href="/">
                    <img src="/img/logo-kma.png" alt="{{ $systemTitle }}" class="logo" />
                    <div class="info logo">
                        {{ substr($systemTitle, 0, strrpos($systemTitle, ' ')) }}
                        <b>
                            {{ substr($systemTitle, strrpos($systemTitle, ' ') + 1) }}
                        </b>
                    </div>
                </a>
            </span>
            
            <!-- Mobile menu icon -->
            @if ($showSidebarHeaderIcon) 
            <a class="btn btn-navbar collapsed" id="main_menu_trigger" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="arrow"></span>
            </a>
            @endif
        </div>
    </div>       
</div>