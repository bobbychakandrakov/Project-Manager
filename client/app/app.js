(function() {
  'use strict';

  angular.module('projectManager', [
    'ngRoute',
    'angularify.semantic',
    'projectManager.authentication'
  ])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });

    $routeProvider
    .when('/',{
      templateUrl:'app/authentication/authentication.view.html',
      controller:'AuthenticationController'
    })
    .otherwise({redirectTo:'/'});
  });

})();
