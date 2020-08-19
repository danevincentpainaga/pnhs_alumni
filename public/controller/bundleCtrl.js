'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('loginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var lg = this;
  lg.valid= true;
  lg.buttonMessage = 'Sign In';
  lg.loginBtn = false;

  lg.login =function(){
    if(!lg.email || !lg.password){
      console.log('unAuthenticated');
    }else{
      lg.buttonMessage = 'Signing In...';
      lg.loginBtn = true;
      
      var credentials = {
        email: lg.email,
        password: lg.password
      }

      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          console.log(response);
          $location.path('/dashboard'); 
          $scope.$emit("Authenticated");
          lg.loginBtn = false;
      }, function(err){
          console.log(err);
          lg.buttonMessage = 'Sign In';
          lg.loginBtn = false;
      });
    }
  }

}]);

'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    $scope.$on('load_start',function(v, value){
      $scope.$broadcast('loading_value', value);
    });


    $scope.$on('upload_finished', function(v, obj){
      $scope.$broadcast('finished', obj);
    });
    
    $scope.$on('uploaded_file', function(v, file){
      $scope.$broadcast('uploadedfile', file);
    });

}]);


app.directive('menuDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/menu.html',
  }
});

app.directive('newsFeedDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/newsfeed_directive.html',
    controller: 'newsfeedCtrl',
    controllerAs: 'nf'
  }
});

app.directive('rightColumnDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/officers_friends_directive.html',
  }
});

app.directive('tagFriendsSuggestions', function(){
  return{
    restrict: 'E',
    scope:{
      status: '='
    },
    templateUrl: 'views/tag_friends_suggesstions.html',
    controller: 'taggedUserListCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attrs){
      scope.$watch('status', function(n, o) {
        if (n) {
          console.log($(window).height() - 147 );
          $('#tagged').animate({'position': 'absolute', 'right': 0 + 'px'}, 110);
          setTimeout(()=>{
            $('.wrapper').css({ 'height': $('.tagged-body').height() + 42 + 'px'});
          }, 40);
        }
        else{
          $('.wrapper').css({'height': 'auto'});
          $('#tagged').animate({'position': 'absolute', 'right': -530 + 'px'}, 150);
        }
      });
    }
  }
});


app.directive('openModal', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      elem.on('click', function(e){
        $('body').css({'overflow':'hidden'});
        $('#pop-up-post-modal').css({'display':'block'});
      });
    }
  }
});

app.directive('modalDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/popup_post_modal.html',
    controller: 'postsCtrl',
    controllerAs: 'p',
    link: function(scope, elem, attrs){
      elem.on('click', function(e){
        if (e.target == e.currentTarget || $(e.target).hasClass('close-post-modal')) {
          $('body').css({'overflow':'auto'});
          $('#pop-up-post-modal').css({'display':'none'});
        }
      });
    }
  }
});

app.directive('files', function(){
    function link(scope, element, attrss){
        scope.$watch('filedata', function(n, o){
          if (n) {
            displayFiles(JSON.parse(n));
          }
        });
    }

    function displayFiles(file){
      file.forEach(function(val, i){
        if (val.type.slice(0, val.type.indexOf('/')) =='video') {
          var photo = $('<video />', {
              id: i,
              src: val.result,
              alt: '',
              controls: true,
              width: 100+'%'
          });
        }
        else{
          var photo = $('<img />', {
              id: i,
              src: val.result,
              alt: '',
              width: 100+'%'
          });
        }
        photo.appendTo($('#file-holder'));
      });
    }

    return{
      restrict:'A',
      scope: { 
        filedata: '@filedata',
        files: '='
      },
      link: link
    }
});


app.directive('uploadProgressDirective', function(){

  var copy = -1;

  function link(scope, elem, attrs){
    attrs.$observe('percentage', function(newval, o) {

      let val = scope.$eval(newval);

      if (val == -1) {
        $('body').css({'overflow':'auto'});
        $('#pop-up-post-modal').css({'display': 'none'}) 
        incrementPercentage(0);
      }
      else{
        setTimeout(() => { 
          $('body').css({'overflow':'auto'});
          $('#pop-up-post-modal').css({'display': 'none'}) 
        }, 700);
        getIncPercentage(val);
      }

    });

  }

  function getIncPercentage(percentage){
    if (copy <= percentage ) {
      if(percentage > 99 ){
        $('.total-progress').css({'width': '99%'});
        $('#message').text('Finishing...');
      }
      else {
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Uploading '+percentage+'%');
      }
      copy = [...[percentage]];
    }
  }

  function incrementPercentage(percentage){
      if(percentage < 100){
        percentage +=1;
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Uploading '+percentage+'%');
        setTimeout(() => { incrementPercentage(percentage) }, 20);
      }
      else {
        $('.total-progress').css({'width': '100%'});
        $('#message').text('Finishing...');
      }
  }

  return{
    restrict:'E',
    scope:{
      percentage: '@',
      fileuploaded: '='
    },
    templateUrl: 'views/uploading_progress_directive.html',
    controller: 'uploadingProgressCtrl',
    controllerAs: 'up',
    link: link
  }
});

