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

    // $scope.$on('progressPercentage', function(v, percentage){
    //   $scope.$broadcast('percentage', percentage);
    // });

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
          displayFiles(JSON.parse(n));
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


app.directive('postImages', function(){
  return{
    restrict:'A',
    scope:{
      postfiles: '@',
      postImages: '='
    },
    link: function(scope, elem, attrs){
      attrs.$observe('postfiles', function(n, o) {
        console.log(n+" postfiles");
        if (n) {
          $(elem).imagesGrid({
            images: JSON.parse(n),

            cells: 5, 

            // goto next image on click
            nextOnClick: true,

            // text for show more
            showViewAll: 'more',

            // returns text for "view all images" link if images more than five
            getViewAllText: function() {},

          });
        }
      });

    }
  }
});


app.directive('uploadProgressDirective', function(){

  var start = 0;
  var percent_arr;
  var copy = -1;

  function link(scope, elem, attrs){
    attrs.$observe('percentage', function(newval, o) {
      percent_arr = [newval];
      let val = parseInt(newval);
      if (start > 0) {
        getIncPercentage(val, start);
      }
      else{
        getIncPercentage(val, 0);
        start = val;
      }

    });
  }

  function getIncPercentage(percentage, currentPercentage){
    if (parseInt(copy) < percentage ) {
      if(currentPercentage == 100){
        $('#percentage').text('99%');
        $('.total-progress').css({'width': currentPercentage + '%'});
      }
      else if (currentPercentage <= percentage) {
        $('.total-progress').css({'width': currentPercentage + '%'});
        $('#percentage').text(currentPercentage+'%');
        getIncPercentage(percentage, ++currentPercentage); 
      }
      percentage > 0 ? copy = [...percent_arr]: null ;
    }
    // console.log("copy "+ copy, "percentage "+ percentage);
    // console.log(percentage, currentPercentage, start );
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

// app.directive('uploadProgressDirective', function(){
//   return{
//     restrict:'E',
//     scope:{
//       total_percentage: '@',
//       percent: '@',
//       fileuploaded: '='
//     },
//     templateUrl: 'views/uploading_progress_directive.html',
//     controller: 'uploadingProgressCtrl',
//     controllerAs: 'up',
//     link: function(scope, elem, attrs){
//       attrs.$observe('totalPercentage', function(n, o) {
//         $('.total-progress').css({'width': n + '%'});
//       });
//     }
//   }
// });

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
           console.log(nf.uploading);
        }
		nf.uploadedfile = file;
    });

  //   $scope.$on('percentage', function(v, percentage){
		// nf.percentage = percentage;
  //   });



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

    p.uploadedImage = [];

    p.privacy = ['public', 'friends'];
    p.privacy_status = 'public';
    p.filesize = 700000;
    var files_to_upload = [];
    var post_images = [];

    // upload later on form submit
    p.uploadPost = function() {

      prepareFiles(p.file);

    };

    p.getTheFiles = function (file) {
      p.uploadedImage = [];
      p.file = file;
      angular.forEach(file, function(val, i){
        fileReader.readAsDataUrl(val, $scope)
          .then(function(result){
             p.uploadedImage.push({name:val.name, type: val.type, result: result});
          }, function(err){
            console.log(err);
          });
      });
      // console.log(p.file);
    };

    function prepareFiles(files){
      if (files.length > 1) {
        loopFiles(files);
      }
      else if(files.length == 1){
        uploadOneFile(checkChunkBeforeUpload(files[0]));
      }
      else{

      }
    }


    function loopFiles(files){
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          uploadMultipleFilesToServer(checkChunkBeforeUpload(files[i]));
        }
      }
    }

    function checkChunkBeforeUpload(file){

     let modifiedFileName = file.lastModified+'_'+file.size+'_'+file.name.slice(0, file.name.lastIndexOf("."));
      let extension = file.name.slice(file.name.lastIndexOf(".")+1);
      let final_file_name = modifiedFileName+'_pnhsKey.'+extension;
      
      let upload = Upload.upload({
        url: 'api/uploadProfilePic',
        data: { file: Upload.rename(file, final_file_name) },
        resumeSizeUrl: baseUrl+'api/checkChunk/'+modifiedFileName+'_pnhsKey',
        headers: {
          Authorization : 'Bearer '+ $rootScope.token
        },
        resumeChunkSize: p.filesize,
      });

      return upload;
    }

    function uploadOneFile(upload){

      upload.then(function (resp) {
        var user_post = {
          files: [{
                    name: resp.data.name,
                    path: resp.data.path, 
                    mime_type: resp.data.mime_type,
                    description: p.post_description,
                  }],
          post: {
            privacy: p.privacy_status,
            description: p.post_description
          }
        };

        savePost(user_post, { bool: false, post_images: [{ src: 'storage/'+resp.data.path+resp.data.name, alt:'', title: '', caption: p.post_description, thumbnail: 'storage/'+resp.data.path+resp.data.name }] });

      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.$emit('load_start', progressPercentage);
        $scope.$emit('uploaded_file', { fileName: evt.config.data.file.name });
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    }

    function uploadMultipleFilesToServer(upload){

      $scope.$emit('load_start', 0);

      upload.then(function (resp) {
        files_to_upload.push({ 
            name: resp.data.name,
            path: resp.data.path, 
            mime_type: resp.data.mime_type,
            description: p.post_description,
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

            savePost(user_post, { bool: false, post_images });
            
        }

        console.log('files uploaded: '+files_to_upload.length+" files length "+p.file.length );

      }, function (resp) {
            console.log('Error status: ' + resp.status);
      }, function (evt) {
        $scope.$emit('uploaded_file', { fileName: evt.config.data.file.name });
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.$emit('load_start', progressPercentage);
      });

    }


    function savePost(posting, uploadedImages){
      console.log(posting);
      apiService.savePost({uploaded: posting}).then(function(response){
        console.log(response.data);
        $scope.$emit('upload_finished', uploadedImages);
      }, function(err){
        console.log(err);
      });
    }

}]);


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

