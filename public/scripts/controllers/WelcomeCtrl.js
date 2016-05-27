angular.module('uniquers.controllers').controller('WelcomeCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.username = 'Welcome';
        $rootScope.splash = true;
    }
]);