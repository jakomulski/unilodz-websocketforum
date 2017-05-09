define(['app'], function (app) {
    app.controller('ActionsToastCtrl', function ($scope, actionsService, $mdToast) {
        debugger;
        $scope.actions = actionsService.actions;
        $scope.closeToast = function () {
            actionsService.hideToast();

        };
    });
});