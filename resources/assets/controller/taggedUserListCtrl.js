'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:taggedUserListCtrl
 * @description
 * # taggedUserListCtrl
 * Controller of the pnhs_alumni
 */ 
app.controller('taggedUserListCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

  var tc = this;
  tc.taggedUsers = [];
  tc.hasTagged = false;

  $scope.$watch('tc.search', debounce(function() {
    if (tc.loaded) getSearchFriends({search: tc.search }); 
  }, 500), true);

  $scope.$watch('status', function(bool, o){
    if (bool && !tc.loaded) getSearchFriends();
  });

  tc.back = function(){
    $scope.status = false;
  }

  tc.tagged = function(taggedUser){
    tc.hasTagged = true;
    let result = tc.taggedUsers.filter(tag => tag.id == taggedUser.id );
    if (result == 0) {
      $timeout(function() {
        tc.taggedUsers.push({id: taggedUser.id, fullname: taggedUser.firstname+" "+taggedUser.lastname});
        $scope.$emit('taggedUsers', tc.taggedUsers);
      }, 10);
    }
  }

  tc.removeTagged = function(tagged){
    tc.taggedUsers.length < 2 ? tc.hasTagged = false : undefined;
    tc.taggedUsers.splice(tc.taggedUsers.indexOf(tagged), 1);
  }

  tc.doneTagging = function(){
    $scope.status = false;
  }

  function getSearchFriends(keyword){
    tc.loaded = false;
    apiService.getSearchFriends(keyword).then(function(response){
      console.log(response);
      tc.suggestions = response.data
      tc.loaded = true;
    }, function(err){
      console.log(err);
    });
  }

}]);


app.factory('debounce', function($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function () { 
                callback.apply(this, arguments); 
            }, interval);
        };
    }; 
});