app.directive('postGridWrapper', function(){

  function link(scope, elem, attrs){

    scope.$watch('postfiles', function(files, o){
      if (files) {
        console.log(files);
        scope.preLoadFiles(files);
      }
    });

    scope.preLoadFiles = function(files){
      let count = 0;
      let arr = [ {value: 0, name: 'landscape'}, {value: 0, name: 'portrait'}, {value: 0, name: 'even'}   ]

      angular.forEach(files, function(f){
         
        let img = new Image();
        img.onload = function(loaded){

            count++;

            if (img.naturalWidth > img.naturalHeight) {
              arr[0].value += 1;
              
            }
            else if(img.naturalWidth < img.naturalHeight){
              arr[1].value += 1;
            }
            else if(img.naturalWidth == img.naturalHeight){
              arr[2].value+= 1;            
            }

            if (files.length == count) {
              switch(scope.checkDimension(arr)){
                case 'even':
                      scope.ngClass = 'post-photo-grid-wrapper';
                      scope.$apply(scope.ngClass);
                      break;
                case 'portrait':
                      scope.ngClass = 'post-photo-grid-wrapper';
                      scope.$apply(scope.ngClass);
                      break;
                case 'landscape':
                      scope.ngClass = 'post-photo-grid-wrapper-landscape';
                      scope.$apply(scope.ngClass);
                      break;
              }
              scope.pf = files;
              scope.$apply(scope.pf);
              console.log(scope.ngClass);
            }

        }

        img.src = f.file;

      });
    }

    scope.checkDimension = function(arr){
      for(i = 0; i < arr.length; i++){
        if (arr[0].value < arr[i].value) {
          arr[0] = arr[i+1];
        }
      }
      return arr[0].name;
    }

  }



  return{
    restrict:'A',
    template:'<div ng-class="ngClass"><div ng-repeat="f in pf">'+
                '<img ng-src="{{ f.file }}" ng-if="f.type | checkImage">'+
                '<div class="video-wrap" ng-if="f.type | checkVideo" >'+
                  '<video>'+
                    '<source ng-src="{{ f.file }}" type="video/mp4"/>'+
                  '</video>'+
                 ' <figure>'+
                    '<button name="play"></button>'+
                  '</figure> '+
                '</div>'+
              '</div></div>',
    scope:{
      postfiles: '=',
    },
    link: link
  }
});


app.filter('checkImage', function(){
  return function(type){
    if (type == 'image/jpg') {
      return true;
    }
    return false;
  }
});

app.filter('checkVideo', function(){
  return function(type){
    if (type == 'video/mp4') {
      return true;
    }
    return false;
  }
});

app.filter('checkPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    return 'images/avatarmale.svg';
  }
});
'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:newsfeedCtrl
 * @description
 * # newsfeedCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('newsfeedCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var nf = this;
    
    nf.uploading = false;

    $scope.$on('loading_value', function(v, value){
        nf.percentage = value;
        nf.uploading = true;
    });

    $scope.$on('finished', function(v, obj){
		nf.uploading = obj.bool;
        nf.uploadedFiles = obj.post_images;
    });

    $scope.$on('uploadedfile', function(v, file){
        if (!nf.uploading) {
    	   nf.uploading = true;
        }
		nf.uploadedfile = file;
    });

    nf.post = [
        {
            user_id: 1,
            photo: "uploads/dane.jpg",
            name: 'Dane Vincent painaga',
            description: "testing",
            files:[
                {id: 1, file: "images/2.jpg", type: "image/jpg"},
                {id: 2, file: "images/9.jpg", type: "image/jpg"},
                {id: 3, file: "images/1.jpg", type: "image/jpg"},
                {id: 4, file: "uploads/pic1.jpg", type: "image/jpg"},
                {id: 5, file: "uploads/pic2.jpg", type: "image/jpg"},
            ],
        },
        {
            user_id: 2,
            photo: "uploads/zoe.jpg",
            name: 'Sophia Elizabeth painaga',
            description: "Lorem ipsum the maze",
            files:[
                {file: "images/dane.jpg", type: "image/jpg"},
                {file: "uploads/zoe.jpg", type: "image/jpg"},
                {file: "uploads/dane.jpg", type: "image/jpg"},
                {file: "uploads/pic1.jpg", type: "image/jpg"},
                {file: "images/3.jpg", type: "image/jpg"},
            ],
        },
    ];


}]);


