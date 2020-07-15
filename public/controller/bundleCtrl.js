'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('aboutCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$q', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $q, apiService, swalert) {

    var a = this;
    a.updatingNameAddress = "Update";
    a.updatingProfile = "Update";
    a.updatingJob = "Update";
    a.add_status = "Save";
    a.add_work_exp = "Save";
    a.add_business = "Save";

    getUserAccounts();
    getSkills();
    getWorkExperience();
    getUserLoggedEducationalBackground();
    getUserLoggedBusinesses();

    $scope.$on('educationDetailsFromEditEducationCtrl', function(val, obj){
      a.educations.splice(a.educations.indexOf(obj), 1);
    });

    $scope.$on('workExperienceFromeditWorkExperienceCtrl', function(val, obj){
      a.work_experiences.splice(a.work_experiences.indexOf(obj), 1);
    });
  
    $scope.$on('businessDetailsFromeditBusinessCtrl', function(val, obj){
      a.businesses.splice(a.businesses.indexOf(obj), 1);
    });   
    
    a.showSkillsInput = function(){
      a.show_skills_add_input = true;
    }

    a.showBusinessInput = function(){
      a.show_business_input = true;
    }

    a.updateNameAddress = function(){
      a.updating_name_address = true;
      a.updatingNameAddress = "Updating...";
      let newNameAdress = {
        'firstname': a.firstname,
        'middlename': a.middlename,
        'lastname': a.lastname,
        'address': a.address,
      }
      a.p.firstname = a.firstname;
      a.p.middlename = a.middlename;
      a.p.lastname = a.lastname;
      a.p.address = a.address;
      updateNameAddress(newNameAdress);
      console.log(newNameAdress);
    }

    a.editProfileNameAddress = function(p){
      a.p = p;
      a.firstname = p.firstname;
      a.middlename = p.middlename;
      a.lastname = p.lastname;
      a.address = p.address;
      a.editing_profilename = true;
    }

    a.editProfileDetails = function(p){
      a.p = p;
      a.contact_no = p.contact_no;
      a.gender = p.gender;
      a.birthdate = p.birthdate;
      a.relationship_status = p.relationship_status;
      a.permanent_address = p.permanent_address;
      a.editing_profile = true;
    }

    a.updateUserAdditionalDetails = function(){
      a.updating_profile = true;
      a.updatingProfile = "Updating...";
      let profileInfo = {
        'contact_no': a.contact_no,
        'gender': a.gender,
        'birthdate': a.birthdate,
        'relationship_status': a.relationship_status,
        'permanent_address': a.permanent_address
      }
      a.p.contact_no = a.contact_no;
      a.p.gender = a.gender;
      a.p.birthdate = a.birthdate;
      a.p.relationship_status = a.relationship_status;
      a.p.permanent_address = a.permanent_address;
      updateUserAdditionalDetails(profileInfo);
    }

    a.editJob = function(p){
      a.p = p;
      a.company = p.company;
      a.job = p.job;
      a.job_started = p.job_started;
      a.editing_job = true;
    }

    a.updateJob = function(){
      a.updating_job = true;
      a.updatingJob = "Updating...";
      let job = {
        'company': a.company,
        'job': a.job,
        'job_started': a.job_started
      }
      a.p.company = a.company;
      a.p.job = a.job;
      a.p.job_started = a.job_started;
      updateJob(job);
    }

    a.addingEducation = function(){
      a.education_adding = true;
    }

    a.addEducation = function(){
      a.add_status = "Saving...";
      let addedEducation = {
        'degree':a.degree,
        'year_graduated':a.year_graduated,
        'school':a.school,
        'remarks': a.remarks
      };
      saveEducation(addedEducation);        
    }

    a.addSkill = function(skill){
      addAlumniSkills({'alumniId': $rootScope.u_alumniId, 'skills': skill})
    }

    a.showWorkExpInput = function(){
      a.showWorkExp = true;
    }

    a.saveWorkExperience = function(){
      a.add_work_exp = "Saving...";
      let workExperience = {
        'company_name': a.company_name,
        'position': a.position,
        'start_date': a.start_date,
        'end_date': a.end_date
      };
      saveWorkExperience(workExperience);
    }

    a.saveBusiness = function(){
      a.add_business = "Saving...";
      let business = {
        'business_name': a.business_name,
        'business_type': a.business_type,
        'business_started': a.business_started
      };
      saveBusiness(business);      
    }

    a.cancelNameAddressEdit = function(){
      a.editing_profilename = false;
    }

    a.cancelProfileEdit = function(){
      a.editing_profile = false;
    }

    a.cancelJobEdit = function(){
      a.editing_job = false;
    }

    a.cancelAdding = function(){
      a.education_adding = false;
      a.add_status = "Add";
    }

    a.cancelAddWorkExp = function(){
      a.showWorkExp = false;
    }

    a.cancelAddingSkill = function(){
      a.skill = "";
      a.show_skills_add_input = false;
    }

    a.cancelAddingBusiness = function(){
      a.show_business_input = false;
    }

    a.removeSkills = function(skill){
      swalert.deleteInfo(skill, removeSkills);
    }

    function getUserAccounts() {
      apiService.getUserAccounts().then(function(response){
        a.user_profile = response.data;
        console.log(a.user_profile);
        a.gender = response.data.gender;
      }, function(error){
        console.log(error);
      });
    }

    function updateNameAddress(newNameAdress){
      apiService.updateNameAddress(newNameAdress).then(function(response){
        console.log(response.data);
        a.updating_name_address = false;
        a.editing_profilename = false;
        a.updatingNameAddress = "Update";
        swalert.successAlert(response.data.message);
      }, function(err){
        console.log(err);
      });
    }

    function getUserLoggedEducationalBackground(){
      apiService.getUserLoggedEducationalBackground().then(function(response){
        a.educations = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
    }

    function saveEducation(education){
      apiService.saveEducation(education).then(function(response){
        a.educations.unshift(response.data);
        console.log(response);
        a.degree = ""
        a.year_graduated = ""
        a.school = ""
        a.remarks = ""
        a.education_adding = false;
        a.add_status = "Save";
        swalert.successAlert('Successfully Added');
      }, function(err){
        console.log(err);
      });
    }

    function getWorkExperience(){
      apiService.getWorkExperience().then(function(response){
        a.work_experiences = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function saveWorkExperience(workExp){
      apiService.saveWorkExperience(workExp).then(function(response){
        a.work_experiences.unshift(response.data);
        console.log(response);
        a.company_name = "";
        a.position = "";
        a.start_date = "";
        a.end_date = "";
        a.add_work_exp = "Save";
        a.showWorkExp = false;
        swalert.successAlert('Successfully Added');
      }, function(err){
        console.log(err);
      });
    }

    function updateUserAdditionalDetails(profileInfo){
      apiService.updateUserAdditionalDetails(profileInfo).then(function(response){
        console.log(response.data);
        a.updating_profile = false;
        a.editing_profile = false;
        a.updatingProfile = "Update";
        swalert.successAlert(response.data.message);
      }, function(err){
        console.log(err);
      });
    }

    function updateJob(job){
      apiService.updateJob(job).then(function(response){
        console.log(response.data);
        a.updating_job = false;
        a.editing_job = false;
        a.updatingJob = "Update";
        swalert.successAlert(response.data.message);
      }, function(err){
        console.log(err);
      });
    }

    function getSkills(){
      apiService.getSkills().then(function(response){
        a.skills = response.data;
        checkIfSkillsIsEmpty(a.skills);
      }, function(error){
        console.log(error);
      });
    }

    function removeSkills(skill) {
      apiService.removeSkills(skill).then(function(response){
        console.log(response.data);
        a.skills.splice(a.skills.indexOf(skill), 1);
        checkIfSkillsIsEmpty(a.skills);
        swalert.successInfo(response.data.message, 'success', 1000);
      }, function(error){
        console.log(error);
      });
    }

    function getUserLoggedBusinesses(){
      apiService.getUserLoggedBusinesses().then(function(response){
        a.businesses = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function saveBusiness(business){
      apiService.saveBusiness(business).then(function(response){
        a.businesses.unshift(response.data);
        a.show_business_input = false;
        a.add_business = "Save";
        a.business_type = "";
        a.business_name = "";
        a.business_started = "";
        swalert.successInfo('Successful', 'success', 1000);
      }, function(err){
        console.log(err);
      });
    }

    function checkIfSkillsIsEmpty(response){
      if (response.length > 0) {
        a.emptySkills = false;
      }
      else{
        a.emptySkills = true;
      }
    }

 }]);





// *** Controller for updateEducationCustomDirective *** //

app.controller('editEducationCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {

  var ec = this;
  ec.update_status = "Update";

  ec.editEducation = function(educ){
    ec.selected_education = educ;
    ec.education_id = educ.education_id;
    ec.degree = educ.degree;
    ec.school = educ.school;
    ec.year_graduated = educ.year_graduated;
    ec.remarks = educ.remarks;
    ec.education_editing = true;
  }

  ec.cancelEditing = function(){
    ec.education_editing = false;
  }

  ec.updateEducation= function(){
    ec.update_status = "Updating...";
    let updatedEducation = {
      'degree':ec.degree,
      'school':ec.school,
      'year_graduated':ec.year_graduated,
      'education_id': ec.education_id,
      'remarks': ec.remarks,
    };
    ec.selected_education.degree = ec.degree;
    ec.selected_education.school = ec.school;
    ec.selected_education.year_graduated = ec.year_graduated;
    updateEducation(updatedEducation);
  }

  ec.removeEducation = function(educationDetails){
    swalert.deleteInfo(educationDetails, removeEducations);
  }

  function updateEducation(educationDetails){
    apiService.updateEducation(educationDetails).then(function(response){
      swalert.successAlert(response.data.message);
      ec.education_editing = false;
      ec.update_status = "Update";
    },function(err){
      console.log(err);
    });
  }

  function removeEducations(educationDetails){
    apiService.removeEducations(educationDetails).then(function(response){
      $scope.$emit('educationDetailsFromEditEducationCtrl', educationDetails);
      swalert.successAlert(response.data.message);
    },function(err){
      console.log(err);
    });
  }


}]);


// *** Controller for updateWorkExperienceCustomDirective *** //

app.controller('editWorkExperienceCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {

  var wc = this;
  wc.update_status = "Update";

  wc.editWorkExperience = function(w){
    wc.selected_workexp = w;
    wc.work_experience_id  = w.work_experience_id ;
    wc.company_name = w.company_name;
    wc.position = w.position;
    wc.start_date = w.start_date;
    wc.end_date = w.end_date;
    wc.workexp_editing = true;
  }

  wc.cancelEditing = function(){
    wc.workexp_editing = false;
  }

  wc.updateWorkExperience= function(){
    wc.update_status = "Updating...";
    let updatedWorkexp = {
      'company_name':wc.company_name,
      'position':wc.position,
      'start_date':wc.start_date,
      'end_date': wc.end_date,
      'work_experience_id': wc.work_experience_id ,
    };
    wc.selected_workexp.company_name = wc.company_name;
    wc.selected_workexp.position = wc.position;
    wc.selected_workexp.start_date = wc.start_date;
    wc.selected_workexp.end_date = wc.end_date;
    updateWorkExperience(updatedWorkexp);
  }

  wc.removeWorkExperience = function(workexpDetails){
    swalert.deleteInfo(workexpDetails, removeWorkExperience);
  }

  function updateWorkExperience(workexpDetails){
    apiService.updateWorkExperience(workexpDetails).then(function(response){
      swalert.successAlert(response.data.message);
      console.log(response);
      wc.workexp_editing = false;
      wc.update_status = "Update";
    },function(err){
      console.log(err);
    });
  }

  function removeWorkExperience(workexpDetails){
    apiService.removeWorkExperience(workexpDetails).then(function(response){
      $scope.$emit('workExperienceFromeditWorkExperienceCtrl', workexpDetails);
      swalert.successAlert(response.data.message);
      console.log(response);
    },function(err){
      console.log(err);
    });
  }


}]);


// *** Controller for updateBusinessCustomDirective *** //

app.controller('editBusinessCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {

  var bc = this;

  bc.update_status = "Update";

  bc.editBusiness = function(b){
    bc.selected_business = b;
    bc.business_id   = b.business_id  ;
    bc.business_type = b.business_type;
    bc.business_name = b.business_name;
    bc.business_started = b.business_started;
    bc.business_editing = true;
  }

  bc.cancelEditing = function(){
    bc.business_editing = false;
  }

  bc.updateBusiness= function(){
    bc.update_status = "Updating...";
    let updatedBusiness = {
      'business_type':bc.business_type,
      'business_name':bc.business_name,
      'business_started':bc.business_started,
      'business_id': bc.business_id
    };
    bc.selected_business.business_type = bc.business_type;
    bc.selected_business.business_name = bc.business_name;
    bc.selected_business.business_started = bc.business_started;
    bc.selected_business.business_id = bc.business_id;
    updateBusiness(updatedBusiness);
  }

  bc.removeBusiness = function(businessDetails){
    swalert.deleteInfo(businessDetails, removeBusiness);
  }

  function updateBusiness(businessDetails){
    apiService.updateBusiness(businessDetails).then(function(response){
      swalert.successAlert(response.data.message);
      console.log(response);
      bc.business_editing = false;
      bc.update_status = "Update";
    },function(err){
      console.log(err);
    });
  }

  function removeBusiness(businessDetails){
    apiService.removeBusiness(businessDetails).then(function(response){
      $scope.$emit('businessDetailsFromeditBusinessCtrl', businessDetails);
      swalert.successAlert(response.data.message);
      console.log(response);
    },function(err){
      console.log(err);
    });
  }


}]);


