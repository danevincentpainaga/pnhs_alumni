var app = angular.module('pnhsApp');
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

app.filter('formatDescription',['$sce', function($sce){
  return function(input){

    let emoji = new EmojiConvertor();
    emoji.img_set = 'facebook';
    emoji.img_sets.facebook.path = 'node_modules/emoji-datasource-facebook/img/facebook/64/';

    return $sce.trustAsHtml(emoji.replace_colons(input));
  }
}]);