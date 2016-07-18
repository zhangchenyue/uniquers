angular.module('uniquers.controllers').controller('WelcomeCtrl', [
    '$scope',
    '$rootScope',
    function ($scope,$rootScope) {
        $scope.content = {
            text1:'Welcome',
            text2:'to',
            text3:'Uniquers'
        };
       
    }
]);