app.filter('status', function(){
  return function(status){
    if (status) {
      return status;
    }
    else{
      return 'None';
    }
  }
});

app.directive('updateEducation', function(){
    return {
      restrict: 'E',
      scope: {
        education: '='
      },
      templateUrl:'views/edit_education_template_directive.html',
      controller: 'editEducationCtrl',
      controllerAs: 'ec',
    }
 });

app.directive('updateWorkExperience', function(){
    return {
      restrict: 'E',
      scope: {
        workexp: '='
      },
      templateUrl:'views/edit_workexperience_template_directive.html',
      controller: 'editWorkExperienceCtrl',
      controllerAs: 'wc',
    }
 });

app.directive('updateBusiness', function(){
    return {
      restrict: 'E',
      scope: {
        business: '='
      },
      templateUrl:'views/edit_business_template_directive.html',
      controller: 'editBusinessCtrl',
      controllerAs: 'bc',
    }
 });
'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:addUserCtrl
 * @description
 * # addUserCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('addUserCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$q', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $q, apiService, swalert) {

    var au = this;

 }]);


'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:dashboardCtrl
 * @description
 * # dashboardCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('dashboardCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert', 'fileReader',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, fileReader) {

    var db = this;
    db.editBtnText = 'Edit Photo';
    db.user_photo_copy = angular.copy($rootScope.user_photo);
    var auth = $cookies.getObject('auth');

    db.navigate = function(destination){
      $location.path(destination);
    }


  db.getTheFiles  = function(file){
    db.file = file[0];
    var formdata = new FormData();
        formdata.append('file', file[0]);
        formdata.append('id', $rootScope.loggedId);
        fileReader.readAsDataUrl(db.file, $scope)
          .then(function(result) {
            $timeout(function() {
              $rootScope.user_photo = result;
              db.data = formdata;
              console.log(db.data);
              db.updating = true;
            });
          }, function(err){
            console.log(err);
            db.updating = false;
            $rootScope.user_photo = db.user_photo_copy;
          });
  }

  db.updateProfilePic = function(){
    db.updating = false;
    db.editBtnText = 'Uploading...';
    uploadProfilePic(db.data);
  }

  function uploadProfilePic(photo){
    apiService.uploadProfilePic(photo).then(function(response){
      console.log(response)
      let newCookie = {
        success: {
          token: auth.success.token
        },
        id: auth.id,
        role: auth.role,
        province_id: auth.province_id,
        municipality_id: auth.municipality_id,
        name: auth.name,
        user_photo: response.data,
      };
      $cookies.putObject('auth', newCookie);
      db.editBtnText = 'Edit Photo';
      swalert.uploadSuccessInfo("Photo updated!", 'success', 2000);
    }, function(err){
      console.log(err);
    });
  }

}]);

