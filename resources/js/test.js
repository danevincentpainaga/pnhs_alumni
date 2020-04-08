'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:dashboardCtrl
 * @description
 * # dashboardCtrl
 * Controller of the Senior_Citizen
 */ 
var app = angular.module('myApp')
  app.controller('dashboardCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert', 'fileReader',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, fileReader) {

    var db = this;
    db.editBtnText = 'Edit Photo';
    db.user_photo_copy = angular.copy($rootScope.user_photo);
    var auth = $cookies.getObject('auth');

    db.navigate = function(destination){
      $location.path(destination);
    }


  db.getTheFiles  = function(file){
    db.file = file[0];
    var formdata = new FormData();
        formdata.append('file', file[0]);
        formdata.append('id', $rootScope.loggedId);

        var s = sliceFile(file[0], 3);
        console.log(file[0]);
        // console.log(s[0]);

        var reader = new FileReader();

        fileReader.readAsDataUrl(s[0], $scope)
          .then(function(result) {
            $timeout(function() {
              console.log(result);
              // $rootScope.user_photo = result;
              // db.data = formdata;
              // console.log(db.data);
              // db.updating = true;
            });
          }, function(err){
            console.log(err);
            // db.updating = false;
            // $rootScope.user_photo = db.user_photo_copy;
          });
  }

  function sliceFile(file, chunksAmount) {
    var byteIndex = 0;
    var chunks = [];
      
    for (var i = 0; i < chunksAmount; i += 1) {
      var byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
      chunks.push(file.slice(byteIndex, byteEnd));
      byteIndex += (byteEnd - byteIndex);
    }

    return chunks;
  }

  db.updateProfilePic = function(){
    db.updating = false;
    db.editBtnText = 'Uploading...';
    uploadProfilePic(db.data);
  }

  function uploadProfilePic(photo){
    apiService.uploadProfilePic(photo).then(function(response){
      console.log(response)
      let newCookie = {
        success: {
          token: auth.success.token
        },
        id: auth.id,
        role: auth.role,
        province_id: auth.province_id,
        municipality_id: auth.municipality_id,
        name: auth.name,
        user_photo: response.data,
      };
      $cookies.putObject('auth', newCookie);
      db.editBtnText = 'Edit Photo';
      swalert.uploadSuccessInfo("Photo updated!", 'success', 2000);
    }, function(err){
      console.log(err);
    });
  }

}]);

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
      // if(file){
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
      // }
      // else{
        deferred.reject(file);
      // }

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});
