angular
    .module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.htm"
            })
            .when("/home", {
                templateUrl: "home.htm"
            })
    });