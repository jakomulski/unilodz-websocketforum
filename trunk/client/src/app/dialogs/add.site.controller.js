define(['app'], function (app) {
    app.controller('AddSiteController', function ($scope, menuService, $mdDialog) {
        $scope.newSite = {};
        $scope.addSite = function () {
            menuService.addSite($scope.newSite);
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    });
});