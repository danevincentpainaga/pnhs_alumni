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
           console.log(nf.uploading);
        }
		nf.uploadedfile = file;
    });

    nf.post = [
        {
            user_id: 1,
            photo: "uploads/dane.jpg",
            name: 'Dane Vincent painaga',
            description: "testing",
            files:[
                {file: "images/dane.jpg", type: "image/jpg"},
                {file: "uploads/zoe.jpg", type: "image/jpg"},
                {file: "uploads/dane.jpg", type: "image/jpg"},
                {file: "uploads/pic1.jpg", type: "image/jpg"},
                {file: "uploads/zoevid.mp4", type: "video/mp4"},
            ],
        },
        {
            user_id: 2,
            photo: "uploads/zoe.jpg",
            name: 'Sophia Elizabeth painaga',
            description: "Lorem ipsum the maze",
            files:[
                {file: "images/dane.jpg", type: "image/jpg"},
                {file: "uploads/zoe.jpg", type: "image/jpg"},
                {file: "uploads/dane.jpg", type: "image/jpg"},
                {file: "uploads/pic1.jpg", type: "image/jpg"},
                {file: "uploads/zoevid.mp4", type: "video/mp4"},
            ],
        },
    ];

}]);

