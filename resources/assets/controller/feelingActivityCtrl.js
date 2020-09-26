'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:feelingActivityCtrl
 * @description
 * # feelingActivityCtrl
 * Controller of the pnhs_alumni
 */ 
angular
.module('pnhsApp').controller('feelingActivityCtrl', ['$scope', '$sce', function ($scope, $sce) {

  var fc = this;

  $scope.$watch('status', function(bool, o){
    console.log($scope.status);
  });

  fc.back = function(){
    $scope.status = false;
  }

  fc.selectedFeeling = function(selectedEmoji){
    $scope.$emit('selected_emoji', $sce.trustAsJs(selectedEmoji));
    $scope.status = false;
  }
}]);

