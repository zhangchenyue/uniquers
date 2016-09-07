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

        $scope.amount = 1;

        itemService.getItemById($routeParams.id, function (res) {
            $scope.itemUrl = res[0].url;
        });

        $scope.addAmount = function(){
            $scope.amount++;
        }

         $scope.substractAmount = function(){
            $scope.amount--;
            if($scope.amount<=0)
                $scope.amount = 1;
        }
    }
]);