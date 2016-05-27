angular.module('uniquers.controllers').controller('HomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    function ($scope, $rootScope, $timeout) {
        $scope.username = 'Home';
        $rootScope.splash = false;
        $timeout(function () {
            $('.carousel').carousel({
                interval: 2000
            })
        }, 0);
    }
]);