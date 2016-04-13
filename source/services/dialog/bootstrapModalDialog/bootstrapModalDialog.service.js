'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
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
        var acceptHandler = options.acceptHandler;
        var cancelHandler = options.cancelHandler;
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
    BootstrapModalDialogService.$inject = ['$uibModal', '$rootScope', __promise.serviceName];
    return BootstrapModalDialogService;
}());
exports.BootstrapModalDialogService = BootstrapModalDialogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb3RzdHJhcE1vZGFsRGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxTQUFTLEdBQUcsdUNBQVEsQ0FBQyxPQUFPLENBQUM7QUFVcEMsZ0RBQTJELG1DQUFtQyxDQUFDLENBQUE7QUFFcEYsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQWlCMUQ7SUFJQyxxQ0FBb0IsTUFBcUMsRUFDN0MsVUFBZ0MsRUFDaEMsT0FBa0M7UUFOL0MsaUJBd0dDO1FBcEdvQixXQUFNLEdBQU4sTUFBTSxDQUErQjtRQUM3QyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQTZEOUMsaUJBQVksR0FDVCxVQUFDLEtBQXVCLEVBQUUsTUFBVyxFQUFFLGdCQUF5QjtZQUNsRSxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7WUFFN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxRQUFRLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDRixDQUFDLENBQUE7SUF4RWlELENBQUM7SUFFbkQsMENBQUksR0FBSixVQUFLLE9BQXNDLEVBQUUsWUFBa0M7UUFBL0UsaUJBbUJDO1FBbEJBLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxD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