'use strict';
var _ = require('lodash');
var promise_service_1 = require('../../promise/promise.service');
var bootstrapModalDialog_controller_1 = require('./bootstrapModalDialog.controller');
exports.serviceName = 'uiBootstrapModelDialog';
var BootstrapModalDialogService = (function () {
    function BootstrapModalDialogService($modal, $rootScope, promise) {
        var _this = this;
        this.$modal = $modal;
        this.$rootScope = $rootScope;
        this.promise = promise;
        this.modalClosing = function (event, reason, explicitlyClosed) {
            var canClose = true;
            if (_.isFunction(_this.closeHandler)) {
                canClose = _this.closeHandler(explicitlyClosed);
            }
            if (!canClose) {
                event.preventDefault();
            }
        };
    }
    BootstrapModalDialogService.prototype.open = function (options, closeHandler) {
        var _this = this;
        if (options == null) {
            options = {};
        }
        var dialogInstance = {
            close: function () { },
            dismiss: function () { },
        };
        this.promise.resolvePromises(options.resolve).then(function (results) {
            _this.closeHandler = closeHandler;
            options = _this.configureModalSettings(options, results);
            var modalInstance = _this.$modal.open(options);
            dialogInstance.close = modalInstance.close;
            dialogInstance.dismiss = modalInstance.dismiss;
        });
        return dialogInstance;
    };
    BootstrapModalDialogService.prototype.prompt = function (options, template) {
        var acceptHandler = options.acceptHandler || function () { };
        var cancelHandler = options.cancelHandler || function () { };
        options.acceptHandler = null;
        options.cancelHandler = null;
        var modalScope = this.$rootScope.$new();
        modalScope.prompt = options;
        var settings = {
            scope: modalScope,
            template: template,
            controller: bootstrapModalDialog_controller_1.controllerName,
        };
        var modalInstance = this.$modal.open(settings);
        var accept = function () {
            acceptHandler();
            modalInstance.close();
        };
        var cancel = function () {
            cancelHandler();
            modalInstance.close();
        };
        modalScope.$accept = accept;
        modalScope.$cancel = cancel;
        return {
            accept: accept,
            cancel: cancel,
            close: modalInstance.close,
            dismiss: modalInstance.dismiss,
        };
    };
    BootstrapModalDialogService.prototype.configureModalSettings = function (options, resolveData) {
        var modalScope = options.scope;
        if (modalScope == null) {
            modalScope = this.$rootScope.$new();
        }
        if (options.resolveToDialog) {
            if (options.dialogAs != null) {
                modalScope[options.dialogAs] = resolveData;
            }
            else {
                modalScope = _.extend(modalScope, resolveData);
            }
        }
        else {
            modalScope.resolveData = resolveData;
        }
        modalScope.modalController = options.controller;
        options.resolve = null;
        options.controller = bootstrapModalDialog_controller_1.controllerName;
        options.scope = modalScope;
        return options;
    };
    BootstrapModalDialogService.$inject = ['$uibModal', '$rootScope', promise_service_1.serviceName];
    return BootstrapModalDialogService;
}());
exports.BootstrapModalDialogService = BootstrapModalDialogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb3RzdHJhcE1vZGFsRGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsZ0NBQW1FLCtCQUErQixDQUFDLENBQUE7QUFVbkcsZ0RBQTJELG1DQUFtQyxDQUFDLENBQUE7QUFFcEYsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQWlCMUQ7SUFJQyxxQ0FBb0IsTUFBcUMsRUFDN0MsVUFBZ0MsRUFDaEMsT0FBd0I7UUFOckMsaUJBd0dDO1FBcEdvQixXQUFNLEdBQU4sTUFBTSxDQUErQjtRQUM3QyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQTZEcEMsaUJBQVksR0FDVCxVQUFDLEtBQXVCLEVBQUUsTUFBVyxFQUFFLGdCQUF5QjtZQUNsRSxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDRixDQUFDLENBQUE7SUF4RXVDLENBQUM7SUFFekMsMENBQUksR0FBSixVQUFLLE9BQXNDLEVBQUUsWUFBa0M7UUFBL0UsaUJBbUJDO1FBbEJBLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDbkIsQ0FBQztR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