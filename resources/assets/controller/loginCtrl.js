'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('loginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var lg = this;
  lg.valid= true;
  lg.buttonMessage = 'Sign In';
  lg.loginBtn = false;

  lg.login =function(){
    if(!lg.email || !lg.password){
      console.log('unAuthenticated');
    }else{
      lg.loginBtn = true;
      lg.buttonMessage = 'Signing In...';
      
      swalert.successInfo("<label>Checking Identity...</label>", 'info');
      var credentials = {
        email: lg.email,
        password: lg.password
      };
      console.log(credentials);

      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          console.log(response);
          $timeout(function() {  $location.path('/'); $scope.$emit("Authenticated"); lg.loginBtn = false; });
      }, function(err){
        console.log(err);
        $location.path('/login');
        // err.data.error === "Unauthorised" ?
        //   swalert.successInfo("<label class='red'>Incorrect Username/password!</label>", 'error' ) : 
        //   swalert.successInfo("<label class='red'>"+err.data.error+"!</label>", 'error' );
        //   lg.buttonMessage = 'Sign In';
        //   lg.loginBtn = false;
      });
    }
  }


}]);