app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
            element.val(null);
        });
    };

    return {
        link: fn_link
    }
}]);

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();
      if(file){
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
      }
      else{
        deferred.reject(file);
      }

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});

'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('loginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var lg = this;
  lg.valid= true;
  lg.buttonMessage = 'Sign In';
  lg.loginBtn = false;

  lg.login =function(){
    if(!lg.email || !lg.password){
      console.log('unAuthenticated');
    }else{
      lg.loginBtn = true;
      lg.buttonMessage = 'Signing In...';
      
      swalert.successInfo("<label>Checking Identity...</label>", 'info');
      var credentials = {
        email: lg.email,
        password: lg.password
      };
      console.log(credentials);

      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          console.log(response);
          $timeout(function() {  $location.path('/'); $scope.$emit("Authenticated"); lg.loginBtn = false; });
      }, function(err){
        console.log(err);
        err.data.error === "Unauthorised" ?
          swalert.successInfo("<label class='red'>Incorrect Username/password!</label>", 'error' ) : 
          swalert.successInfo("<label class='red'>"+err.data.error+"!</label>", 'error' );
          lg.buttonMessage = 'Sign In';
          lg.loginBtn = false;
          $location.path('/login');
      });
    }
  }


}]);

'use strict';
/**
 * @ngdoc function
 * @name pnhs_alumni.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the pnhs_alumni
 */

