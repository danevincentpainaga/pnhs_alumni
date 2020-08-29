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
        <link href="{{asset('node_modules/grid/src/images-grid.css')}}" rel="stylesheet">
        <link href="{{asset('node_modules/video.js/dist/video-js.css')}}" rel="stylesheet">
        <link href="{{asset('node_modules/emojionearea/dist/emojionearea.min.css')}}" rel="stylesheet">
        <!-- <link href="https://vjs.zencdn.net/7.8.4/video-js.css" rel="stylesheet" /> -->
        
    </head>
    <body ng-cloak ng-controller="mainCtrl">
        <ng-include src="'views/header.html'"></ng-include> 
        <div class="container" style="padding-left: 30px;padding-right:30px;margin-top: 60px;">
          <br />
            <div class="row" ui-view="" ></div>
          <br />
          <br />
        </div>
        <modal-directive class="pop-up-post"  id="pop-up-post-modal" ></modal-directive>
<div style="width: 20%;background: #fff; position: fixed;right: 3px;height: 87.8%; border: 1px solid #dcdcdc;z-index: 90;display: none;">
    <span>Chat</span>
</div>
<div style="width: 207px; background: red;position: fixed;right: 25px;bottom: 0px;height: 40px;background-color: #555;color: #fff; border-radius: 5px 5px 0 0;text-align: center;padding: 9px;cursor: pointer;box-shadow: rgba(0, 0, 0, 0.22) 0px 0px 4px, rgba(0, 0, 0, 0.31) 0px 4px 8px;">
    <span><i class="fa fa-envelope"></i> Message</span>
</div>
<!-- <div style="width: 50px; height: 50px;background: red;position: fixed;right: 15px;bottom: 13px;background-color: #555;display: flex;justify-content: center;align-items: center;color: #fff;border-radius: 100%;font-size: 14px;border: 3px solid #2080e6;">
    <span>Chat</span>
</div> -->
 

        <script src="{{asset('node_modules/jquery/dist/jquery.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('js/app.js')}}" type="text/javascript" ></script>

        <script src="{{asset('node_modules/@uirouter/angularjs/release/angular-ui-router.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-cookies/angular-cookies.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-sanitize/angular-sanitize.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-touch/angular-touch.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/angular-resource/angular-resource.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/sweetalert2/dist/sweetalert2.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/socket.io-client/dist/socket.io.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/grid-gallery/js/grid-gallery.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/ng-file-upload/dist/ng-file-upload-all.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/grid/src/images-grid.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/video.js/dist/video.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/emojionearea/dist/emojionearea.min.js')}}" type="text/javascript"></script>
        <script src="{{asset('node_modules/moment/min/moment.min.js')}}" type="text/javascript" ></script>
        <!-- <script src="https://vjs.zencdn.net/7.8.4/video.js"></script> -->
        

        <script>var baseUrl = "{{url('/')}}/";</script>
        <script src="{{asset('controller/bundleCtrl.js')}}" type="text/javascript" ></script>
        <script type="text/javascript" src="{{asset('alertServices/alertServices.js')}}"></script>
        <script type="text/javascript" src="{{asset('httpServices/httpServices.js')}}"></script>
        
    </body>
</html>
