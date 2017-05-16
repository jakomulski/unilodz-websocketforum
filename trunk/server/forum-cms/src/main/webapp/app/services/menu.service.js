define(
		[ 'app', 'app/dialogs/add.forum.controller',
				'app/dialogs/add.site.controller',
				'app/services/file.manager.service' ], function(app) {
			app.service('menuService', function($mdDialog, $state, $rootScope,
					fileManagerService) {
				var parent = this;

				var menuStructure = [];
				var forums = [];
				var sites = [];

				function menu(title, content, action) {
					this.title = title;
					this.content = content;
					this.defaultAction = function(event, menu) {
						var index = menuStructure.indexOf(this);
						if (menuStructure.indexOf(this) === -1) {
							var menuIndex = menuStructure.indexOf(menu);
							menuStructure.splice(menuIndex + 1, 0, this);
							$rootScope.$broadcast('sizeChange');
						}
					};
					this.onopen = action ? action : this.defaultAction;
					this.onexit = function() {
						var index = menuStructure.indexOf(this);
						menuStructure.splice(index, 1);
						$rootScope.$broadcast('sizeChange');
					};
				}

				function addToMenuStructureIfNotExists(item) {
					if (menuStructure.indexOf(item) === -1)
						menuStructure.unshift(item);
				}

				var myForumsMenu = new menu('my forums', forums);
				var mySitesMenu = new menu('my sites', sites, function(event,
						menuStructure) {
					fileManagerService.getSites().then(function(data) {
						data.data.forEach(function(site) {
							var siteLayout = new menu('layout', [], function() {
								$state.go('base.site-layout', site);
							});
							sites.push(new menu(site.name, [ siteLayout ]));
						});
					});
					this.defaultAction(event, menuStructure);
				});

				var newForumMenu = new menu('new forum', [], function(event) {
					$mdDialog.show({
						controller : 'AddForumController',
						templateUrl : 'app/dialogs/add-forum-dialog.htm',
						parent : angular.element(document.body),
						targetEvent : event,
						clickOutsideToClose : true
					});
				});

				var newSiteMenu = new menu('new site', [], function(event) {
					$mdDialog.show({
						controller : 'AddSiteController',
						templateUrl : 'app/dialogs/add-site-dialog.htm',
						parent : angular.element(document.body),
						targetEvent : event,
						clickOutsideToClose : true
					});
				});

				var addMenu = new menu('add', [ newSiteMenu ])

				var settings = new menu('settings', [ addMenu, mySitesMenu ]);

				var logoutMenu = new menu('logout', [], function() {

				});
				var userAccount = new menu('user account', [ logoutMenu ]);

				var addForum = function(forum) {
					var forumLayout = new menu('layout', [], function() {
						$state.go('base.forum-layout', forum);
					});
				};

				var addSite = function(site) {
					var siteLayout = new menu('layout', [], function() {
						$state.go('base.site-layout', site);
					});
					fileManagerService.addSite(site).then(function(response) {
						sites.push(new menu(site.name, [ siteLayout ]));
					})
				};

				return {
					openSettings : function() {
						addToMenuStructureIfNotExists(settings);
					},
					openAccount : function() {
						addToMenuStructureIfNotExists(userAccount);
					},
					menuStructure : menuStructure,
					addForum : addForum,
					addSite : addSite
				};
			});
		});