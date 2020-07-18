'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert',
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert) {

		$scope.closePosting = function(){
			$rootScope.posting = false;
		}

}]);

app.directive('menuDirective', function(){
	return{
		restrict: 'E',
		scope:{

		},
		templateUrl: 'views/menu.html',
	}
});

app.directive('postsDirective', function(){
	return{
		restrict: 'E',
		scope:{

		},
		templateUrl: 'views/posts_directive.html',
		controller: 'postsCtrl',
		controllerAs: 'p'
	}
});

app.directive('rightColumnDirective', function(){
	return{
		restrict: 'E',
		scope:{

		},
		templateUrl: 'views/officers_friends_-directive.html',
	}
});