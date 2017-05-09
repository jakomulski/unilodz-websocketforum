define(['app'], function (app) {
    app.directive('addClass', function ($window) {
        return {
            restrict: 'EA',
            scope: {
                overParentWidth: '@'
            },
            link: function (scope, element, attributes) {
                var parent = {};
                if (element[0]) {
                    parent = element[0].parentElement;
                }

                var args = scope.overParentWidth.split(/\s+/);
                var addClass = function (arg) {
                    var width = parent.offsetWidth;
                    if (width > arg) {
                        element.addClass('over' + arg);
                    } else {
                        element.removeClass('over' + arg);
                    }
                };
                args.forEach(function (arg) {
                    angular.element($window).on('resize', function () {
                        addClass(arg);
                    });
                    scope.$watch(
                        function () {
                            return parent.offsetWidth;
                        },
                        function () {
                            addClass(arg);
                        },
                        true
                    );
                });
            }
        };
    });
});