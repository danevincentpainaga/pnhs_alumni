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
    p.show_tagged_limit = 1;
    p.filesize = 2000000;

    $scope.$watch('status', function(bool, o){
      p.show_suggestions = bool;
    });

    $scope.$on('taggedUsers', function(v, users){
      p.tagged_users = users;
      p.tagged = true;
    });

    $scope.$watch('p.tagged_users', function(n, o){
      console.log(n);
      if (n) {
        if (n.length == p.show_tagged_limit){
          p.hasOthers = false;
        }
        else if (n.length > p.show_tagged_limit) {
          p.others = n.length - p.show_tagged_limit;
          p.hasOthers = true;
        }
        else{
          p.hasOthers = false;
          p.tagged = false;
        }
      }
      else{
        p.tagged = false;
      }
    }, true);

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
        return savePost(apiService.savePostDescriptionOnly, { post_description: p.post_description, privacy: p.privacy_status, taggedUsers: p.tagged_users });
      }
      if (!post_description && file) {
        return loopFiles(p.file, apiService.savePostFilesOnly, { files: files_to_upload, privacy: p.privacy_status, taggedUsers: p.tagged_users });
      }
      if(file && post_description){
        return loopFiles(p.file, apiService.savePostDescriptionWithFiles, { files: files_to_upload, post: { privacy: p.privacy_status, description: p.post_description }, taggedUsers: p.tagged_users });
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
      fn({post: user_post,}).then(function(response){
        console.log(response.data);
        $timeout(()=> {$scope.$emit('upload_finished', { bool: false, post_images }); }, timer);
      }, function(err){
        console.log(err);
      });
    }

    function trimTagged(taggedLength, limit){
      let others = taggedLength - limit;
      if (others > 1) {
        p.others = others;
      }
      else{
        p.show_tagged_limit += others;
      }
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