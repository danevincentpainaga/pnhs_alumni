app.factory('apiService', ['$http', '$cookies', '$rootScope', function($http, $cookies, $rootScope){
	return{
    validateLogin: function(credData){
      return $http({
        method:'POST',
        url: baseUrl+'api/login',
        data: credData,
        headers: {
          Accept: "application/json",   
        }
      });
    },
    AuthenticatedUser: function(){
      var status = $cookies.get('auth');
        if(status){
          return true;
        }else{
          return false;
        }
    },
    uploadProfilePic: function(formData){
      return $http({
        method:'POST',
        url: baseUrl+'api/uploadProfilePic',
        data: formData,
        headers: {
          "Content-Type": undefined,
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    savePost: function(post){
      return $http({
        method:'POST',
        url: baseUrl+'api/savePost',
        data: post,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    
	}
}]);