'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:postsCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('postsCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
      function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var p = this;

    var files_to_upload = [];
    var post_images = [];
    p.post_status = 'Share';
    p.privacy = ['public', 'friends'];
    p.privacy_status = 'public';
    p.filesize = 2000000;

    $scope.$watch('status', function(bool, o){
      p.show_suggestions = bool;
    });

    p.tagFriends = function(){
      p.show_suggestions = true;
    }

    /* upload later on form submit */
    p.uploadPost = function() {
      if (validate(p.file, p.post_description) === false){
        console.log("Not Valid");
      }else{
        p.post_status = 'Sharing';
        p.positingInProgress = true;
      }
    };

    p.getTheFiles = function (file) {
      p.file = file;
      getAllFilesForDisplay(file);
    };


    function validate(file, post_description){
      if (!file && post_description) {
        return savePost(apiService.savePostDescriptionOnly, { post_description: p.post_description, privacy: p.privacy_status });
      }
      if (!post_description && file) {
        return loopFiles(p.file, apiService.savePostFilesOnly, { files: files_to_upload, privacy: p.privacy_status });
      }
      if(file && post_description){
        return loopFiles(p.file, apiService.savePostDescriptionWithFiles, { files: files_to_upload, post: { privacy: p.privacy_status, description: p.post_description } });
      }
      return false;
    }

    function getAllFilesForDisplay(file){
      let images = [];
      angular.forEach(file, function(val, i){
        fileReader.readAsDataUrl(val, $scope)
          .then(function(result){
             images.push({name:val.name, type: val.type, result: result});
             images.length == file.length ? p.uploadedImage = images : [];
          }, function(err){
            console.log(err);
          });
      });
    }

    function loopFiles(files, callback, objToPass){
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          uploadFilesToServer(checkChunkBeforeUpload(files[i]), callback, objToPass);
        }
      }
    }

    function checkChunkBeforeUpload(file){

      let modifiedFileName = file.lastModified+'_'+file.size+'_'+file.name.slice(0, file.name.lastIndexOf("."));
      let extension = file.name.slice(file.name.lastIndexOf(".")+1);
      let final_file_name = modifiedFileName+'_pnhsKey.'+extension;

      let upload = Upload.upload({
        url: 'api/uploadFiles',
        data: { file: Upload.rename(file, final_file_name) },
        resumeSizeUrl: baseUrl+'api/checkChunk/'+modifiedFileName,
        headers: {
          Authorization : 'Bearer '+ $rootScope.token
        },
        resumeChunkSize: p.filesize,
      });

      return upload;
    }


    function uploadFilesToServer(upload, methodName, objToPass){

      $scope.$emit('load_start', 2);

      upload.then(function (resp) {
        files_to_upload.push({ 
            name: resp.data.name,
            path: resp.data.path, 
            mime_type: resp.data.mime_type,
            description: "No description",
        });

        post_images.push({ src: 'storage/'+resp.data.path+resp.data.name, alt:'', title: '', caption: p.post_description, thumbnail: 'storage/'+resp.data.path+resp.data.name });
        
        if (files_to_upload.length == p.file.length) {
            var user_post = {
              files: files_to_upload,
              post: {
                privacy: p.privacy_status,
                description: p.post_description
              }
            };

            /* Save post after file completely uploaded on server */
            savePost(methodName, objToPass);
        }

        console.log('files uploaded: '+files_to_upload.length+" files length "+p.file.length );

      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          $timeout(()=> { p.positingInProgress = false; }, 1000);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.$emit('load_start', progressPercentage);
          $scope.$emit('uploaded_file', { fileName: evt.config.data.file.name });
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    }

    function savePost(fn, user_post){
      let timer;
      if (fn.name == "savePostDescriptionOnly") { $scope.$emit('load_start', -1);  timer = 2000; }
      fn({post: user_post}).then(function(response){
        console.log(response.data);
        $timeout(()=> {$scope.$emit('upload_finished', { bool: false, post_images }); }, timer);
      }, function(err){
        console.log(err);
      });
    }


}]);


app.directive('file', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      elem.on('click', function(){
        console.log(attrs.file);
      });
    }
  }
});

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();
      if(file){
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
      }
      else{
        deferred.reject(file);
      }

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});
'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:taggedUserListCtrl
 * @description
 * # taggedUserListCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('taggedUserListCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var tc = this;

  $scope.$watch('status', function(bool, o){
    if (bool && !tc.loaded) {
      apiService.getAlumni().then(function(response){
        console.log(response);
        tc.suggestions = response.data
        tc.loaded = true;
      }, function(err){
        console.log(err);
      });
    }
  });

  tc.back = function(){
    $scope.status = false;
  }

}]);

'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:uploadingProgressCtrl
 * @description
 * # uploadingProgressCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('uploadingProgressCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var up = this;


}]);

