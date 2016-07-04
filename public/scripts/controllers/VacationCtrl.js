angular.module('uniquers.controllers').controller('VacationCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Vacation';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);