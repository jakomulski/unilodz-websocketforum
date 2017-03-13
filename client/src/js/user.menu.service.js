angular
    .module('app')
    .service('userMenuService', ['$location', '$mdDialog', function ($location, $mdDialog) {
        var menuStructure = [];

        function menu(title, pos, content, action) {
            this.pos = pos;
            this.title = title;
            this.content = content;
            this.onopen = action ? action : function (event, menu) {
                var index = menuStructure.indexOf(this);
                if (menuStructure.indexOf(this) === -1) {
                    var menuIndex = menuStructure.indexOf(menu);
                    menuStructure.splice(menuIndex + 1, 0, this);
                }
            }
            this.onexit = function () {
                var index = menuStructure.indexOf(this);
                menuStructure.splice(index, 1);
            }
        }

        function addToMenuStructureIfNotExists(item) {
            if (menuStructure.indexOf(item) === -1)
                menuStructure.unshift(item);
        };

        var forumLayout = new menu('layout', 3, [], function () {});
        var forumModerators = new menu('moderators', 3, [], function () {});
        var forumAddModerator = new menu('add moderator', 3, [], function () {});

        var forum2 = new menu('forum 2', 2, [], function () {});
        var forum1 = new menu('forum 1', 2, [], function () {});

        var myForums = new menu('my forums', 1, [forum1, forum2]);
        var addForum = new menu('new forum', 1, [], function (event) {
            $mdDialog.show({
                controller: 'SingInController',
                templateUrl: 'add-forum-dialog.htm',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        });

        var settings = new menu('settings', 0, [addForum, myForums]);

        var userAccount = new menu('user account', 0, []);

        return {
            openSettings: function () {
                addToMenuStructureIfNotExists(settings);
            },
            openAccount: function () {
                addToMenuStructureIfNotExists(userAccount);
            },
            menuStructure: menuStructure
        };
    }]);