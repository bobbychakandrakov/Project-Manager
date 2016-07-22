(function () {
    'use strict';

    angular
        .module('projectManager.authentication')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', 'ipCookie', '$sessionStorage', '$q'];

    function authenticationService($http, BASE_URL , CONTENT_TYPE, ipCookie, $sessionStorage, $q) {
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
                if (credentials.remember) {
                  ipCookie('token',data.token, {expires: 30});
                }
                $sessionStorage.token = data.token;
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
              currentUser = true;
              ipCookie('token',data.token, {expires: 30});
            }).error(function (err) {
                console.log(err);
            });
        }

        function logout() {
          ipCookie.remove('token');
          $sessionStorage.$reset();
          currentUser = false;
          console.log('Logout success!');
        }

        function checkProfile() {
          var deffered = $q.defer();
          var token = ipCookie('token') || $sessionStorage.token;
          if (!token) {
            deffered.reject();
          }
          else{
            $http({
                method: 'GET',
                headers: {
                    'Content-Type': CONTENT_TYPE,
                    'Authorization': 'Bearer ' + token
                },
                url: BASE_URL + '/profile',
            }).success(function (data) {
                currentUser = true;
                deffered.resolve();
            }).error(function (err) {
                console.log(err);
                deffered.reject();
            });
          }
          return deffered.promise;
        }

        function getCurrentUser() {
          return currentUser;
        }

    }

})();
