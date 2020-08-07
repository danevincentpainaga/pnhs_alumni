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