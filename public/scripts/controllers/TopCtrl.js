angular.module('uniquers.controllers').controller('TopCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    function ($scope, $rootScope, $location) {
        $scope.username = 'Top';
        $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
            var path = $location.path();
            $rootScope.$broadcast(path);
        });

         $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
]);