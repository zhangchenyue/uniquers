angular.module('uniquers.controllers').controller('DesignerCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Designer';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
    }
]);