define(['app', 'app/services/menu.service', 'app/dialogs/sign.in.controller', 'app/services/actions.service'], function (app) {
    app.controller('MainController', function ($scope, $document, $location, menuService, $mdDialog, $state, actionsService) {
        $scope.showSignInDialog = function (event) {
            $mdDialog.show({
                controller: 'SignInController',
                templateUrl: 'app/dialogs/sign-in-dialog.htm',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };
        $scope.changeContentSize = function (event) {
            var target = event.target;
            var container = target.previousElementSibling;
            var body = $document[0].body;
            var startPosX = event.pageX;
            orgWidth = $(container).css('width');
            $(body).mousemove(function (event) {
                var del = event.pageX - startPosX;
                if (event.which == 1) {
                    $(container).css('min-width', parseInt(orgWidth) + del);
                }
                $(body).mouseup(function (e) {
                    $(body).unbind();
                });
            })
        };
        $scope.getPageTitle = function () {
            var tite = $state.$current.title;
            if ($state.params.name) {
                return $state.$current.title + ' - ' + $state.params.name;
            }
            return $state.$current.title;
        };
        $state.go('base.site-layout');
        $scope.menuStructure = menuService.menuStructure;
        $scope.openSettings = menuService.openSettings;
        $scope.openAccount = menuService.openAccount;
    });
});