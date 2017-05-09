define(['app', 'app/dialogs/actions.toast.controller'], function (app) {
    app.service('actionsService', function ($rootScope, $mdToast) {
        var parent = this;
        this.actions = [];
        this.actionTypes = {
            UPLOAD_FILE: 'upload file'
        };
        var isShowed = false;
        var sampleAction = {
            type: parent.actionTypes.UPLOAD_FILE

        };
        this.hideToast = function () {
            $mdToast
                .hide();
            isShowed = false;
        }

        var showActionToast = function () {
            if (!isShowed) {
                $mdToast.show({
                    hideDelay: 0,
                    position: 'bottom right',
                    controller: 'ActionsToastCtrl',
                    templateUrl: 'app/dialogs/actions-toast.htm'
                });
                isShowed = true;
            } else {
                $rootScope.$apply();
            }
        };

        var runAction = function () {
            var action = pendingActions[0];
            if (!action) {
                return;
            }
            action.status = 'in progress';
            action.request.then(function () {
                action.status = 'uploaded';
                pendingActions.shift();
                runAction();
            });
        };
        var pendingAction;
        this.addAction = function (action) {
            if (pendingAction) {
                pendingAction.then(action.request);

            } else {
                pendingAction = action.request;
            }

            parent.actions.push(action);
            showActionToast();
        };
    });
});