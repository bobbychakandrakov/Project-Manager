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

  EditProfileController.$inject = ['$scope','editProfileService'];

  function EditProfileController($scope, editProfileService){

    $scope.update = update;
    editProfileService.getCurrentProfile().then(function (data) {
      console.log(data);
      $scope.user = data;
    },function (err) {
      console.log(err);
    });

    function update() {
      console.log($scope.user);
      editProfileService.update($scope.user).then(function (data) {
                          console.log(data);
                        },function (err) {
                          console.log(err);
                        });
    }

  }

})();
