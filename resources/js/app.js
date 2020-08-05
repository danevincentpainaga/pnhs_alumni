  
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import '@uirouter/angularjs/lib/legacy/stateEvents.js';
require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

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
