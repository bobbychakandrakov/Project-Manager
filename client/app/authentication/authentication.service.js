(function () {
    'use strict';

    angular
        .module('projectManager.authentication')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', '$rootScope', '$cookies'];

    function authenticationService($http, BASE_URL , CONTENT_TYPE, $rootScope, $cookies) {
        var currentUser = false;
        var service = {
            login: login,
            register: register,
            logout:logout,
            checkProfile : checkProfile,
            getCurrentUser:getCurrentUser
        };

        return service;

        function login(credentials) {
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': CONTENT_TYPE
                },
                url: BASE_URL + '/login',
                data: 'email=' + credentials.email + '&password=' + credentials.password
            }).success(function (data) {
                currentUser = true;
                $cookies.put('token',data.token);
            }).error(function (err) {
                console.log(err);
            });
        }

        function register(credentials) {
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': CONTENT_TYPE
                },
                url: BASE_URL + '/register',
                data: 'name=' + credentials.name + '&position=' + credentials.position + '&email=' + credentials.email +
                    '&password=' + credentials.password
            }).success(function (data) {
                console.log(data);
                console.log("Successfully registered!");
            }).error(function (err) {
                console.log(err);
            });
        }

        function logout() {
          $cookies.remove('token');
          currentUser = false;
          console.log('Logout success!');
        }

        function checkProfile() {
          return $http({
              method: 'GET',
              headers: {
                  'Content-Type': CONTENT_TYPE,
                  'Authorization': 'Bearer ' + $cookies.get('token')
              },
              url: BASE_URL + '/profile',
          }).success(function (data) {
              currentUser = true;
          }).error(function (err) {
              console.log(err);
          });
        }

        function getCurrentUser() {
          return currentUser;
        }

    }

})();
