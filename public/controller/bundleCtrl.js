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
  
  console.log("login");
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
  app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert, fileReader, apiService, Upload) {

    $rootScope.uploadedImage = [];

    $scope.closePosting = function(){
      $rootScope.posting = false;
    }

    // upload later on form submit or something similar
    $scope.uploadFile = function() {
      if ($scope.file) {
        uploadFileToServer($scope.file);
      }
    };

    // upload on file select or drop
    $scope.getTheFiles = function (file) {
      $scope.file = file;
      fileReader.readAsDataUrl(file, $scope)
        .then(function(result){
          $rootScope.uploadedImage = [result];
        }, function(err){
          console.log(err);
        });
      console.log(file);
    };

    // for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({data: {file: files[i]}});
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({data: {file: files}});
      }
    }


    function uploadFileToServer(file){
      Upload.upload({
          url: 'api/uploadProfilePic',
          data: {file: file, 'username': $scope.username},
          resumeChunkSize: 10000,
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
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


app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
            element.val(null);
        });
    };

    return {
        link: fn_link
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
 * @name pnhs_alumni.controller:postsCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('postsCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert',
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert) {

	var p = this;

	p.posting = function(){
		$rootScope.posting = true;
	}


}]);