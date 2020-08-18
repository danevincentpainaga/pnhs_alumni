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

  $scope.$watch('status', function(bool, o){      
    if (bool) {
      apiService.getAlumni().then(function(response){
        console.log(response);
        tc.suggestions = response.data
      }, function(err){
        console.log(err);
      });
    }
  });

  tc.back = function(){
    $scope.status = false;
  }

}]);
