<!doctype html>
<html ng-app="pnhsApp" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        
        <title>PNHS_alumni</title>

        <!-- Fonts -->
        <link href="{{ asset('node_modules/fontawesome/css/all.css') }}" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('node_modules/grid-gallery/css/grid-gallery.min.css') }}" rel="stylesheet">
        

    </head>
    <body ng-cloak ng-controller="mainCtrl">
        <ng-include src="'views/header.html'"></ng-include> 
        <div class="container" style="padding-left: 30px;padding-right:30px;margin-top: 60px;">
          <br />
            <div class="row" ui-view="" ></div>
          <br />
          <br />
        </div>
         <ng-include src="'views/popup_post_modal.html'" ng-if="posting"></ng-include>






        <script src="{{asset('node_modules/jquery/dist/jquery.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/app.js')}}" type="text/javascript" ></script>

        <script src="{{asset('node_modules/@uirouter/angularjs/release/angular-ui-router.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-animate/angular-animate.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-cookies/angular-cookies.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-sanitize/angular-sanitize.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-touch/angular-touch.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-resource/angular-resource.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/sweetalert2/dist/sweetalert2.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/socket.io-client/dist/socket.io.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/grid-gallery/js/grid-gallery.min.js')}}" type="text/javascript"></script>
        
        <script>var baseUrl = "{{url('/')}}/";</script>
        <script src="{{asset('controller/bundleCtrl.js')}}" type="text/javascript" ></script>
        <script type="text/javascript" src="{{asset('alertServices/alertServices.js')}}"></script>
        <script type="text/javascript" src="{{asset('httpServices/httpServices.js')}}"></script>
        
    </body>
</html>
