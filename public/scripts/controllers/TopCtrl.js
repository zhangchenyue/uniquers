angular.module('uniquers.controllers').controller('TopCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    function ($scope, $rootScope, $location) {
        $rootScope.profileImgSrc = $rootScope.profileImgSrc || '/images/profile.png'
        $scope.username = 'Top';
        $scope.userMenuShow = '';
        $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
            var path = $location.path();
            $rootScope.$broadcast(path);
        });

         $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.toggleMenu = function(){
            if($scope.userMenuShow == 'user-menu-hide' || $scope.userMenuShow ==''){
                $scope.userMenuShow = 'user-menu-show';
            }else{
                 $scope.userMenuShow = 'user-menu-hide';
            }
        }
    }
]);