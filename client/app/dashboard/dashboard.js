(function() {
    'use strict';

    angular
        .module('projectManager.dashboard', [])
        .controller('DashboardController', DashboardController)
        .config(function($routeProvider) {
            $routeProvider.when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.view.html',
                controller: 'DashboardController',
                resolve: {
                    // Resolve for getting all projects that the user is assigned to
                    getProjects: function(projectService) {
                        return projectService.getProjects();
                    }
                }
            });
        });

    DashboardController.$inject = ['$scope', 'getProjects', '$route', 'chatSocket', '$filter', '$timeout'];

    function DashboardController($scope, getProjects, $route, chatSocket, $filter, $timeout) {
        var realProjects = [];
        var len = 0;
        // Creating empty scope array to hold the projects
        $scope.projects = [];
        // Scope variables to set pagination options
        $scope.pageSize = 6;
        $scope.currentPage = 1;
        // Scope functions
        $scope.changePage = changePage;
        $scope.changeRole = changeRole;
        // Perambulate all projects and adding the position for the current user
        loopPositions();

        function loopPositions() {
            angular.forEach(getProjects.owner, function(val, key) {
                val.position = 'owner';
                $scope.projects.push(val);
            });
            angular.forEach(getProjects.admin, function(val, key) {
                val.position = 'admin';
                $scope.projects.push(val);
            });
            angular.forEach(getProjects.developer, function(val, key) {
                val.position = 'developer';
                $scope.projects.push(val);
            });
        }
        settingProjects();
        // ui-sortable options object
        $scope.sortableOptions = {
            update: function(e, ui) {
                $timeout(function() {
                    if ($('.panel-body.scroll')[0].scrollHeight) {
                        $('.panel-body.scroll').scrollTop(9007199254740992);
                    }
                }, 300);
            }
        };
        // Setting project lenght and filtering
        function settingProjects() {
            realProjects = $scope.projects;
            len = $scope.projects.length;
            $scope.projectsLen = len;
            filterProjects();

        }
        // On page change function
        function changePage() {
            loopPositions();
            $scope.projects = realProjects;
            filterProjects();
        }
        // Filtering by role
        function changeRole() {
            loopPositions();
            $scope.projects = realProjects;
            filterProjects();
        }
        // Filtering projects
        function filterProjects(role) {
            $scope.projects = $filter('toArray')($scope.projects);
            $scope.projects = $filter('orderBy')($scope.projects, $scope.sortOwner);
            $scope.projects = $filter('startFrom')($scope.projects, ($scope.currentPageOwner - 1) * $scope.pageSize);
            $scope.projects = $filter('limitTo')($scope.projects, $scope.pageSize);
        }
    }

})();
