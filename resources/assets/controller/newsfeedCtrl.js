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

    // nf.post = [
    //     {
    //         user_id: 1,
    //         photo: "uploads/dane.jpg",
    //         name: 'Dane Vincent painaga',
    //         datetime: '3hrs',
    //         description: "Lorem ipsum the amazing",
    //         files:[
    //             {id: 1, file: "images/user-1.jpg", type: "image/jpg"},
    //             {id: 2, file: "images/06.jpg", type: "image/jpg"},
    //             {id: 3, file: "images/1.jpg", type: "image/jpg"},
    //             {id: 4, file: "images/user-2.jpg", type: "image/jpg"},
    //             {id: 5, file: "images/013.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/05.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/03.jpg", type: "image/jpg"},
    //         ],
    //     },
    //     {
    //         user_id: 2,
    //         photo: "uploads/zoe.jpg",
    //         name: 'Sophia Elizabeth painaga',
    //         datetime: '5hrs',
    //         description: "Lorem ipsum the maze",
    //         files:[
    //             {id: 1, file: "images/10.jpg", type: "image/jpg"},
    //             {id: 2, file: "images/02.jpg", type: "image/jpg"},
    //             {id: 3, file: "images/user-17.jpg", type: "image/jpg"},
    //             {id: 4, file: "images/07.jpg", type: "image/jpg"},
    //             {id: 5, file: "images/user-15.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/02.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/7.jpg", type: "image/jpg"},
    //         ],
    //     },
    // ];


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

