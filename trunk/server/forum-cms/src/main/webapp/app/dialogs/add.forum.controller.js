define(['app'], function (app) {
    app.controller('AddForumController', function ($scope, menuService, $mdDialog) {
        $scope.newForum = {};
        $scope.addForum = function () {
            menuService.addForum($scope.newForum);
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    });
});