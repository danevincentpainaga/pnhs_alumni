'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
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

    // $scope.$on('progressPercentage', function(v, percentage){
    //   $scope.$broadcast('percentage', percentage);
    // });

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

app.directive('rightColumnDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/officers_friends_directive.html',
  }
});

app.directive('file', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      elem.on('click', function(){
        console.log(attrs.file);
      });
    }
  }
});


app.directive('openModal', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      elem.on('click', function(e){
        $('body').css({'overflow':'hidden'});
        $('#pop-up-post-modal').css({'display':'block'});
      });
    }
  }
});

app.directive('modalDirective', function(){
  return{
    restrict:'E',
    templateUrl: 'views/popup_post_modal.html',
    controller: 'postsCtrl',
    controllerAs: 'p',
    link: function(scope, elem, attrs){
      elem.on('click', function(e){
        if (e.target == e.currentTarget || $(e.target).hasClass('close-post-modal')) {
          $('body').css({'overflow':'auto'});
          $('#pop-up-post-modal').css({'display':'none'});
        }
      });
    }
  }
});

app.directive('files', function(){
    function link(scope, element, attrss){
        scope.$watch('filedata', function(n, o){
          displayFiles(JSON.parse(n));
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


app.directive('postImages', function(){
  return{
    restrict:'A',
    scope:{
      postfiles: '@',
      postImages: '='
    },
    link: function(scope, elem, attrs){
      attrs.$observe('postfiles', function(n, o) {
        console.log(n+" postfiles");
        if (n) {
          $(elem).imagesGrid({
            images: JSON.parse(n),

            cells: 5, 

            // goto next image on click
            nextOnClick: true,

            // text for show more
            showViewAll: 'more',

            // returns text for "view all images" link if images more than five
            getViewAllText: function() {},

          });
        }
      });

    }
  }
});


app.directive('uploadProgressDirective', function(){

  var start = 0;
  var percent_arr;
  var copy = -1;

  function link(scope, elem, attrs){
    attrs.$observe('percentage', function(newval, o) {
      percent_arr = [newval];
      let val = parseInt(newval);
      if (start > 0) {
        getIncPercentage(val, start);
      }
      else{
        getIncPercentage(val, 0);
        start = val;
      }

    });
  }

  function getIncPercentage(percentage, currentPercentage){
    if (parseInt(copy) < percentage ) {
      if(currentPercentage == 100){
        $('#percentage').text('99%');
        $('.total-progress').css({'width': currentPercentage + '%'});
      }
      else if (currentPercentage <= percentage) {
        $('.total-progress').css({'width': currentPercentage + '%'});
        $('#percentage').text(currentPercentage+'%');
        getIncPercentage(percentage, ++currentPercentage); 
      }
      percentage > 0 ? copy = [...percent_arr]: null ;
    }
    // console.log("copy "+ copy, "percentage "+ percentage);
    // console.log(percentage, currentPercentage, start );
  }

  return{
    restrict:'E',
    scope:{
      percentage: '@',
      fileuploaded: '='
    },
    templateUrl: 'views/uploading_progress_directive.html',
    controller: 'uploadingProgressCtrl',
    controllerAs: 'up',
    link: link
  }
});

// app.directive('uploadProgressDirective', function(){
//   return{
//     restrict:'E',
//     scope:{
//       total_percentage: '@',
//       percent: '@',
//       fileuploaded: '='
//     },
//     templateUrl: 'views/uploading_progress_directive.html',
//     controller: 'uploadingProgressCtrl',
//     controllerAs: 'up',
//     link: function(scope, elem, attrs){
//       attrs.$observe('totalPercentage', function(n, o) {
//         $('.total-progress').css({'width': n + '%'});
//       });
//     }
//   }
// });
