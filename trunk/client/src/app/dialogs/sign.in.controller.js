define(['app'], function (app) {
    app.controller('SignInController', function ($scope, $state, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.signUp = function () {
            $state.go('base.sign-up');
            $mdDialog.hide();
        };
    });
});