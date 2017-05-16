define(['app', 'app/services/user.client.service'], function (app) {
    app.controller('SignInController', function ($scope, $state, $mdDialog, userClientService, $http, $cookies, $window) {
        $scope.user = {
            grant_type: "password",
            client_id: "my-trusted-client",
            username: 'bill',
            password: 'abc123'
        };


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

        $scope.signIn = function () {
            userClientService.login($scope.user).then(function (responseData) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + responseData.data.access_token;
                $scope.$emit('signInEvent',$scope.user.username);
                $mdDialog.hide();
                debugger;
                userClientService.addUser();
            });
        };
    });
});