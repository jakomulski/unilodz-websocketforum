angular
    .module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.htm"
            })
            .when("/home", {
                templateUrl: "home.htm"
            })
    });