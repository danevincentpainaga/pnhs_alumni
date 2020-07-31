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

    $rootScope.uploadedImage = [];

    $scope.privacy = ['public', 'friends'];
    $scope.privacy_status = 'public';

    // upload later on form submit
    $scope.uploadPost = function() {

      var user_post = {
        privacy: this.privacy_status,
        description: this.post_description,
        id: 1
      };

      $q.all([apiService.savePost(user_post)]).then(function(response){
        console.log(response[0].data);
        loopFiles($scope.file, response[0].data);
      }, function(err){
        console.log(err);
      });

    };

    $scope.getTheFiles = function (file) {
      $rootScope.uploadedImage = [];
      $scope.file = file;
      angular.forEach(file, function(val, i){
        fileReader.readAsDataUrl(val, $scope)
          .then(function(result){
             $rootScope.uploadedImage.push({name:val.name, type: val.type, result: result});
          }, function(err){
            console.log(err);
          });
      });
      console.log($scope.file);
    };

    function loopFiles(files, post){
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          uploadFileToServer(files[i], post);
        }
      }
    }

    function uploadFileToServer(file, post){
      Upload.upload({
          url: 'api/uploadProfilePic',
          data: {file: file, 'post': post},
          resumeChunkSize: 90000,
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          console.log(resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }


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
    link: function(scope, elem, attr){
      elem.on('click', function(){
        console.log(attr.file);
      });
    }
  }
});


app.directive('openModal', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attr){
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
    link: function(scope, elem, attr){
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
    function link(scope, element, attrs){
        scope.$watch('filedata', function(n, o){
          displayFiles(JSON.parse(n));
        });
        // scope.$watch('files', function(n, o){ console.log(scope.files); });
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
