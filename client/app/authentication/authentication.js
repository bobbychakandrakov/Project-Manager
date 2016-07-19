(function() {
  'use strict';

  angular
    .module('projectManager.authentication', [])
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope','authenticationService'];

  function AuthenticationController($scope,authenticationService){

    $scope.loginUser = {
      password:'',
      email:''
    };

    $scope.registerUser = {
      name:'',
      password:'',
      position:'',
      email:''
    };

    $scope.login = login;

    $scope.register = register;

    function login() {
      console.log($scope.loginUser);
      authenticationService.login($scope.loginUser).then(function (data) {
        console.log(data);
      },function (err) {
        console.log(err);
      });
    }

    function register() {
      console.log($scope.registerUser);
      authenticationService.register($scope.registerUser).then(function (data) {
        console.log(data);
      }, function (err) {
        console.log(err);
      });
    }

    $('#login-form-link').click(function(e) {
   		$("#login-form").delay(100).fadeIn(100);
    		$("#register-form").fadeOut(100);
   		$('#register-form-link').removeClass('active');
   		$(this).addClass('active');
   		e.preventDefault();
   	});
   	$('#register-form-link').click(function(e) {
   		$("#register-form").delay(100).fadeIn(100);
    		$("#login-form").fadeOut(100);
   		$('#login-form-link').removeClass('active');
   		$(this).addClass('active');
   		e.preventDefault();
   	});

  }

})();
