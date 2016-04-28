'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUduRSxnQ0FBbUcsd0NBQXdDLENBQUMsQ0FBQTtBQUU1SSxJQUFZLG9CQUFvQixXQUFNLG9EQUFvRCxDQUFDLENBQUE7QUFXbEYsNEJBQW9CO0FBVDdCLGlDQUtPLDhCQUE4QixDQUFDLENBQUE7QUFDdEMsNkJBQXVGLHNCQUFzQixDQUFDLENBQUE7QUFJOUcsdUJBQWdFLGdDQUFnQyxDQUFDO0FBQXhGLCtDQUFhO0FBQUUsaURBQWM7QUFBRSxxREFBeUQ7QUFHcEYsa0JBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUM3QyxtQkFBVyxHQUFXLFFBQVEsQ0FBQztBQVE1QztJQUtDLHVCQUFvQixNQUFvRCxFQUM1RCxVQUFxQyxFQUNyQyxlQUF3QyxFQUN4QyxPQUF3QixFQUN4QixZQUFpRCxFQUNqRCxXQUF5QjtRQVZ0QyxpQkF5R0M7UUFwR29CLFdBQU0sR0FBTixNQUFNLENBQThDO1FBQzVELGVBQVUsR0FBVixVQUFVLENBQTJCO1FBQ3JDLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtRQUN4QyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBcUM7UUFDakQsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFpRjdCLHlCQUFvQixHQUE4QixVQUFDLFFBQWlCO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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