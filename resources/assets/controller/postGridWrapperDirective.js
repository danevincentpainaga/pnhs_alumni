angular.module('pnhsApp').directive('postGridWrapper', function(){

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