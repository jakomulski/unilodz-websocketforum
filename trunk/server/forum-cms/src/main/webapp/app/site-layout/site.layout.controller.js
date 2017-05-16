define(['app', 'app/services/file.manager.service', 'app/common/add.class.directive', 'app/common/right.click.directive', 'app/common/dropzone.directive'], function (app) {
    app.controller('SiteLayoutController', function ($scope, $state, fileManagerService, $rootScope) {
        $scope.data = {
            files: {}
        };
        fileManagerService.getFiles();

        $scope.navInto = function (file) {
            if (file.type === 'FOLDER') {
                fileManagerService.navInto(file);
                fileManagerService.getFiles();
            }
        };
        $scope.navBack = function () {
            fileManagerService.navBack();
            fileManagerService.getFiles();
        };
        $rootScope.$on('fileAction', function () {    	
            $scope.data.files = fileManagerService.files;
            $scope.path = fileManagerService.getPath();
            $scope.$apply();
        });
    });
});