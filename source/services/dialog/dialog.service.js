'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
var __notification = typescript_angular_utilities_1.services.notification;
var bootstrapModalDialog = require('./bootstrapModalDialog/bootstrapModalDialog.module');
exports.bootstrapModalDialog = bootstrapModalDialog;
var autosave_service_1 = require('../autosave/autosave.service');
var form_service_1 = require('../form/form.service');
var dialog_1 = require('../../components/dialog/dialog');
exports.directiveName = dialog_1.directiveName;
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
    provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosave_service_1.factoryName, __promise.serviceName, __notification.serviceName, form_service_1.serviceName];
    return provider;
}
exports.dialogServiceProvider = dialogServiceProvider;
angular.module(exports.moduleName, [bootstrapModalDialog.moduleName, autosave_service_1.moduleName, __notification.moduleName, form_service_1.moduleName])
    .provider(exports.serviceName, dialogServiceProvider);
//# sourceMappingURL=dialog.service.js.map