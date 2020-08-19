'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:taggedUserListCtrl
 * @description
 * # taggedUserListCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('taggedUserListCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var tc = this;
  tc.taggedUsers = [];
  tc.hasTagged = false;

  $scope.$watch('status', function(bool, o){
    if (bool && !tc.loaded) {
      apiService.getAlumni().then(function(response){
        console.log(response);
        tc.suggestions = response.data
        tc.loaded = true;
      }, function(err){
        console.log(err);
      });
    }
  });

  tc.back = function(){
    $scope.status = false;
  }

  tc.tagged = function(taggedUser){
    tc.hasTagged = true;
    $timeout(function() {
      tc.taggedUsers.push({id: taggedUser.id, fullname: taggedUser.firstname+" "+taggedUser.lastname});
    }, 10);
    tc.resize = true;
  }

  tc.doneTagging = function(){
    $scope.$emit('taggedUsers', tc.taggedUsers);
    $timeout(function() { $scope.status = false; });
  }

}]);
