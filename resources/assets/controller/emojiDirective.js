angular
.module('pnhsApp').directive('emoji',['$sce', function($sce){
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