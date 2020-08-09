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

app.directive('tagFriendsSuggestions', function(){
  return{
    restrict: 'E',
    templateUrl: 'views/tag_friends_suggesstions.html',
    link: function(scope, elem, attrs){
      attrs.$observe('status', function(n, o) {
        let h = parseInt($('.tagged-body').height() + 40);
        if (n == 'true') {
          $('#tagged').animate({'position': 'absolute', 'right': 0 + 'px'}, 210);
          setTimeout(()=>{
            $('.wrapper').css({ 'height': h + 'px'});
          }, 130);
        }
        else if(n == 'false'){
          $('.wrapper').css({'height': '100%'});
          $('#tagged').animate({'position': 'absolute', 'right': -530 + 'px'}, 150);
        }
      });
    }
  }
});


// app.directive('file', function(){
//   return{
//     restrict:'A',
//     link: function(scope, elem, attrs){
//       elem.on('click', function(){
//         console.log(attrs.file);
//       });
//     }
//   }
// });


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

  var copy = -1;

  function link(scope, elem, attrs){
    attrs.$observe('percentage', function(newval, o) {
      let val = parseInt(newval);
      getIncPercentage(val);
    });

  }

  function getIncPercentage(percentage){
    if (copy < percentage ) {
      if(percentage == 100){
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Finishing...');
      }
      else {
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Uploading '+percentage+'%');
      }
      copy = [...[percentage]];
    }
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
