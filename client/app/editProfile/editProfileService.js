(function() {
  'use strict';

  angular
    .module('projectManager.editProfile')
    .factory('editProfileService', editProfileService);

  editProfileService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', '$cookies'];

  function editProfileService($http, BASE_URL, CONTENT_TYPE, $cookies){

    var service = {
      update: update
    };

    return service;

    ////////////////////////////

    function update(credentials){
      if (credentials.newPassword) {
        console.log($cookies.get('token'));
        return $http({
            method: 'PUT',
            headers: {
                'Content-Type': CONTENT_TYPE,
                'Authorization':'Bearer ' + $cookies.get('token')
            },
            url: BASE_URL + '/profile',
            data: 'email=' + credentials.email + '&name=' + credentials.name + '&position=' +
                  credentials.position + '&oldPassword=' + credentials.oldPassword + '&newPassword=' + credentials.newPassword
        }).success(function (data) {
            $cookies.put('token',data.token);
        }).error(function (err) {
            console.log(err);
        });
      }
      else{
        return $http({
            method: 'PUT',
            headers: {
                'Content-Type': CONTENT_TYPE,
                'Authorization':'Bearer ' + $cookies.get('token')
            },
            url: BASE_URL + '/profile',
            data: 'email=' + credentials.email + '&name=' + credentials.name + '&position=' +
                  credentials.position + '&oldPassword=' + credentials.oldPassword
        }).success(function (data) {
            $cookies.put('token',data.token);
        }).error(function (err) {
            console.log(err);
        });
      }
    }

  }

})();
