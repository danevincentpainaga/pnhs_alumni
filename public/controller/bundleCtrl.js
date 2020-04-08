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

	$scope.accountName = "danepainaga";
	
	$scope.navigateToProfile = function(){
		$location.path('profile/'+$scope.accountName);
	}

	$scope.navigate = function(destination){
		$location.path(destination);
	}

	$scope.logout= function(){
		$window.location.reload();
		$cookies.remove('auth');
	}
	
	$scope.$on('Authenticated', function(){
		swalert.successInfo("<label>Welcome "+$cookies.getObject('auth').name+"!</label>", 'success', 2000);
	});
	
}]);

	app.directive('stats', function(){
		return{
	      restrict: 'A',
	      scope: true,
	      link: function(scope, elem, attrs) {
			const root = document.querySelector("body, html");
			const container = document.querySelector('.gg-container');
			const images = document.querySelectorAll(".gg-box > img");

			elem.on('click', function(){
			    var currentImg = this;
			    const parentItem = currentImg.parentElement, screenItem = document.createElement('div');
			    screenItem.id = "gg-screen";
			    container.prepend(screenItem);
			    if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
			    var route = currentImg.src;
			  	console.log(route);
			    root.style.overflow = 'hidden';
			    screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
			    // const first = images[0].src, last = images[l-1].src;
			    const first = "http://localhost:8000/#!/uploads/zoe.jpg", last = "http://localhost:8000/#!/uploads/user.jpg";
			    const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
			    imgItem.innerHTML = '<img src="' + route + '">';
			    
			    var nextImg = currentImg.nextElementSibling;
			    var prevImg = currentImg.previousElementSibling;
			    var nextImg = currentImg.nextElementSibling;
			    // if (3 > 1) {
			    //   if (route == first) {
			    //     prevBtn.hidden = true;
			    //     var prevImg = false;
			    //     var nextImg = currentImg.nextElementSibling;
			    //   }
			    //   else if (route == last) {
			    //     nextBtn.hidden = true;
			    //     var nextImg = false;
			    //     var prevImg = currentImg.previousElementSibling;
			    //   }
			    //   else {
			    //     var prevImg = currentImg.previousElementSibling;
			    //     var nextImg = currentImg.nextElementSibling;
			    //   }
			    // }
			    // else {
			    //   prevBtn.hidden = true;
			    //   nextBtn.hidden = true;
			    // }
						
			    screenItem.addEventListener("click", function(e) {
			      if (e.target == this || e.target == close) hide();
			    });

			    root.addEventListener("keydown", function(e) {
			      if (e.keyCode == 37 || e.keyCode == 38) prev();
			      if (e.keyCode == 39 || e.keyCode == 40) next();
			      if (e.keyCode == 27 ) hide();
			    });

			    prevBtn.addEventListener("click", prev);
			    nextBtn.addEventListener("click", next);

			    function prev() {
			      prevImg = currentImg.previousElementSibling;
			      imgItem.innerHTML = '<img src="' + prevImg.src + '">';
			      currentImg = currentImg.previousElementSibling;
			      var mainImg = document.querySelector(".gg-image > img").src;
			      nextBtn.hidden = false;
			      prevBtn.hidden = mainImg === first;
			    };

			    function next() {
			      nextImg = currentImg.nextElementSibling;
			      imgItem.innerHTML = '<img src="' + nextImg.src + '">';
			      currentImg = currentImg.nextElementSibling;
			      var mainImg = document.querySelector(".gg-image > img").src;
			      prevBtn.hidden = false;
			      nextBtn.hidden = mainImg === last;
			    };

			    function hide() {
			      root.style.overflow = 'auto';
			      screenItem.remove();
			    };

			});
	      }

		}
	});