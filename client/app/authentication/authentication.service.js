(function () {
    'use strict';

    angular
        .module('projectManager.authentication')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', '$rootScope', '$cookies'];

    function authenticationService($http, BASE_URL , CONTENT_TYPE, $rootScope, $cookies) {

        var service = {
            login: login,
            register: register,
            logout:logout
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
          console.log('Logout success!');
        }

    }

})();
