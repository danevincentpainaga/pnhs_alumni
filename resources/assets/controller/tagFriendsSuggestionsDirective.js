angular.module('pnhsApp').directive('tagFriendsSuggestions', ['$timeout', function($timeout){
  return{
    restrict: 'E',
    scope:{
      status: '='
    },
    templateUrl: 'views/tag_friends_suggesstions.html',
    controller: 'taggedUserListCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attrs){
      scope.$watch('status', function(n, o) {
        if (n) {
          $('#tagged').animate({'position': 'absolute', 'right': 0 + 'px'}, 40);
          let w = angular.element('.tagged-body');
          scope.getWindowDimensions = function () {
              return {
                  'h': w.height(),
              };
          };
          scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            $timeout(function() {
              $('.wrapper').css({ 'height': (newValue.h) + 25 + 'px'}); 
              scope.$apply(scope.getWindowDimensions);
            }, 40);
          }, true);

          w.bind('resize', function () {
              scope.$apply();
          });
        }
        else{
          $('.wrapper').css({ 'height': 'auto'});
          $('#tagged').animate({'position': 'absolute', 'right': -530 + 'px'}, 150);
        }
      }, true);
    }
  }
}]);