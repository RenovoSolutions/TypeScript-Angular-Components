"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var promise_service_1 = require('../../services/promise/promise.service');
var bootstrapModalDialog = require('./bootstrapModalDialog/bootstrapModalDialog.module');
exports.bootstrapModalDialog = bootstrapModalDialog;
var autosave_service_1 = require('../autosave/autosave.service');
var form_service_1 = require('../form/form.service');
var dialog_1 = require('../../components/dialog/dialog');
exports.componentName = dialog_1.componentName;
exports.controllerName = dialog_1.controllerName;
exports.DialogController = dialog_1.DialogController;
exports.moduleName = 'rl.ui.services.dialog';
exports.serviceName = 'dialog';
var DialogService = (function () {
    function DialogService(dialog, $rootScope, autosaveFactory, promise, notification, formService) {
        var _this = this;
        this.dialog = dialog;
        this.$rootScope = $rootScope;
        this.autosaveFactory = autosaveFactory;
        this.promise = promise;
        this.notification = notification;
        this.formService = formService;
        this.autosaveCloseHandler = function (explicit) {
            if (explicit) {
                return true;
            }
            return _this.autosave.autosave(_this.data);
        };
    }
    DialogService.prototype.open = function (options, closeHandler) {
        var _this = this;
        var dialogInstance = this.dialog.open(options, closeHandler);
        dialogInstance.validateAndNotify = function () {
            var valid = _this.form.$valid;
            if (!valid) {
                _this.notification.warning(_this.formService.getAggregateError(_this.form));
            }
            return valid;
        };
        return dialogInstance;
    };
    DialogService.prototype.prompt = function (options) {
        options.okButton = options.okButton || 'Ok';
        options.cancelButton = options.cancelButton || 'Cancel';
        return this.dialog.prompt(options, require('./promptDialog.html'));
    };
    DialogService.prototype.openForm = function (options) {
        var _this = this;
        var dialogInstance = {
            close: function () { },
            dismiss: function () { },
            save: function () { },
            saveAndClose: function () { },
            validateAndNotify: function () { },
        };
        this.promise.resolvePromises(options.resolve).then(function (resolveData) {
            var scope = options.scope;
            if (scope == null) {
                scope = _this.$rootScope.$new();
                options.scope = scope;
            }
            if (options.data == null) {
                options.data = {};
            }
            if (options.triggers == null) {
                options.triggers = 'none';
            }
            _this.autosave = _this.autosaveFactory.getInstance({
                save: options.save,
                triggers: options.triggers,
            });
            _this.data = _.extend(options.data, resolveData);
            scope.dialog = _this.data;
            var instance = _this.open(options, _this.autosaveCloseHandler);
            dialogInstance.close = instance.close;
            dialogInstance.dismiss = instance.dismiss;
            scope.$save = function () { return _this.autosave.validateAndSave(_this.data); };
            ;
            scope.$saveAndClose = function () {
                var promise = scope.$save();
                if (_.isBoolean(promise) && promise) {
                    instance.close();
                }
                else if (_this.promise.isPromise(promise)) {
                    promise.then(function () {
                        instance.close();
                    });
                }
                return promise;
            };
            dialogInstance.save = scope.$save;
            dialogInstance.saveAndClose = scope.$saveAndClose;
            dialogInstance.validateAndNotify = instance.validateAndNotify;
        });
        return dialogInstance;
    };
    DialogService.prototype.setForm = function (form) {
        if (this.autosave != null) {
            this.autosave.contentForm = form;
        }
        this.form = form;
    };
    return DialogService;
}());
exports.DialogService = DialogService;
function dialogServiceProvider() {
    'use strict';
    var _this = this;
    var provider = {
        setImplementation: function (dialogImplementation) {
            _this.dialogImplementation = dialogImplementation;
        },
        $get: function (bootstrapModalDialog, $rootScope, autosaveFactory, promise, notification, formService) {
            var dialogImplementation = _this.dialogImplementation != null
                ? _this.dialogImplementation
                : bootstrapModalDialog;
            return new DialogService(dialogImplementation, $rootScope, autosaveFactory, promise, notification, formService);
        },
    };
    provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosave_service_1.factoryName, promise_service_1.serviceName, typescript_angular_utilities_1.downgrade.notificationServiceName, form_service_1.serviceName];
    return provider;
}
exports.dialogServiceProvider = dialogServiceProvider;
angular.module(exports.moduleName, [bootstrapModalDialog.moduleName, autosave_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, promise_service_1.moduleName, form_service_1.moduleName])
    .provider(exports.serviceName, dialogServiceProvider);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFHbkUsZ0NBQW1HLHdDQUF3QyxDQUFDLENBQUE7QUFFNUksSUFBWSxvQkFBb0IsV0FBTSxvREFBb0QsQ0FBQyxDQUFBO0FBV2xGLDRCQUFvQjtBQVQ3QixpQ0FLTyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3RDLDZCQUF1RixzQkFBc0IsQ0FBQyxDQUFBO0FBSTlHLHVCQUFnRSxnQ0FBZ0MsQ0FBQztBQUF4RiwrQ0FBYTtBQUFFLGlEQUFjO0FBQUUscURBQXlEO0FBR3BGLGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFDN0MsbUJBQVcsR0FBVyxRQUFRLENBQUM7QUFRNUM7SUFLQyx1QkFBb0IsTUFBb0QsRUFDNUQsVUFBcUMsRUFDckMsZUFBd0MsRUFDeEMsT0FBd0IsRUFDeEIsWUFBaUQsRUFDakQsV0FBeUI7UUFWdEMsaUJBeUdDO1FBcEdvQixXQUFNLEdBQU4sTUFBTSxDQUE4QztRQUM1RCxlQUFVLEdBQVYsVUFBVSxDQUEyQjtRQUNyQyxvQkFBZSxHQUFmLGVBQWUsQ0FBeUI7UUFDeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBQ2pELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBaUY3Qix5QkFBb0IsR0FBOEIsVUFBQyxRQUFpQjtZQUMzRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJ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