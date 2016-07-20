(function () {
    'use strict';

    angular
        .module('projectManager.authentication')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', 'BASE_URL', 'CONTENT_TYPE', '$rootScope'];

    function authenticationService($http, BASE_URL , CONTENT_TYPE, $rootScope) {

        var service = {
            login: login,
            register: register
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
                $rootScope.name = data.name;
                console.log('Login success!');
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

    }

})();
