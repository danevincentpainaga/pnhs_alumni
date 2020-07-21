'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert', 'fileReader', 'apiService',
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert, fileReader, apiService) {

    var loaded = 0;
    var max_chunk_size = 10000;

		$rootScope.uploadedImage = [];

		$scope.closePosting = function(){
			$rootScope.posting = false;
		}


		$scope.getTheFiles  = function(file){

      $scope.filedata = file[0];
      console.log($scope.filedata);

		}


    $scope.uploadFile = function(){

      console.log($scope.filedata);
      var reader = new FileReader();
      var blob = $scope.filedata.slice(loaded, max_chunk_size);

      reader.onload = function(e){
         var fd = new FormData();
         // console.log(e.target.result);
          fd.append('file', new File([e.target.result], 'filechunk'));
          // fd.append('file', new Uint16Array(e.target.result));
          fd.append('loaded', loaded);
          apiService.uploadProfilePic(fd).then(function(response){
            loaded += max_chunk_size;
            if (loaded < $scope.filedata.size) {
              console.log(response)
              blob = $scope.filedata.slice(loaded, loaded + max_chunk_size + 1);
              reader.readAsArrayBuffer(blob);
              console.log(loaded+" loaded");
            }
          }, function(err){
            console.log(err);
          });
      }
      reader.readAsArrayBuffer(blob);

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
