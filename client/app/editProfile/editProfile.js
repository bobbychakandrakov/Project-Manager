(function () {
    'use strict';

    angular
        .module('projectManager.editProfile', [])
        .controller('EditProfileController', EditProfileController)
        .config(function ($routeProvider) {
            $routeProvider.when('/profile', {
                templateUrl: 'app/editProfile/editProfile.view.html',
                controller: 'EditProfileController'
            });
        });

    EditProfileController.$inject = ['$scope', 'editProfileService', '$location'];

    function EditProfileController($scope, editProfileService, $location) {

        $scope.update = update;
        editProfileService.getCurrentProfile().then(function (data) {
            console.log(data);
            $scope.user = data;
        }, function (err) {
            console.log(err);
        });

        function update(UpdateForm) {
            if (UpdateForm.$valid) {

                console.log($scope.user);
                editProfileService.update($scope.user).then(function (data) {
                    console.log(data);
                    $location.path('/dashboard')
                    toastr.info('Profile Successfully updated!');
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                toastr.error('Updating Profile failed!');
            }
        }

    }

})();
