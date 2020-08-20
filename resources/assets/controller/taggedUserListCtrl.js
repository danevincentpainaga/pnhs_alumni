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
    var result = tc.taggedUsers.filter(tag => tag.id == taggedUser.id );
    if (result == 0) {
      $timeout(function() {
        tc.taggedUsers.push({id: taggedUser.id, fullname: taggedUser.firstname+" "+taggedUser.lastname});
        $scope.$emit('taggedUsers', tc.taggedUsers);
      }, 10);
      tc.resize = true;
    }
  }

  tc.removeTagged = function(tagged){
    tc.taggedUsers.length < 2 ? tc.hasTagged = false : undefined;
    tc.taggedUsers.splice(tc.taggedUsers.indexOf(tagged), 1);
  }

  tc.doneTagging = function(){
    $scope.status = false;
  }

}]);
