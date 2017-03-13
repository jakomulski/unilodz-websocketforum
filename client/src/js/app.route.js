angular
    .module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
            controller: 'HomeController',
                templateUrl: "home.htm"
            })
            .when("/home", {
                controller: 'HomeController',
                templateUrl: 'home.htm'
            })
    });