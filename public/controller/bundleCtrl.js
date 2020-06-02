'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:addUserCtrl
 * @description
 * # addUserCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('addUserCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$q', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $q, apiService, swalert) {

    var au = this;

 }]);
'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:dashboardCtrl
 * @description
 * # dashboardCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('dashboardCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert', 'fileReader',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, fileReader) {

    var db = this;
    db.editBtnText = 'Edit Photo';
    db.user_photo_copy = angular.copy($rootScope.user_photo);
    var auth = $cookies.getObject('auth');

    db.navigate = function(destination){
      $location.path(destination);
    }


  db.getTheFiles  = function(file){
    db.file = file[0];
    var formdata = new FormData();
        formdata.append('file', file[0]);
        formdata.append('id', $rootScope.loggedId);
        fileReader.readAsDataUrl(db.file, $scope)
          .then(function(result) {
            $timeout(function() {
              $rootScope.user_photo = result;
              db.data = formdata;
              console.log(db.data);
              db.updating = true;
            });
          }, function(err){
            console.log(err);
            db.updating = false;
            $rootScope.user_photo = db.user_photo_copy;
          });
  }

  db.updateProfilePic = function(){
    db.updating = false;
    db.editBtnText = 'Uploading...';
    uploadProfilePic(db.data);
  }

  function uploadProfilePic(photo){
    apiService.uploadProfilePic(photo).then(function(response){
      console.log(response)
      let newCookie = {
        success: {
          token: auth.success.token
        },
        id: auth.id,
        role: auth.role,
        province_id: auth.province_id,
        municipality_id: auth.municipality_id,
        name: auth.name,
        user_photo: response.data,
      };
      $cookies.putObject('auth', newCookie);
      db.editBtnText = 'Edit Photo';
      swalert.uploadSuccessInfo("Photo updated!", 'success', 2000);
    }, function(err){
      console.log(err);
    });
  }

}]);

app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
            element.val(null);
        });
    };

    return {
        link: fn_link
    }
}]);

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();
      if(file){
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
      }
      else{
        deferred.reject(file);
      }

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});

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
        err.data.error === "Unauthorised" ?
          swalert.successInfo("<label class='red'>Incorrect Username/password!</label>", 'error' ) : 
          swalert.successInfo("<label class='red'>"+err.data.error+"!</label>", 'error' );
          lg.buttonMessage = 'Sign In';
          lg.loginBtn = false;
          $location.path('/login');
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
'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:userAccountsCtrl
 * @description
 * # userAccountsCtrl
 * Controller of the Senior pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('userAccountsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var u = this;


}]);