(function() {
  'use strict';

  angular
    .module('projectManager.authentication', [])
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope','authenticationService'];

  function AuthenticationController($scope,authenticationService){

    $scope.user = {
      name:'',
      password:'',
      position:'',
      email:''
    };

    $scope.login = login;

    function login() {
      console.log($scope.user);
      authenticationService.login($scope.user).then(function (data) {
        console.log(data);
      },function (err) {
        console.log(err);
      });
    }
    
    function register() {
      authenticationService.register($scope.user).then(function (data) {
        console.log(data);
      }, function (err) {
        console.log(err);
      })
    }

    $scope.register = register;

  }

})();
