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

    $scope.$on('finished', function(v, bool){
		nf.uploading = bool;
    });

    $scope.$on('uploadedfile', function(v, file){
    	nf.uploading = true;
		nf.uploadedfile = file;
    });

    $scope.$on('percentage', function(v, percentage){
		nf.percentage = percentage;
		nf.uploading = true;
		console.log(nf.uploading);
    });



}]);

