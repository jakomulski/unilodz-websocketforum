define(['app', 'app/services/user.client.service'], function (app) {
    app.controller('SignUpController', function ($scope, userClientService) {
    	$scope.createAccount = function(user){
    		debugger;
    		userClientService.createAccount(user).then(function(result){
    			debugger;
    		});	
    	}
    });

    
});