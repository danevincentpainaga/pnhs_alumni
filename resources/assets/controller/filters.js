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