var app = angular.module('pnhsApp')
	app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert', 'socket', 
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert, socket) {

	$scope.accountName = "danepainaga";
	
	$scope.navigateToProfile = function(){
		$location.path('profile/'+$scope.accountName);
	}

	$scope.navigate = function(destination){
		$location.path(destination);
	}

	$scope.logout= function(){
		$window.location.reload();
		$cookies.remove('auth');
	}
	
	$scope.$on('Authenticated', function(){
		swalert.successInfo("<label>Welcome "+$scope.accountName+"!</label>", 'success', 2000);
	});
	
    socket.on('test-channel', function(data) {
    	console.log(data);
    	alert();
    });

}]);

app.filter('checkPostPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    else{
      return 'images/user.jpg';
    }
  }
});

app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            scope.style = function () {
                return {
                  'min-height': (newValue.h - 0) + 'px',
                  'max-height': (newValue.h - 0) + 'px'
                };
            };
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});

	app.directive('stats', function(){
		return{
	      restrict: 'A',
	      scope: true,
	      link: function(scope, elem, attrs) {
			const root = document.querySelector("body, html");
			const container = document.querySelector('.gg-container');
			const images = document.querySelectorAll(".gg-box > img");

			elem.on('click', function(){
			    var currentImg = this;
			    const parentItem = currentImg.parentElement, screenItem = document.createElement('div');
			    screenItem.id = "gg-screen";
			    container.prepend(screenItem);
			    if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
			    var route = currentImg.src;
			  	console.log(route);
			    root.style.overflow = 'hidden';
			    screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
			    // const first = images[0].src, last = images[l-1].src;
			    const first = "http://localhost:8000/#!/uploads/zoe.jpg", last = "http://localhost:8000/#!/uploads/user.jpg";
			    const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
			    imgItem.innerHTML = '<img src="' + route + '">';
			    
			    var nextImg = currentImg.nextElementSibling;
			    var prevImg = currentImg.previousElementSibling;
			    var nextImg = currentImg.nextElementSibling;
			    // if (3 > 1) {
			    //   if (route == first) {
			    //     prevBtn.hidden = true;
			    //     var prevImg = false;
			    //     var nextImg = currentImg.nextElementSibling;
			    //   }
			    //   else if (route == last) {
			    //     nextBtn.hidden = true;
			    //     var nextImg = false;
			    //     var prevImg = currentImg.previousElementSibling;
			    //   }
			    //   else {
			    //     var prevImg = currentImg.previousElementSibling;
			    //     var nextImg = currentImg.nextElementSibling;
			    //   }
			    // }
			    // else {
			    //   prevBtn.hidden = true;
			    //   nextBtn.hidden = true;
			    // }
						
			    screenItem.addEventListener("click", function(e) {
			      if (e.target == this || e.target == close) hide();
			    });

			    root.addEventListener("keydown", function(e) {
			      if (e.keyCode == 37 || e.keyCode == 38) prev();
			      if (e.keyCode == 39 || e.keyCode == 40) next();
			      if (e.keyCode == 27 ) hide();
			    });

			    prevBtn.addEventListener("click", prev);
			    nextBtn.addEventListener("click", next);

			    function prev() {
			      prevImg = currentImg.previousElementSibling;
			      imgItem.innerHTML = '<img src="' + prevImg.src + '">';
			      currentImg = currentImg.previousElementSibling;
			      var mainImg = document.querySelector(".gg-image > img").src;
			      nextBtn.hidden = false;
			      prevBtn.hidden = mainImg === first;
			    };

			    function next() {
			      nextImg = currentImg.nextElementSibling;
			      imgItem.innerHTML = '<img src="' + nextImg.src + '">';
			      currentImg = currentImg.nextElementSibling;
			      var mainImg = document.querySelector(".gg-image > img").src;
			      prevBtn.hidden = false;
			      nextBtn.hidden = mainImg === last;
			    };

			    function hide() {
			      root.style.overflow = 'auto';
			      screenItem.remove();
			    };

			});
	      }

		}
	});


app.factory('socket', function ($rootScope) {
  var socket = io.connect('127.0.0.1:8000');
  return {
      on: function (eventName, callback) {
          socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  callback.apply(socket, args);
              });
          });
      },
      emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  if (callback) {
                      callback.apply(socket, args);
                  }
              });
          })
      }
  };
});
'use strict';

/**
 * @ngdoc function
 * @name pnhs_alumni.controller:userAccountsCtrl
 * @description
 * # userAccountsCtrl
 * Controller of the Senior pnhs_alumni
 */ 
var app = angular.module('pnhsApp')
  app.controller('userAccountsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var u = this;


}]);