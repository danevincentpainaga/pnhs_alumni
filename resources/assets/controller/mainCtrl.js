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
    scope:{
      status: '='
    },
    templateUrl: 'views/tag_friends_suggesstions.html',
    controller: 'taggedUserListCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attrs){
      scope.$watch('status', function(n, o) {
        if (n) {
          console.log($(window).height() - 147 );
          $('#tagged').animate({'position': 'absolute', 'right': 0 + 'px'}, 110);
          setTimeout(()=>{
            // $('.wrapper').css({ 'height': $(window).height() - 147 + 'px'});
            $('.wrapper').css({ 'height': $('.tagged-body').height() + 42 + 'px'});
          }, 40);
        }
        else{
          $('.wrapper').css({'height': 'auto'});
          $('#tagged').animate({'position': 'absolute', 'right': -530 + 'px'}, 150);
        }
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


app.directive('uploadProgressDirective', function(){

  var copy = -1;

  function link(scope, elem, attrs){
    attrs.$observe('percentage', function(newval, o) {

      let val = scope.$eval(newval);

      if (val == -1) {
        $('body').css({'overflow':'auto'});
        $('#pop-up-post-modal').css({'display': 'none'}) 
        incrementPercentage(0);
      }
      else{
        setTimeout(() => { 
          $('body').css({'overflow':'auto'});
          $('#pop-up-post-modal').css({'display': 'none'}) 
        }, 700);
        getIncPercentage(val);
      }

    });

  }

  function getIncPercentage(percentage){
    if (copy <= percentage ) {
      if(percentage > 99 ){
        $('.total-progress').css({'width': '99%'});
        $('#message').text('Finishing...');
      }
      else {
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Uploading '+percentage+'%');
      }
      copy = [...[percentage]];
    }
  }

  function incrementPercentage(percentage){
      if(percentage < 100){
        percentage +=1;
        $('.total-progress').css({'width': percentage + '%'});
        $('#message').text('Uploading '+percentage+'%');
        setTimeout(() => { incrementPercentage(percentage) }, 20);
      }
      else {
        $('.total-progress').css({'width': '100%'});
        $('#message').text('Finishing...');
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

app.directive('postGridWrapper', function(){

  function link(scope, elem, attrs){

    scope.$watch('postfiles', function(files, o){
      if (files) {
        console.log(files);
        scope.preLoadFiles(files);
      }
    });

    scope.preLoadFiles = function(files){
      let count = 0;
      let arr = [ {value: 0, name: 'landscape'}, {value: 0, name: 'portrait'}, {value: 0, name: 'even'}   ]

      angular.forEach(files, function(f){
         
        let img = new Image();
        img.onload = function(loaded){

            count++;

            if (img.naturalWidth > img.naturalHeight) {
              arr[0].value += 1;
              
            }
            else if(img.naturalWidth < img.naturalHeight){
              arr[1].value += 1;
            }
            else if(img.naturalWidth == img.naturalHeight){
              arr[2].value+= 1;            
            }

            if (files.length == count) {
              switch(scope.checkDimension(arr)){
                case 'even':
                      scope.ngClass = 'post-photo-grid-wrapper';
                      scope.$apply(scope.ngClass);
                      break;
                case 'portrait':
                      scope.ngClass = 'post-photo-grid-wrapper';
                      scope.$apply(scope.ngClass);
                      break;
                case 'landscape':
                      scope.ngClass = 'post-photo-grid-wrapper-landscape';
                      scope.$apply(scope.ngClass);
                      break;
              }
              scope.pf = files;
              scope.$apply(scope.pf);
              console.log(scope.ngClass);
            }

        }

        img.src = f.file;


      });
    }

    scope.checkDimension = function(arr){
      for(i = 0; i < arr.length; i++){
        if (arr[0].value < arr[i].value) {
          arr[0] = arr[i+1];
        }
      }
      return arr[0].name;
    }

  }



  return{
    restrict:'A',
    template:'<div ng-class="ngClass"><div ng-repeat="f in pf">'+
                '<img ng-src="{{ f.file }}" ng-if="f.type | checkImage">'+
                '<div class="video-wrap" ng-if="f.type | checkVideo" >'+
                  '<video>'+
                    '<source ng-src="{{ f.file }}" type="video/mp4"/>'+
                  '</video>'+
                 ' <figure>'+
                    '<button name="play"></button>'+
                  '</figure> '+
                '</div>'+
              '</div></div>',
    scope:{
      postfiles: '=',
    },
    link: link
  }
});



app.filter('checkImage', function(){
  return function(type){
    if (type == 'image/jpg') {
      return true;
    }
    return false;
  }
});

app.filter('checkVideo', function(){
  return function(type){
    if (type == 'video/mp4') {
      return true;
    }
    return false;
  }
});

app.filter('checkPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    return 'images/avatarmale.svg';
  }
});