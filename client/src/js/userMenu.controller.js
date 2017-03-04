angular
    .module('app')
    .controller('UserMenuController', ['$scope', '$document', '$location', function ($scope, $document, $location) {

        $scope.menuStructure = [];

        function menu(title, pos, content, action) {
            this.pos = pos;
            this.title = title;
            this.content = content;
            this.onopen = action ? action : function () {
                if ($scope.menuStructure.length > pos) {
                    $scope.menuStructure[pos] = this;
                } else {
                    $scope.menuStructure.push(this);
                }
            }
            this.onexit = function () {
                var index = $scope.menuStructure.indexOf(this);
                $scope.menuStructure.splice(index, 1);
            }
        }


        var sub4 = new menu('sub4', 2, [], function () {});
        var sub3 = new menu('sub3', 2, [], function () {});
        var userAccount = new menu('user account', 1, [sub3, sub4]);
        var homePage = new menu('home page', 1, [], function () {
            $location.path('/home');
        });

        var settings = new menu('settings', 0, [homePage, userAccount]);

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

        $scope.openSettings = function () {
            if ($scope.menuStructure.indexOf(settings) === -1)
                $scope.menuStructure.unshift(settings);
        }
   }]);