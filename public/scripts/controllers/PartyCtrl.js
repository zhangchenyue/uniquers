angular.module('uniquers.controllers').controller('PartyCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Party';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);