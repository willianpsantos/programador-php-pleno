<ul class="breadcrumb" style="padding: 20px 15px;">
    <li>
        <i class="fa fa-home"></i>
        <a href="{{ route('init') }}"> {{ __('messages.home') }} </a>
        <span class="divider">/</span>
    </li>

    @for($i = 0; $i <= count(Request::segments()); $i++)
    <li>
        <a href="">             
            <?php $segment = Request::segment($i); ?>
            <?php echo ucfirst($segment);  ?>
        </a>
        
        @if($i < count(Request::segments()) & $i > 0)
        {!! '<span class="divider">/</span>' !!}
        @endif
    </li>
    @endfor

    @if ($showButtonNew)
    <li style="float: right; margin-top:-11px;">
        <button id="btnNew" class="btn btn-large btn-primary">
            <i class="fa fa-plus-circle"></i>
            {!! $buttonNewText !!}
        </button>
    </li>
    @endif
</ul>