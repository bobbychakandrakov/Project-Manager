(function () {
    'use strict';

    angular
        .module('projectManager.authentication', [])
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', 'authenticationService', '$location', 'toastr', '$route'];

<<<<<<< HEAD
    function AuthenticationController($scope, authenticationService, $location, toastr, $route) {

        $scope.loginUser = {
            password: '',
            email: ''
        };
=======
  function AuthenticationController($scope, authenticationService, $location, toastr){
    authenticationService.checkProfile().then(function () {
      $location.path('/dashboard');
    },function () {

    });
    $scope.loginUser = {
      password:'',
      email:''
    };
>>>>>>> 8c90d3662adb956fd378848836b6b895520f5dac

        $scope.registerUser = {
            name: '',
            password: '',
            position: '',
            email: ''
        };

        $scope.login = login;

        $scope.register = register;

        function login(LoginForm) {
            if (LoginForm.$valid) {
                authenticationService.login($scope.loginUser).then(function (data) {
                    toastr.success('Welcome!');
                    $location.path('/dashboard');
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                toastr["error"]("Login Failed!");
            }
        }

        function register(RegisterForm) {
            if (RegisterForm.$valid) {
                console.log($scope.registerUser);
                authenticationService.register($scope.registerUser).then(function (data) {
                    console.log(data);
                    toastr["success"]("Success!");
                    $route.reload();
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                toastr["error"]("Register Failed!");
            }
        }

        $('#login-form-link').click(function (e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function (e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

    }

})();
