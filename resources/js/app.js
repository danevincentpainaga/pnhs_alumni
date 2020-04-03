  
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
.module('myApp', [
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
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  })
  .state('base', {
    url: '/',
    views:{
      '':{
        templateUrl: 'views/home.html'
      },
      'pages-view@base':{
        templateUrl: 'views/homepage.html'
      }
    }
  })
  .state('base.profile', {
    url: 'profile/:stud',
    views:{
      'pages-view@base':{
        templateUrl: 'views/profile.html'
      },
      'profile-content@base.profile':{
        templateUrl: 'views/timeline.html'
      }
    }
  })
  .state('base.profile.classmates', {
    url: '/classmates',
    views:{
      'pages-view@base':{
        templateUrl: 'views/profile.html'
      },
      'profile-content@base.profile.classmates':{
        templateUrl: 'views/classmates.html'
      }
    }
  })
  .state('base.profile.about', {
    url: '/about',
    views:{
      'pages-view@base':{
        templateUrl: 'views/profile.html'
      },
      'profile-content@base.profile.about':{
        templateUrl: 'views/about.html'
      }
    }
  })
  .state('base.suggested_people', {
    url: 'suggested_people',
    views:{
      'pages-view@base':{
        templateUrl: 'views/suggested_people.html'
      }
    }
  })
  $urlRouterProvider.otherwise('/login');
})
.run(['$transitions', '$rootScope', '$cookies', '$timeout', '$stateParams', function($transitions, $rootScope, apiService, $cookies, $timeout, $stateParams) {
 
 $transitions.onStart({}, function(transitions, err) {
    console.log(transitions.to().name);
    checkedLogged(transitions.to().name)



    function checkedLogged(route){
      if (route != 'login') {
        $rootScope.loggedin = true;
      }
      else{
        $rootScope.loggedin = false;
      }
    };

  });

  $transitions.onSuccess({}, function(transitions) {
    console.log(transitions.to().name);
  });
}]);
