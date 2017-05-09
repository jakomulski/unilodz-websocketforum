require.config({
    paths: {
        'angular': './bower_components/angular/angular',
        'angular-aria': './bower_components/angular-aria/angular-aria.min',
        'angular-animate': './bower_components/angular-animate/angular-animate.min',
        'angular-material': './bower_components/angular-material/angular-material.min',
        'angular-cookies': './bower_components/angular-cookies/angular-cookies.min',
        'domReady': './bower_components/domReady/domReady',
        'ui-router': './bower_components/angular-ui-router/release/angular-ui-router.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'ui-router': {
            deps: ['angular']
        }
    },
    deps: [
        './bootstrap'
    ]
});