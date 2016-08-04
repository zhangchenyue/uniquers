
angular.module('uniquers.services', []);
angular.module('uniquers.filters', []);
angular.module('uniquers.directives', []);
angular.module('uniquers.controllers', [
    'uniquers.services',
    'uniquers.filters'
]);

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
        .when('/login', { templateUrl: '/views/login.html', controller: 'LoginCtrl' })
        .when('/home', { templateUrl: '/views/home.html', controller: 'HomeCtrl' })
        .when('/match', { templateUrl: '/views/match.html', controller: 'MatchCtrl' })
        .when('/kind', { templateUrl: '/views/kind.html', controller: 'KindCtrl' })
        .when('/thenew', { templateUrl: '/views/thenew.html', controller: 'ThenewCtrl' })
        .when('/about', { templateUrl: '/views/about.html', controller: 'AboutCtrl' })
        .when('/party', { templateUrl: '/views/party.html', controller: 'PartyCtrl' })
        .when('/ol', { templateUrl: '/views/ol.html', controller: 'OlCtrl' })
        .when('/vacation', { templateUrl: '/views/vacation.html', controller: 'VacationCtrl' })
        .when('/designer', { templateUrl: '/views/designer.html', controller: 'DesignerCtrl' })
        .when('/detail', { templateUrl: '/views/detail.html', controller: 'DetailCtrl' })
        .when('/detail/:id', { templateUrl: '/views/detail.html', controller: 'DetailCtrl' })
        .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]).run(['$rootScope', '$location', function ($rootScope, $location) {
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

    $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
        document.getElementsByTagName('body')[0].scrollTop = 0;
        if (!previous) {
            $rootScope.noAnimateClass = 'no-page-animate';
        }
        else {
            $rootScope.noAnimateClass = '';
        }
    });
}]);
