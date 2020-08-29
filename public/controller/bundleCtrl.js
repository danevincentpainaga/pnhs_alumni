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
      lg.buttonMessage = 'Signing In...';
      lg.loginBtn = true;
      
      var credentials = {
        email: lg.email,
        password: lg.password
      }

      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          console.log(response);
          $location.path('/dashboard'); 
          $scope.$emit("Authenticated");
          lg.loginBtn = false;
      }, function(err){
          console.log(err);
          lg.buttonMessage = 'Sign In';
          lg.loginBtn = false;
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
        console.log(files);
        scope.preLoadFiles(files);
      }
    });

    scope.preLoadFiles = function(files){

      let count = 0;
      let arr = [ {value: 0, name: 'landscape'}, {value: 0, name: 'portrait'}, {value: 0, name: 'even'}   ]

      for(i = 0; i < files.length; i++){
        
        if (i > 4) { count = 0; console.log('break...', i); return false; } else { console.log('continuing...', i)};

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

            if (files.length === count || count === 5) {
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

              scope.pf = files.slice(0, 5); 
              scope.$apply(scope.pf);
              console.log(scope.pf);
            }
        }


        img.src = 'storage/'+files[i].image_name;
      }
    }

    scope.checkDimension = function(arr){
      for(i = 0; i < arr.length; i++){
        if (arr[0].value < arr[i].value) {
          arr[0] = arr[i];
        }
      }
      return arr[0].name;
    }

  }

  return{
    restrict:'A',
    template:'<div ng-class="ngClass"><div ng-repeat="f in pf track by $index">'+
                '<img ng-src="storage/{{ f.image_name }}" ng-if="f.mime_type | checkImage">'+
                '<div class="video-wrap" ng-if="f.mime_type | checkVideo" >'+
                  '<video>'+
                    '<source ng-src="{{ f.image_name }}" type="video/mp4"/>'+
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



'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:newsfeedCtrl
 * @description
 * # newsfeedCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('newsfeedCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var nf = this;
    
    nf.uploading = false;

    $scope.$on('loading_value', function(v, value){
        nf.percentage = value;
        nf.uploading = true;
    });

    $scope.$on('finished', function(v, obj){
		nf.uploading = obj.bool;
        nf.uploadedFiles = obj.post_images;
    });

    $scope.$on('uploadedfile', function(v, file){
        if (!nf.uploading) {
    	   nf.uploading = true;
        }
		nf.uploadedfile = file;
    });

    // nf.post = [
    //     {
    //         user_id: 1,
    //         photo: "uploads/dane.jpg",
    //         name: 'Dane Vincent painaga',
    //         datetime: '3hrs',
    //         description: "Lorem ipsum the amazing",
    //         files:[
    //             {id: 1, file: "images/user-1.jpg", type: "image/jpg"},
    //             {id: 2, file: "images/06.jpg", type: "image/jpg"},
    //             {id: 3, file: "images/1.jpg", type: "image/jpg"},
    //             {id: 4, file: "images/user-2.jpg", type: "image/jpg"},
    //             {id: 5, file: "images/013.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/05.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/03.jpg", type: "image/jpg"},
    //         ],
    //     },
    //     {
    //         user_id: 2,
    //         photo: "uploads/zoe.jpg",
    //         name: 'Sophia Elizabeth painaga',
    //         datetime: '5hrs',
    //         description: "Lorem ipsum the maze",
    //         files:[
    //             {id: 1, file: "images/10.jpg", type: "image/jpg"},
    //             {id: 2, file: "images/02.jpg", type: "image/jpg"},
    //             {id: 3, file: "images/user-17.jpg", type: "image/jpg"},
    //             {id: 4, file: "images/07.jpg", type: "image/jpg"},
    //             {id: 5, file: "images/user-15.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/02.jpg", type: "image/jpg"},
    //             {id: 6, file: "images/7.jpg", type: "image/jpg"},
    //         ],
    //     },
    // ];


    function getPost(){
        apiService.getPost().then(function(response){
          nf.post = response.data
          console.log(nf.post);
        }, function(err){
          console.log(err);
        });
    }

    getPost();

}]);


'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:newsfeedCtrl
 * @description
 * # newsfeedCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('postedFeedCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var p = this;


}]);


