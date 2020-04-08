app.factory('swalert',['$http', function($http){
  return{
    successInfo: function(message, nofitificationType, timeExpire){
      let time;
      timeExpire != undefined ? time = timeExpire : time = false;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: time
      });

      Toast.fire({
        icon: nofitificationType,
        title: message
      });
    },
  }
}]);