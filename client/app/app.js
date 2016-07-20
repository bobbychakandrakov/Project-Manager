(function() {
  'use strict';

  angular.module('projectManager', [
    'ngRoute',
    'projectManager.authentication',
    'projectManager.dashboard'
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
  })
  .constant('BASE_URL','http://localhost:7777/api')
  .constant('CONTENT_TYPE', 'application/x-www-form-urlencoded; charset=UTF-8');

})();
