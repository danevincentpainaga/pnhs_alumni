  
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
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.router.state.events',
  'ngSanitize',
  'ngTouch',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('base', {
      url: '/',
      templateUrl: 'views/home.html',
    })
    .state('timeline', {
      url: '/timeline',
      templateUrl: 'views/timeline.html',
    })

  // $urlRouterProvider.otherwise('/login');
})
.run(['$transitions', function($transitions) {
 
  $transitions.onStart({}, function(transitions, err) {
    var $state = transitions.router.stateService;  
    console.log(transitions.to().name);
    
  });

  $transitions.onSuccess({}, function(transitions) {

  });
}]);
