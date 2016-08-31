angular.module('uniquers.controllers').controller('HomeCtrl', [
    '$scope',
    '$rootScope',
    '$timeout',
    'itemService',
    'userService',
    function ($scope, $rootScope, $timeout, itemService, userService) {

        $timeout(function () {
            $('.carousel').carousel({
                interval: 2000
            })
        }, 0);

        $scope.adItems = [];
        $scope.u1Items = [];
        $scope.u2Items = [];
        $scope.u3Items = [];
        $scope.u4Items = [];
        $scope.f1Items = [];
        $scope.f2Items = [];
        $scope.f3Items = [];

        itemService.getItemsByType('ad', function (res) {
            for (var i = 0; i < res.length; i++) {
                if (i == 0) {
                    res[i].active = 'active';
                }
                else {
                    res[i].active = '';
                }
            }
            $scope.adItems = res;
        });

        itemService.getItemsByType('u1', function (res) {
            $scope.u1Items = res;
        });

        itemService.getItemsByType('u2', function (res) {
            $scope.u2Items = res;
        });

        itemService.getItemsByType('u3', function (res) {
            $scope.u3Items = res;
        });

        itemService.getItemsByType('u4', function (res) {
            $scope.u4Items = res;
        });

        itemService.getItemsByType('f1', function (res) {
            $scope.f1Items = res;
        });

        itemService.getItemsByType('f2', function (res) {
            $scope.f2Items = res;
        });

        itemService.getItemsByType('f3', function (res) {
            $scope.f3Items = res;
        });

        userService.getQQUserInfo('', function (res) {
            if (res.profile) {
                $rootScope.profileImgSrc = res.profile._json.figureurl_qq_1;
            }
        })
    }
]);