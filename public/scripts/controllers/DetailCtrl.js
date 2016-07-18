angular.module('uniquers.controllers').controller('DetailCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    'itemService',
    function ($scope, $rootScope, $routeParams,itemService) {
        itemService.getItemById($routeParams.id, function (res) {
            $scope.itemUrl = res[0].url;
        })
    }
]);