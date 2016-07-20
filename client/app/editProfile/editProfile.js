(function() {
  'use strict';

  angular
    .module('projectManager.editProfile', [])
    .controller('EditProfileController', EditProfileController)
    .config(function ($routeProvider) {
      $routeProvider.when('/profile',{
        templateUrl: 'app/editProfile/editProfile.view.html',
        controller:'EditProfileController'
      });
    });

  EditProfileController.$inject = ['$scope'];

  function EditProfileController($scope){

    $scope.name = 'Boyan';

  }

})();
