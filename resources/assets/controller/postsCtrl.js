'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:postsCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('postsCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert',
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert) {

	var p = this;

	p.posting = function(){
		$rootScope.posting = true;
	}


}]);