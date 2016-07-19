angular.module('uniquers.controllers').controller('BottomCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    function ($scope, $rootScope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);