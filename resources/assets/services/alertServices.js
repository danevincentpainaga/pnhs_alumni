app.factory('swalert',['$http', function($http){
  return{
    deleteInfo: function(obj, method){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          method(obj);
        }
      });
    },
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
        type: nofitificationType,
        title: message
      });
    },
    successAlert: function(message){
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Success!',
        text: message,
        showConfirmButton: false,
        timer: 1600
      });
    },
    errorAlert: function(message){
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        type: 'error',
        title: 'Error!',
        text: message,
        confirmButtonText: 'Ok'
      });
    },
    updateAlert: function(obj, method){
      Swal.fire({
        title: 'Update Details',
        text: "Proceed to update...",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          method(obj);
        }
      });
    },
    saveAlert: function(obj, method){
      Swal.fire({
        title: 'Save Details?',
        text: "Proceed to save...",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          method(obj);
        }
      });
    },
    noTimeoutSuccessAlert: function(message){
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        type: 'success',
        title: 'Successful!',
        text: message,
        confirmButtonText: 'Ok'
      });
    },
  }
}]);