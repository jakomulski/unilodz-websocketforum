angular
    .module('app')
    .controller('MainController', ['$scope', '$document', '$location', 'userMenuService', '$mdDialog', function ($scope, $document, $location, userMenuService, $mdDialog) {
        $scope.showSignInDialog = function (event) {
            $mdDialog.show({
                controller: 'SingInController',
                templateUrl: 'sign-up-dialog.htm',
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

        $scope.menuStructure = userMenuService.menuStructure;
        $scope.openSettings = userMenuService.openSettings;
        $scope.openAccount = userMenuService.openAccount;
   }]);