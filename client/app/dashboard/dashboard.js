(function() {
  'use strict';

  angular
    .module('projectManager.dashboard', [])
    .controller('DashboardController', DashboardController)
    .config(function ($routeProvider) {
      $routeProvider.when('/dashboard',{
        templateUrl:'app/dashboard/dashboard.view.html',
        controller:'DashboardController'
      });
    });

  DashboardController.$inject = ['$scope'];

  function DashboardController($scope){

  }

})();
