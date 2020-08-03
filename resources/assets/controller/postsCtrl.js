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
      // $q.all([apiService.savePost(user_post)]).then(function(response){
      //   console.log(response[0].data);
      //   loopFiles(p.file, response[0].data);
      // }, function(err){
      //   console.log(err);
      // });

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
    	let newFileName = file.name+'_'+file.lastModified+'_'+file.size
		Upload.upload({
			url: 'api/uploadProfilePic',
			data: { file: Upload.rename(file, newFileName) },
			resumeSizeUrl: baseUrl+'api/checkChunk/'+file.name,
			headers: {
				Authorization : 'Bearer '+ $rootScope.token
			},
			resumeChunkSize: 100000,
		}).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
          files_to_upload.push({ 
              name: resp.data.name, 
              mime_type: resp.data.mime_type, 
              privacy: p.privacy_status,
              description: p.post_description,
          });
          if (files_to_upload.length == p.file.length) {
            console.log(files_to_upload);
          }
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    }


    function savePost(){
      apiService.savePost(files_to_upload).then(function(response){

      }, function(err){

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