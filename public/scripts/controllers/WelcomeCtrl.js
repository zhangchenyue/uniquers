angular.module('uniquers.controllers').controller('WelcomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$location',
    'ajaxProxy',
    function ($scope,$rootScope,$timeout,$location, ajaxProxy) {
        $scope.content = {
            text1:'Welcome',
            text2:'to',
            text3:'Uniquers'
        };
        
        $scope.gotoHome = function () {
            $timeout(function () {
                $location.path('/home')
            },1000);
        }
    }
]);