angular.module('uniquers.controllers').controller('VacationCtrl', [
    '$scope',
    '$rootScope',
    'itemService',
    function ($scope,$rootScope,itemService) {
        $scope.username = 'Vacation';
         $scope.username = 'Kind';
        $scope.jacketItems = [];
        $scope.jacketMoreItems = [];
        $scope.trousersItems = [];
        $scope.trousersMoreItems = [];

        itemService.getItemsByType('jacket', function (res) {
            $scope.jacketItems = res;
        });

        itemService.getItemsByType('jacketmore', function (res) {
            $scope.jacketMoreItems = res;
        });

        itemService.getItemsByType('trousers', function (res) {
            $scope.trousersItems = res;
        });

        itemService.getItemsByType('trousersmore', function (res) {
            $scope.trousersMoreItems = res;
        });
    }
]);