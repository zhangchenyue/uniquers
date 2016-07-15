angular.module('uniquers.controllers').controller('DetailCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    function ($scope,$rootScope, $routeParams) {
        $scope.itemUrl = $routeParams.id ? '/images/' + $routeParams.id + '.jpg' : '/images/placeholder.jpg';
        $rootScope.splash = false;
        $rootScope.navshow = 'nav-show';
        console.log($routeParams);
    }
]);