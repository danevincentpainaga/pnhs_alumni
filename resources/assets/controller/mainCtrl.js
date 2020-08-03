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



}]);


app.directive('menuDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/menu.html',
  }
});

app.directive('postsDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/posts_directive.html',
    controller: 'postsCtrl',
    controllerAs: 'p'
  }
});

app.directive('rightColumnDirective', function(){
  return{
    restrict: 'E',
    scope:{

    },
    templateUrl: 'views/officers_friends_-directive.html',
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


app.directive('gallery', function(){
  return{
    restrict:'A',
    link: function(scope, elem, attrs){
      $(elem).imagesGrid({
        images: [
          {
            src: 'images/dane.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'images/dane.jpg' // thumbnail image url
          },
          {
            src: 'uploads/zoe.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/zoe.jpg' // thumbnail image url
          },
          {
            src: 'uploads/pic1.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/pic1.jpg' // thumbnail image url
          },
          {
            src: 'uploads/dane.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/dane.jpg' // thumbnail image url
          },
          {
            src: 'uploads/user.jpg',      // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/user.jpg' // thumbnail image url
          },
          {
            src: 'uploads/zoevid.mp4',       // url
            alt: 'Car',          // alternative text
            title: 'Car',        // title
            caption: 'Supercar',  // modal caption
            thumbnail: 'uploads/zoevid.mp4',  // thumbnail image url
          },
        ],
        // algin images with different sizes
        align: false,

        // max grid cells (1-6)
        cells: 5, 

        // goto next image on click
        nextOnClick: true,

        // text for show more
        showViewAll: 'more',

        // returns text for "view all images" link if images more than five
        getViewAllText: function() {},

      });
    }
  }
});

