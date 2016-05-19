"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb3RzdHJhcE1vZGFsRGlhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLGdDQUFtRSwrQkFBK0IsQ0FBQyxDQUFBO0FBVW5HLGdEQUEyRCxtQ0FBbUMsQ0FBQyxDQUFBO0FBRXBGLG1CQUFXLEdBQVcsd0JBQXdCLENBQUM7QUFpQjFEO0lBSUMscUNBQW9CLE1BQXFDLEVBQzdDLFVBQWdDLEVBQ2hDLE9BQXdCO1FBTnJDLGlCQXdHQztRQXBHb0IsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7UUFDN0MsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7UUFDaEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUE2RHBDLGlCQUFZLEdBQ1QsVUFBQyxLQUF1QixFQUFFLE1BQVcsRUFBRSxnQkFBeUI7WUFDbEUsSUFBSSxRQUFRLEdBQVksSUFBSSxDQUFDO1lBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsUUFBUSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QixDQUFDO1FBQ0YsQ0FBQyxDQUFBO0lBeEV1QyxDQUFDO0lBRXpDLDBDQUFJLEdBQUosVUFBSyxPQUFzQyxFQUFFLFlBQWtDO1FBQS9FLGlCQW1CQztRQWxCQSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFFRCxJQUFJLGNBQWMs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