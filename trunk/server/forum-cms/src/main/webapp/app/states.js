define(['app', 'app/main.controller', 'app/sign-up/sign.up.controller', 'app/home/home.controller', 'app/forum-layout/forum.layout.controller', 'app/site-layout/site.layout.controller'], function (app) {
    'use strict';
    return app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('base', {
                templateUrl: 'app/main.htm',
                controller: 'MainController'
            })
            .state("base.home", {
                url: '/home',
                controller: 'HomeController',
                templateUrl: 'app/home/home.htm',
                title: 'Home'
            })
            .state("base.sign-up", {
                url: '/sign-up',
                controller: 'SignUpController',
                templateUrl: 'app/sign-up/sign-up.htm',
                title: 'Create an Account'
            })
            .state("base.forum-layout", {
                url: '/forum-layout',
                params: {
                    name: null,
                    id: null
                },
                controller: 'ForumLayoutController',
                templateUrl: 'app/forum-layout/forum-layout.htm',
                title: 'Forum Layout'
            })
            .state("base.site-layout", {
                url: '/site-layout',
                params: {
                    name: null,
                    id: null
                },
                controller: 'SiteLayoutController',
                templateUrl: 'app/site-layout/site-layout.htm',
                title: 'Site Layout'
            });
        }]);
});