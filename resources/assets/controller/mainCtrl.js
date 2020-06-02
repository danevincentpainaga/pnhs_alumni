'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert', 'socket', 
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert, socket) {

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
		swalert.successInfo("<label>Welcome "+$scope.accountName+"!</label>", 'success', 2000);
	});
	
    socket.on('test-channel', function(data) {
    	console.log(data);
    	alert();
    });

}]);

app.filter('checkPostPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    else{
      return 'images/user.jpg';
    }
  }
});

app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            scope.style = function () {
                return {
                  'min-height': (newValue.h - 0) + 'px',
                  'max-height': (newValue.h - 0) + 'px'
                };
            };
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});

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


app.factory('socket', function ($rootScope) {
  var socket = io.connect('127.0.0.1:8000');
  return {
      on: function (eventName, callback) {
          socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  callback.apply(socket, args);
              });
          });
      },
      emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  if (callback) {
                      callback.apply(socket, args);
                  }
              });
          })
      }
  };
});