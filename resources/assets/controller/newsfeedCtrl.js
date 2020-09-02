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

    function getPost(){
        apiService.getPost().then(function(response){
          nf.post = response.data
          console.log(nf.post);
        }, function(err){
          console.log(err);
        });
    }

    getPost();

}]);

