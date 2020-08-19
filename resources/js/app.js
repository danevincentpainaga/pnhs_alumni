  
import '@uirouter/angularjs/lib/legacy/stateEvents.js';
require('./bootstrap');


angular
.module('pnhsApp', [
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.router.state.events',
  'ngSanitize',
  'ngTouch',
  'ngFileUpload',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('base', {
      url: '/',
      templateUrl: 'views/home.html',
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginCtrl',
      controllerAs: 'lg'
    })
    .state('timeline', {
      url: '/timeline',
      templateUrl: 'views/timeline.html',
    })

  $urlRouterProvider.otherwise('/');
})
.run(['$transitions', '$rootScope', 'apiService', '$cookies', '$timeout', '$stateParams', function($transitions, $rootScope, apiService, $cookies, $timeout, $stateParams) {
 
  $transitions.onStart({}, function(transitions, err) {

    var auth = $cookies.getObject('auth');
    
    var $state = transitions.router.stateService;  
    
    if (!apiService.AuthenticatedUser()) {
        $state.go('login');
        console.log(transitions.to().name);
    }
    else{
      $rootScope.token = auth.success.token;
      console.log(auth);
    }
    
  });

  $transitions.onSuccess({}, function(transitions) {

  });
}]);
