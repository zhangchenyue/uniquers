angular.module('uniquers.controllers').controller('OlCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Ol';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);