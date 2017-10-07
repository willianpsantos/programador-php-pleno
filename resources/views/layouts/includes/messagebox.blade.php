@if(!empty(session('result')))
<?php $result = session('result'); ?>

    @section('script')
        <script type="text/javascript">
            $(function() {
                @if ($result->success)
                var icon = window.MessageBox.SUCCESS;
                @else
                var icon = window.MessageBox.ERROR;
                @endif

                window.MessageBox.alert(
                    "{{  __($saveTitle) }}",
                    "{{ !empty($result->message) ? $result->message : __($saveSuccess) }}",
                    {
                        icon: icon,
                        height: 120
                    }
                );
            });
        </script>
    @endsection
@endif