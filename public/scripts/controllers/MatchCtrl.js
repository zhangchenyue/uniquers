angular.module('uniquers.controllers').controller('MatchCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Match';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);