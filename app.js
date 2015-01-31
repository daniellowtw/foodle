angular
    .module('foodle', [
        // 'ngAnimate',
        // 'ngCookies',
        // 'ngResource',
        'ngRoute'
        // 'ngSanitize',
        // 'ngTouch'
        // 'Models',
        // 'ui.calendar',
        // 'ui.bootstrap',
        // 'ui.bootstrap.timepicker'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $window) {})
    .filter('truncate', function() {
        return function(item, i) {
            if (item && item.substring)
                return item.substring(0,i-3) + "...";
        };
    });;
