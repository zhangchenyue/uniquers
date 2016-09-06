angular.module('uniquers.controllers').controller('DetailCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$timeout',
    'itemService',
    function ($scope, $rootScope, $routeParams, $timeout,itemService) {
        $timeout(function () {
            $('#u-shop-selection-carousel').carousel({
                interval: 2000
            })

             $('#u-designer-comment-carousel').carousel({
                interval: 2000
            })
        }, 0);

        itemService.getItemById($routeParams.id, function (res) {
            $scope.itemUrl = res[0].url;
        })
    }
]);