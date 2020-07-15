/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/services/httpServices.js":
/*!***************************************************!*\
  !*** ./resources/assets/services/httpServices.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

app.factory('apiService', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
  return {
    validateLogin: function validateLogin(credData) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/login',
        data: credData,
        headers: {
          Accept: "application/json"
        }
      });
    },
    AuthenticatedUser: function AuthenticatedUser() {
      var status = $cookies.get('auth');

      if (status) {
        return true;
      } else {
        return false;
      }
    },
    uploadProfilePic: function uploadProfilePic(formData) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/uploadProfilePic',
        data: formData,
        headers: {
          "Content-Type": undefined,
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getUserAccounts: function getUserAccounts() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getUserAccounts',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateNameAddress: function updateNameAddress(newNameAdress) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateNameAddress',
        data: newNameAdress,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateUserAdditionalDetails: function updateUserAdditionalDetails(profileInfo) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateUserAdditionalDetails',
        data: profileInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateJob: function updateJob(job) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateJob',
        data: job,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getUserLoggedEducationalBackground: function getUserLoggedEducationalBackground() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getUserLoggedEducationalBackground',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateEducation: function updateEducation(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveEducation: function saveEducation(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeEducations: function removeEducations(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeEducations',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getWorkExperience: function getWorkExperience() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getWorkExperience',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveWorkExperience: function saveWorkExperience(workExp) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateWorkExperience: function updateWorkExperience(workExp) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeWorkExperience: function removeWorkExperience(workExp) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getSkills: function getSkills() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getSkills',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeSkills: function removeSkills(skill) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeSkills',
        data: skill,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getUserLoggedBusinesses: function getUserLoggedBusinesses() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getUserLoggedBusinesses',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveBusiness: function saveBusiness(business) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateBusiness: function updateBusiness(business) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeBusiness: function removeBusiness(business) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    }
  };
}]);

/***/ }),

/***/ 2:
/*!*********************************************************!*\
  !*** multi ./resources/assets/services/httpServices.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\pnhs_alumni\resources\assets\services\httpServices.js */"./resources/assets/services/httpServices.js");


/***/ })

/******/ });