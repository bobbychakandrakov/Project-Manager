(function() {
  'use strict';

  angular
    .module('projectManager')
    .directive('navbar', navbar)
    .controller('NavbarController', NavbarController);

  navbar.$inject = ['$location', '$rootScope', '$interval'];
  NavbarController.$inject = ['$scope','$location', '$rootScope'];

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

  function NavbarController($scope, $location, $rootScope) {
    $scope.showNavbar = showNavbar;
    function showNavbar() {
      if ($location.path() === '/') {
        return false;
      }
      return true;
    }
  }

})();
