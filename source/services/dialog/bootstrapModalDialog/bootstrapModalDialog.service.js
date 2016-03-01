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
    BootstrapModalDialogService.$inject = ['$modal', '$rootScope', __promise.serviceName];
    return BootstrapModalDialogService;
})();
exports.BootstrapModalDialogService = BootstrapModalDialogService;
//# sourceMappingURL=bootstrapModalDialog.service.js.map