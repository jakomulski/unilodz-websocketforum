/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-material',
    'angular-aria',
    'angular-animate',
    'ui-router',
    'angular-cookies'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'ngMaterial', 'ngAnimate', 'ngAria', 'ui.router', 'ngCookies'
    ]);
});