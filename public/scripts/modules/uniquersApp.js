
angular.module('uniquers.services', []);
angular.module('uniquers.filters', []);
angular.module('uniquers.directives', []);
angular.module('uniquers.controllers', [
    'uniquers.services',
    'uniquers.filters'
]);



angular.module('uniquers.app',['ngRoute']).run('$rootScope', function ($rootScope) {
    // publish current transition direction on rootScope
    $rootScope.direction = 'ltr';
    // listen change start events
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $rootScope.direction = 'rtl';
        // console.log(arguments);
        if (current && next && (current.depth > next.depth)) {
            $rootScope.direction = 'ltr';
        }
    });
});


angular.module('uniquers.app', [
    'uniquers.controllers',
    'uniquers.services',
    'uniquers.filters',
    'uniquers.directives',
    'ngRoute',
    'ngAnimate'
]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', { templateUrl: '/views/welcome.html', controller: 'WelcomeCtrl' })
        .when('/home', { templateUrl: '/views/home.html', controller: 'HomeCtrl' })
        .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
}]);
