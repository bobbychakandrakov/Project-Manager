(function() {
  'use strict';

  angular.module('projectManager', [
    'ngRoute',
    'ngCookies',
    'projectManager.authentication',
    'projectManager.dashboard',
    'projectManager.editProfile'
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
  .value('toastr', toastr)
  .constant('BASE_URL','http://localhost:7777/api')
  .constant('CONTENT_TYPE', 'application/x-www-form-urlencoded; charset=UTF-8');

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };

})();
