angular.module('uniquers.controllers').controller('AboutCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'About';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);