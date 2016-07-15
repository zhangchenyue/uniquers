angular.module('uniquers.controllers').controller('HomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    function ($scope, $rootScope, $timeout) {
        $scope.username = 'Home';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
        $timeout(function () {
            $('.carousel').carousel({
                interval: 2000
            })
        }, 0);
        $scope.itemID = '1-1';
    }
]);