angular.module('uniquers.controllers').controller('ThenewCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Thenew';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);