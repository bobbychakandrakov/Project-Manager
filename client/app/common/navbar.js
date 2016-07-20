(function() {
  'use strict';

  angular
    .module('projectManager')
    .directive('navbar', navbar)
    .controller('NavbarController', NavbarController);

  navbar.$inject = ['$location', '$rootScope', '$interval'];
  NavbarController.$inject = ['$scope','$location', '$rootScope','authenticationService','toastr'];

  function navbar($location, $rootScope, $interval){
    // Usage: ...
    var directive = {
      restrict: 'E',
      templateUrl: 'app/common/navbar.tpl.html',
      scope: {
      },
      link: link
    };
    return directive;

    ////////////////////////////

    function link(scope, element, attrs){

    }
  }

  function NavbarController($scope, $location, $rootScope, authenticationService, toastr) {
    $scope.showNavbar = showNavbar;
    $scope.logout = logout;
    $scope.isActive = isActive;
    function showNavbar() {
      if ($location.path() === '/') {
        return false;
      }
      return true;
    }
    function isActive(path) {
      if ($location.path() === path) {
        return true;
      }
      return false;
    }
    function logout() {
      authenticationService.logout();
      toastr.success("Successful logout!");
    }
  }

})();
