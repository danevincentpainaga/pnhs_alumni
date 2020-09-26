'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
  function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    $scope.$on('load_start',function(v, value){
      $scope.$broadcast('loading_value', value);
    });


    $scope.$on('upload_finished', function(v, obj){
      $scope.$broadcast('finished', obj);
    });
    
    $scope.$on('uploaded_file', function(v, file){
      $scope.$broadcast('uploadedfile', file);
    });

}]);


app.directive('menuDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/menu.html',
  }
});

app.directive('newsFeedDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/newsfeed_directive.html',
    controller: 'newsfeedCtrl',
    controllerAs: 'nf'
  }
});


app.directive('postedFeedDirective', function(){
  return{
    restrict: 'E',
    scope:{
      userpost: '='
    },
    templateUrl: 'views/posted_feed_directive.html',
    controller: 'postedFeedCtrl',
    controllerAs: 'p'
  }
});


app.directive('rightColumnDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/officers_friends_directive.html',
  }
});


app.directive('files', function(){
    function link(scope, element, attrs){
        scope.$watch('filedata', function(n, o){
          if (n) {
            displayFiles(JSON.parse(n));
          }
        });
    }

    function displayFiles(file){
      file.forEach(function(val, i){
        if (val.type.slice(0, val.type.indexOf('/')) =='video') {
          var photo = $('<video />', {
              id: i,
              src: val.result,
              alt: '',
              controls: true,
              width: 100+'%'
          });
        }
        else{
          var photo = $('<img />', {
              id: i,
              src: val.result,
              alt: '',
              width: 100+'%'
          });
        }
        photo.appendTo($('#file-holder'));
      });
    }

    return{
      restrict:'A',
      scope: { 
        filedata: '@filedata',
        files: '='
      },
      link: link
    }
});

app.directive('feelingActivity', ['$sce', '$timeout', function($sce, $timeout){

  function link(scope, elem, attrs){

    scope.$watch('status', function(newval, oldval){
      if (newval) {
        $('.feeling_activity_wrapper').animate({'position': 'absolute', 'right': 0 + 'px'}, 40);
        let w = angular.element('.emoji_activity_wrapper');
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
          $timeout(function() {
            $('.wrapper').css({ 'height': (newValue.h) + 70 + 'px'}); 
            scope.$apply(scope.getWindowDimensions);
          }, 40);
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
      }else{
        $('.wrapper').css({ 'height': 'auto'});
        $('.feeling_activity_wrapper').animate({'position': 'absolute', 'right': -550 + 'px'}, 40);
      }
    }, true);

    let emoji = new EmojiConvertor();
    emoji.img_set = 'facebook';
    emoji.img_sets.facebook.path = 'node_modules/emoji-datasource-facebook/img/facebook/64/';

    scope.emoji_colons = [
      { feeling: ":smile: Happy" },
      { feeling: ":face_with_thermometer: Sick" },
      { feeling: ":angry: Angry" },
      { feeling: ":sunglasses: Cool" },
      { feeling: ":disappointed: Disappointed" },
      { feeling: ":tired_face: Tired" },
      { feeling: ":heart_eyes: Loved" },
      { feeling: ":heart_eyes: Loved" },
      { feeling: ":sweat: Exhausted" },
      { feeling: ":weary: Worried" },
      { feeling: ":flushed: Surprised" },
    ];
  }

  return{
    restrict:'E',
    templateUrl:'views/feeling_activity_directive.html',
    controller: 'feelingActivityCtrl',
    controllerAs: 'fc',
    scope:{
      status: '='
    },
    link: link
  }

}]);