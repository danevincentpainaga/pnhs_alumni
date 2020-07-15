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