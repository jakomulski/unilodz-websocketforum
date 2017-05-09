define(['app'], function (app) {
    app.service('fileManagerService', function ($timeout, $rootScope, actionsService, $q) {
        var parent = this;
        var locator = [];
        this.files = [];
        this.getPath = function () {
            return '/' + locator.join('/');
        };
        var sampleFile = {
            type: 'file',
            name: 'file.js'
        };

        var sampleFolder = {
            type: 'folder',
            name: 'container'
        };

        this.getFiles = function () {
            var pr = $timeout(function () {
                var newFiles = [sampleFile, sampleFolder];
                newFiles.forEach(function (file) {
                    addIconToFile(file);
                });
                parent.files = newFiles;
                $rootScope.$emit('fileAction');
            }, 500);
        };

        var addIconToFile = function (file) {
            if (file.type === 'folder')
                file.icon = 'folder'
            else
                file.icon = 'insert_drive_file'
        };

        this.navInto = function (file) {
            if (file.type === 'folder') {
                locator.push(file.name);
            }
        };
        this.navBack = function () {
            locator.pop();
        };
        this.uploadFile = function (rawFile) {
            var action = {
                status: 'pending',
                fileName: rawFile.name,
                request: function () {
                    var deferred = $q.defer();
                    var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > 1000) {
                            break;
                        }
                    }
                    var file = {
                        type: 'file',
                        name: rawFile.name
                    };
                    addIconToFile(file);
                    parent.files.push(file);
                    //should be getFiles();
                    action.status = 'uploaded';
                    $rootScope.$emit('fileAction');
                    return deferred.resolve();
                }
            };
            actionsService.addAction(action);
        };
    });
});