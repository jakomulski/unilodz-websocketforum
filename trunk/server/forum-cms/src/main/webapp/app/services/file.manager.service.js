define([ 'app' ], function(app) {
	app.service('fileManagerService', function($timeout, $rootScope,
			actionsService, $q, $http, $state) {
		var parent = this;
		var locator = [];
		this.files = [];
		this.getPath = function() {
			return '/' + locator.join('/');
		};
		var sampleFile = {
			type : 'file',
			name : 'file.js'
		};

		var sampleFolder = {
			type : 'folder',
			name : 'container'
		};

		this.uploadFile = function(file) {
			var fd = new FormData();
			fd.append('file', file);
			fd.append('path', locator);
			fd.append('siteName', $state.params.name);
			
			$http.post('/files', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function(res) {
				parent.getFiles();
			});

		};

		

		this.getFiles = function() {
			loadFiles().then(function(data) {
				var newFiles = data.data;
				newFiles.forEach(function(file) {
					addIconToFile(file);
				});
				parent.files = newFiles;
				$rootScope.$emit('fileAction')
			})
		};
		
		this.getSites = function() {
			return $http.get('/site/list');
		};

		var loadFiles = function() {
			var fd = new FormData();
			fd.append('path', locator);
			fd.append('siteName', $state.params.name);
			debugger;
		
			return $http.post('/files/directories', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			});
		}

		var addIconToFile = function(file) {
			if (file.type === 'FOLDER')
				file.icon = 'folder'
			else
				file.icon = 'insert_drive_file'
		};

		this.navInto = function(file) {
			if (file.type === 'FOLDER') {
				locator.push(file.name);
			}
		};
		this.navBack = function() {
			locator.pop();
		};
		this.addSite = function(site) {
			return $http({
				method : 'POST',
				url : '/site/add',
				data: site
			});
		}
	});
});