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



}]);


app.directive('menuDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/menu.html',
  }
});

app.directive('postsDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/posts_directive.html',
    controller: 'postsCtrl',
    controllerAs: 'p'
  }
});

app.directive('rightColumnDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/officers_friends_-directive.html',
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


app.directive('gallery', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      $(elem).imagesGrid({
        images: [
          {
            src: 'images/dane.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'images/dane.jpg' // thumbnail image url
          },
          {
            src: 'uploads/zoe.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/zoe.jpg' // thumbnail image url
          },
          {
            src: 'uploads/pic1.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/pic1.jpg' // thumbnail image url
          },
          {
            src: 'uploads/dane.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/dane.jpg' // thumbnail image url
          },
          {
            src: 'uploads/user.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/user.jpg' // thumbnail image url
          },
          {
            src: 'uploads/zoevid.mp4',       // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/zoevid.mp4',  // thumbnail image url
          },
        ],
        // algin images with different sizes
        align: false,

        // max grid cells (1-6)
        cells: 5, 

        // goto next image on click
        nextOnClick: true,

        // text for show more
        showViewAll: 'more',

        // returns text for "view all images" link if images more than five
        getViewAllText: function() {},

      });
    }
  }
});


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
    p.filesize = 10000;
    var files_to_upload = [];

    // upload later on form submit
    p.uploadPost = function() {

      loopFiles(p.file);

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
      console.log(p.file);
    };

    function loopFiles(files){
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          uploadFileToServer(files[i]);
        }
      }
    }

    function uploadFileToServer(file){

      let newFileName = file.lastModified+'_'+file.size+'_'+file.name.slice(0, file.name.lastIndexOf("."));
      let extension = file.name.slice(file.name.lastIndexOf(".")+1);
      let final_file_name = newFileName+'_pnhsKey.'+extension;
  		
      var upload = Upload.upload({
  			url: 'api/uploadProfilePic',
  			data: { file: Upload.rename(file, final_file_name) },
  			resumeSizeUrl: baseUrl+'api/checkChunk/'+newFileName+'_pnhsKey',
  			headers: {
  				Authorization : 'Bearer '+ $rootScope.token
  			},
  			resumeChunkSize: 100000,
  		})

      upload.then(function (resp) {
            console.log(resp.data);
            files_to_upload.push({ 
                name: resp.data.name,
                path: resp.data.path, 
                mime_type: resp.data.mime_type,
                description: p.post_description,
            });

            if (files_to_upload.length == p.file.length) {
                var user_post = {
                  files: files_to_upload,
                  post: {
                    privacy: p.privacy_status,
                    description: p.post_description
                  }
                };
                savePost(user_post);
            }
            
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });


    }

    function savePost(posting){
      console.log(posting);
      apiService.savePost({uploaded: posting}).then(function(response){
        console.log(response.data);
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