'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:postsCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('postsCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload', '$sce',
      function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload, $sce) {

    var p = this;

    var files_to_upload = [];
    var post_images = [];
    p.post_status = 'Share';
    p.privacy = ['public', 'friends'];
    p.privacy_status = 'public';
    p.show_tagged_limit = 1;
    p.filesize = 2000000;

    $scope.$watch('status', function(bool, o){
      p.show_suggestions = bool;
    });

    $scope.$on('taggedUsers', function(v, users){
      p.tagged_users = users;
      p.tagged = true;
    });

    $scope.$watch('p.tagged_users', function(n, o){
      if (n) {
        let limit = limitTagged(n);
        if (limit == 1) {
          p.others = n.length - limit;
          p.tagged = n.length > 0 ? true : false;
        }
        p.hasOthers = n.length > 2 ? true : false;
        p.show_tagged_limit = limit;
      }
    }, true);

    p.tagFriends = function(){
      p.show_suggestions = true;
    }

    /* upload later on form submit */
    p.uploadPost = function() {
      p.desc = $sce.getTrustedJs(p.post_description);
      if (validate(p.file, p.desc) === false){
        console.log("Not Valid");
      }else{
        p.post_status = 'Sharing';
        p.postingInProgress = true;
      }
    };

    p.getTheFiles = function (file) {
      p.file = file;
      getAllFilesForDisplay(file);
    };


    function validate(file, post_description){
      if (!file && post_description) {
        return savePost(apiService.savePostDescriptionOnly, { post_description: p.desc, privacy: p.privacy_status, taggedUsers: p.tagged_users });
      }
      if (!post_description && file) {
        return loopFiles(p.file, apiService.savePostFilesOnly, { files: files_to_upload, privacy: p.privacy_status, taggedUsers: p.tagged_users });
      }
      if(file && post_description){
        return loopFiles(p.file, apiService.savePostDescriptionWithFiles, { files: files_to_upload, post: { privacy: p.privacy_status, description: p.desc }, taggedUsers: p.tagged_users });
      }
      return false;
    }

    function getAllFilesForDisplay(file){
      let images = [];
      angular.forEach(file, function(val, i){
        fileReader.readAsDataUrl(val, $scope)
          .then(function(result){
             images.push({name:val.name, type: val.type, result: result});
             images.length == file.length ? p.uploadedImage = images : [];
          }, function(err){
            console.log(err);
          });
      });
    }

    function loopFiles(files, callback, objToPass){
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          uploadFilesToServer(checkChunkBeforeUpload(files[i]), callback, objToPass);
        }
      }
    }

    function checkChunkBeforeUpload(file){

      let modifiedFileName = file.lastModified+'_'+file.size+'_'+file.name.slice(0, file.name.lastIndexOf("."));
      let extension = file.name.slice(file.name.lastIndexOf(".")+1);
      let final_file_name = modifiedFileName+'_pnhsKey.'+extension;

      let upload = Upload.upload({
        url: 'api/uploadFiles',
        data: { file: Upload.rename(file, final_file_name) },
        resumeSizeUrl: baseUrl+'api/checkChunk/'+modifiedFileName,
        headers: {
          Authorization : 'Bearer '+ $rootScope.token
        },
        resumeChunkSize: p.filesize,
      });

      return upload;
    }


    function uploadFilesToServer(upload, methodName, objToPass){

      $scope.$emit('load_start', 2);

      upload.then(function (resp) {
        files_to_upload.push({ 
            name: resp.data.name,
            path: resp.data.path, 
            mime_type: resp.data.mime_type.replace('-', '/'),
            description: "No description",
        });

        post_images.push({ src: 'storage/'+resp.data.path+resp.data.name, alt:'', title: '', caption: p.desc, thumbnail: 'storage/'+resp.data.path+resp.data.name });
        
        if (files_to_upload.length == p.file.length) {
            var user_post = {
              files: files_to_upload,
              post: {
                privacy: p.privacy_status,
                description: p.desc
              }
            };

            /* Save post after file completely uploaded on server */
            savePost(methodName, objToPass);
        }

        console.log('mime_type: '+resp.data.mime_type.replace('-', '/'));

      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          $timeout(()=> { p.postingInProgress = false; }, 1000);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.$emit('load_start', progressPercentage);
          $scope.$emit('uploaded_file', { fileName: evt.config.data.file.name });
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });

    }

    function savePost(fn, user_post){
      let timer;
      if (fn.name == "savePostDescriptionOnly") { $scope.$emit('load_start', -1);  timer = 2000; $timeout(()=> { p.postingInProgress = false; }, 100); }
      fn({post: user_post,}).then(function(response){
        console.log(response.data);
        $timeout(()=> {$scope.$emit('upload_finished', { bool: false, post_images }); }, timer);
      }, function(err){
        console.log(err);
      });
    }

    function limitTagged(tagged){
      if (tagged.length == 2) {
        return 2;
      }
      return 1;
    }

}]);


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
 * @name pnhs_alumni.controller:taggedUserListCtrl
 * @description
 * # taggedUserListCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
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
'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:uploadingProgressCtrl
 * @description
 * # uploadingProgressCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
  app.controller('uploadingProgressCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', '$q', 'swalert', 'fileReader', 'apiService', 'Upload',
    function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, $q, swalert, fileReader, apiService, Upload) {

    var up = this;


}]);

