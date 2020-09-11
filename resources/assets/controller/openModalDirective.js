angular.module('pnhsApp').directive('openModal', function(){
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