define(['app', 'app/dialogs/add.forum.controller', 'app/dialogs/add.site.controller'], function (app) {
    app.service('menuService', function ($mdDialog, $state, $rootScope) {
        var menuStructure = [];
        var forums = [];
        var sites = [];

        function menu(title, content, action) {
            this.title = title;
            this.content = content;
            this.onopen = action ? action : function (event, menu) {
                var index = menuStructure.indexOf(this);
                if (menuStructure.indexOf(this) === -1) {
                    var menuIndex = menuStructure.indexOf(menu);
                    menuStructure.splice(menuIndex + 1, 0, this);
                    $rootScope.$broadcast('sizeChange');
                }
            }
            this.onexit = function () {
                var index = menuStructure.indexOf(this);
                menuStructure.splice(index, 1);
                $rootScope.$broadcast('sizeChange');
            }
        }

        function addToMenuStructureIfNotExists(item) {
            if (menuStructure.indexOf(item) === -1)
                menuStructure.unshift(item);
        };

        var myForumsMenu = new menu('my forums', forums);
        var mySitesMenu = new menu('my sites', sites);

        var newForumMenu = new menu('new forum', [], function (event) {
            $mdDialog.show({
                controller: 'AddForumController',
                templateUrl: 'app/dialogs/add-forum-dialog.htm',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        });


        var newSiteMenu = new menu('new site', [], function (event) {
            $mdDialog.show({
                controller: 'AddSiteController',
                templateUrl: 'app/dialogs/add-site-dialog.htm',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        });

        var addMenu = new menu('add', [newForumMenu, newSiteMenu])

        var settings = new menu('settings', [addMenu, myForumsMenu, mySitesMenu]);

        var userAccount = new menu('user account', []);

        var addForum = function (forum) {
            var forumLayout = new menu('layout', [], function () {
                $state.go('base.forum-layout', forum);
            });
            var forumModerators = new menu('moderators', [], function () {});
            var forumAddModerator = new menu('add moderator', [], function () {});
            forums.push(new menu(forum.name, [forumLayout, forumModerators, forumAddModerator]));
        };

        var addSite = function (site) {
            var siteLayout = new menu('layout', [], function () {
                $state.go('base.site-layout', site);
            });
            sites.push(new menu(site.name, [siteLayout]));
        };

        addForum({
            name: 'forum1',
            id: 1
        });
        addForum({
            name: 'forum2',
            id: 2
        });
        addForum({
            name: 'forum3',
            id: 3
        });
        addForum({
            name: 'forum4',
            id: 4
        });

        return {
            openSettings: function () {
                addToMenuStructureIfNotExists(settings);
            },
            openAccount: function () {
                addToMenuStructureIfNotExists(userAccount);
            },
            menuStructure: menuStructure,
            addForum: addForum,
            addSite: addSite
        };
    });
});