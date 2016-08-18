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

        $scope.partyItems = [];
        $scope.olItems = [];
        $scope.vacationItems = [];
        $scope.itemID = '1-1';
        $scope.itemTypes = {
            party: 'party',
            ol: 'ol',
            vacation: 'vacation',
        }

        $scope.$on('/home', function () {
            itemService.getItemsByType('party', function (res) {
                $scope.partyItems = res;
            })

            itemService.getItemsByType('ol', function (res) {
                $scope.olItems = res;
            })

            itemService.getItemsByType('vacation', function (res) {
                $scope.vacationItems = res;
            })

            userService.getQQUserInfo('',function (res) {
                console.log(res);
            })
        })
    }
]);