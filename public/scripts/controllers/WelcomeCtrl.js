angular.module('uniquers.controllers').controller('WelcomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$location',
    'ajaxProxy',
    function ($scope, $rootScope, $timeout, $location, ajaxProxy) {
        $scope.phone =  $rootScope.isPhone();
        
        var t = $rootScope.isPhone() ? 500 : 1000;
        $scope.gotoHome = function () {
            
             $location.path('/home');
            // $timeout(function () {
            //     $location.path('/home')
            // }, 500);
        };

        $scope.gotoLogin = function () {
            window.location = window.location.protocol + '//' + window.location.host + "/api/auth/qq";
        };
    }
]);