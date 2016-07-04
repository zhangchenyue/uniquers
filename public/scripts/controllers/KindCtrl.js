angular.module('uniquers.controllers').controller('KindCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Kind';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);