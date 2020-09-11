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