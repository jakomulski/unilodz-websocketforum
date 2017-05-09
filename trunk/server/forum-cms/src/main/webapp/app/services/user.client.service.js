define(['app'], function (app) {
    app.service('userClientService', function ($http, $httpParamSerializer) {

        var encoded = btoa("my-trusted-client:");

        this.login = function (data) {
            var req = {
                method: 'POST',
                url: "http://localhost:8080/oauth/token",
                headers: {
                    "Authorization": "Basic " + encoded,
                    "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                },
                data: $httpParamSerializer(data)
            }
            return $http(req);
        };
    });
});