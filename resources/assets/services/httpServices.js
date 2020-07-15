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

    getUserAccounts: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getUserAccounts',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    updateNameAddress: function(newNameAdress){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateNameAddress',
        data: newNameAdress,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateUserAdditionalDetails: function(profileInfo){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateUserAdditionalDetails',
        data: profileInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateJob: function(job){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateJob',
        data: job,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getUserLoggedEducationalBackground: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getUserLoggedEducationalBackground',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateEducation: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveEducation: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeEducations: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeEducations',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getWorkExperience: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getWorkExperience',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveWorkExperience: function(workExp){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateWorkExperience: function(workExp){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeWorkExperience: function(workExp){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getSkills: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getSkills',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeSkills: function(skill){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeSkills',
        data: skill,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getUserLoggedBusinesses: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getUserLoggedBusinesses',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveBusiness: function(business){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateBusiness: function(business){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeBusiness: function(business){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

  }
}]);