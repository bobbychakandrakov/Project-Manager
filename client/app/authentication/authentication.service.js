(function () {
    'use strict';

    angular
        .module('projectManager.authentication')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http'];

    function authenticationService($http) {

        var service = {
            login: login,
            register: register
        };

        return service;

        function login(credentials) {
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: 'http://localhost:7777/api/login',
                data: 'email=' + credentials.email + '&password=' + credentials.password
            }).success(function (data) {
                console.log('Login success!');
            }).error(function (err) {
                console.log(err);
            });
        }

        function register(credentials) {
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: 'http://localhost:7777/api/register',
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
