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


app.directive('tagFriendsSuggestions', ['$timeout', function($timeout){
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
        scope.preLoadFiles(files);
      }
    });

    scope.preLoadFiles = function(files){

      let count = 0;
      let countStyleArray = [ {value: 0, name: 'landscape'}, {value: 0, name: 'portrait'}, {value: 0, name: 'even'}   ]

      for(i = 0; i < files.length; i++){
        
        if (i > 4) { count = 0;  return false; };

        let img = new Image();
        img.onload = function(loaded){

            count++;

            if (img.naturalWidth > img.naturalHeight) {
              countStyleArray[0].value += 1;
              
            }
            else if(img.naturalWidth < img.naturalHeight){
              countStyleArray[1].value += 1;
            }
            else if(img.naturalWidth == img.naturalHeight){
              countStyleArray[2].value+= 1;            
            }

            setStyle(files, count, countStyleArray);
        }

        if (files[i].mime_type != "video/mp4") {
          img.src = 'storage/'+files[i].image_name;
        }
        else{
          count++;
          setStyle(files, count, countStyleArray);
        }
      }
    }

    scope.checkDimension = function(countStyleArray){
      for(i = 0; i < countStyleArray.length; i++){
        if (countStyleArray[0].value < countStyleArray[i].value) {
          countStyleArray[0] = countStyleArray[i];
        }
      }
      return countStyleArray[0].name;
    }

    function setStyle(files, count, countStyleArray){
      if (files.length === count || count === 5) {
        switch(scope.checkDimension(countStyleArray)){
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

        scope.pf = files.slice(0, 5); 
        scope.$apply(scope.pf);
      }
    }

  }

  return{
    restrict:'A',
    template:'<div ng-class="ngClass"><div ng-repeat="f in pf track by $index">'+
                '<img ng-src="storage/{{ f.image_name }}" ng-if="f.mime_type | checkImage">'+
                '<div class="video-wrap" ng-if="f.mime_type | checkVideo" >'+
                  '<video>'+
                    '<source ng-src="storage/{{ f.image_name }}" type="video/mp4"/>'+
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

app.directive('emoji',['$sce', function($sce){
  return{
    restrict:'A',
    scope:{
      description: '='
    },
    link: function(scope, elem, attrs){
      window.emojioneVersion = "3.1.2";
      $(elem).emojioneArea({
        pickerPosition: 'bottom',
        saveEmojisAs: 'shortname',
        shortnames: true
      });

      elem[0].emojioneArea.on("change", function(btn, event) {
       scope.description =  $sce.trustAsJs( $(elem)[0].emojioneArea.getText() );
        scope.$apply(scope.description);
      });

      scope.$watch('description');
    }
  }
}]);



app.filter('checkImage', function(){
  return function(type){
    let valid_image_type = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    if (valid_image_type.indexOf(type) != -1) {
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

app.filter('formatDate', function(){
  return function(date){
    if (date) return moment(date).startOf('hour').fromNow();  
  }
});


