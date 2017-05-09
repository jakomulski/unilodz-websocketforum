define(['app'], function (app) {
    app.directive("dropzone", function (fileManagerService) {
        return {
            restrict: "A",
            link: function (scope, elem) {

                elem.bind('dragleave', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                });
                elem.bind('dragover', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                });
                elem.bind('drop', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var files = evt.dataTransfer.files;
                    for (var i = 0, f; f = files[i]; i++) {
                        var reader = new FileReader();
                        reader.readAsArrayBuffer(f);

                        reader.onload = (function (theFile) {
                            debugger;
                            return function (e) {
                                var newFile = {
                                    name: theFile.name,
                                    type: theFile.type,
                                    size: theFile.size,
                                    lastModifiedDate: theFile.lastModifiedDate
                                }

                                fileManagerService.uploadFile(newFile);
                            };
                        })(f);
                    }
                });
            }
        }
    });
});