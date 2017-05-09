define(['app', 'app/services/file.manager.service', 'app/common/add.class.directive', 'app/common/right.click.directive'], function (app) {
    app.controller('ForumLayoutController', function ($scope, $state, fileManagerService) {
        var refreshLocator = function () {
            fileManagerService.getFiles().then(function (files) {
                files.forEach(function (file) {
                    if (file.type === 'folder')
                        file.icon = 'folder'
                    else
                        file.icon = 'insert_drive_file'
                });
                $scope.files = files;

                $scope.path = fileManagerService.getPath();
            });
        };
        refreshLocator();

        $scope.navInto = function (file) {
            fileManagerService.navInto(file);
            refreshLocator();
        };
        $scope.navBack = function () {
            fileManagerService.navBack();
            refreshLocator();
        };
    });
});