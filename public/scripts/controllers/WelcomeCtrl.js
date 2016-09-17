angular.module('uniquers.controllers').controller('WelcomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$location',
    'ajaxProxy',
    function ($scope, $rootScope, $timeout, $location, ajaxProxy) {
        var t = $rootScope.isPhone() ? 0 : 1000;
        $scope.gotoHome = function () {
            $timeout(function () {
                $location.path('/home')
            }, t);
        };

        $scope.gotoLogin = function () {
            window.location = window.location.protocol + '//' + window.location.host + "/api/auth/qq";
        };
    }
]);