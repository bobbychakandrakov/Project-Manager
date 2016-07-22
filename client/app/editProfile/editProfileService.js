(function() {
  'use strict';

  angular
    .module('projectManager.editProfile')
    .factory('editProfileService', editProfileService);

  editProfileService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', 'ipCookie', '$sessionStorage', '$q'];

  function editProfileService($http, BASE_URL, CONTENT_TYPE, ipCookie, $sessionStorage, $q){

    var service = {
      update: update,
      getCurrentProfile: getCurrentProfile
    };

    return service;

    ////////////////////////////

    function update(credentials){
      var remember = false;
      var token = "";
      if (ipCookie('token')) {
        remember = true;
        token = ipCookie('token');
      }
      else {
        token = $sessionStorage.token;
      }
      console.log(token);
      if (credentials.newPassword) {
        return $http({
            method: 'PUT',
            headers: {
                'Content-Type': CONTENT_TYPE,
                'Authorization':'Bearer ' +  token
            },
            url: BASE_URL + '/profile',
            data: 'email=' + credentials.email + '&name=' + credentials.name + '&position=' +
                  credentials.position + '&oldPassword=' + credentials.oldPassword + '&newPassword=' + credentials.newPassword
        }).success(function (data) {
            if (remember) {
              ipCookie('token', data.token);
            }
            else{
              $sessionStorage.token = data.token;
            }
        }).error(function (err) {
            console.log(err);
        });
      }
      else{
        return $http({
            method: 'PUT',
            headers: {
                'Content-Type': CONTENT_TYPE,
                'Authorization':'Bearer ' + token
            },
            url: BASE_URL + '/profile',
            data: 'email=' + credentials.email + '&name=' + credentials.name + '&position=' +
                  credentials.position + '&oldPassword=' + credentials.oldPassword
        }).success(function (data) {
          if (remember) {
            ipCookie('token', data.token);
          }
          else{
            $sessionStorage.token = data.token;
          }
        }).error(function (err) {
            console.log(err);
        });
      }
    }

    function getCurrentProfile() {
      var token = "";
      var deffered = $q.defer();
      if (ipCookie('token')) {
        token = ipCookie('token');
      }
      else {
        token = $sessionStorage.token;
      }
      $http({
          method: 'GET',
          headers: {
              'Content-Type': CONTENT_TYPE,
              'Authorization':'Bearer ' + token
          },
          url: BASE_URL + '/profile'
      }).success(function (data) {
         deffered.resolve(data);
      }).error(function (err) {
          deffered.reject(err);
      });
      return deffered.promise;
    }

  }

})();
