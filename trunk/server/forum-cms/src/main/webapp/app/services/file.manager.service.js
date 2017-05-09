define([ 'app' ], function(app) {
	app.service('fileManagerService', function($timeout, $rootScope,
			actionsService, $q, $http) {
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

			$http.post('/files', fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).then(function(res) {
				parent.getFiles();
			});

		};

		this.gett = function() {
			$http({
				method : 'GET',
				url : '/user'
			}).then(function successCallback(response) {
				debugger;
			}, function errorCallback(response) {
				debugger;
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

		var loadFiles = function() {
			var toParse = {
				'path' : '\asd\asd'
			};
			var req = {
				method : 'POST',
				url : "http://localhost:8080/files/directories",
				data : locator
			}
			return $http(req);
		}

		var addIconToFile = function(file) {
			if (file.type === 'FOLDER')
				file.icon = 'folder'
			else
				file.icon = 'insert_drive_file'
		};

		this.navInto = function(file) {
			debugger;
			if (file.type === 'FOLDER') {
				locator.push(file.name);
			}
		};
		this.navBack = function() {
			locator.pop();
		};
		this.uploadFileOld = function(rawFile) {
			var action = {
				status : 'pending',
				fileName : rawFile.name,
				request : function() {
					var deferred = $q.defer();
					var start = new Date().getTime();
					for (var i = 0; i < 1e7; i++) {
						if ((new Date().getTime() - start) > 1000) {
							break;
						}
					}
					var file = {
						type : 'file',
						name : rawFile.name
					};
					addIconToFile(file);
					parent.files.push(file);
					// should be getFiles();
					action.status = 'uploaded';
					$rootScope.$emit('fileAction');
					return deferred.resolve();
				}
			};
			actionsService.addAction(action);
		};
	});
});