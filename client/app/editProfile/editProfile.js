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


    function update() {
      editProfileService.update({name:'genadi_genov',email:'genadi98@abv.bg',position:'Front-End',oldPassword:'123456',newPassword:'123456789'})
                        .then(function (data) {
                          console.log(data);
                        },function (err) {
                          console.log(err);
                        });
    }

  }

})();
