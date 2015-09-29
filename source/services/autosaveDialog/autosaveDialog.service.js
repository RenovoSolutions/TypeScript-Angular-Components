'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var dialog_service_1 = require('../dialog/dialog.service');
var autosaveDialog_controller_1 = require('./autosaveDialog.controller');
exports.serviceName = 'autosaveDialog';
var __autosave = typescript_angular_utilities_1.services.autosave;
var AutosaveDialogService = (function () {
    function AutosaveDialogService($rootScope, dialog, autosaveFactory) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.dialog = dialog;
        this.autosaveFactory = autosaveFactory;
        this.autosaveCloseHandler = function (explicit) {
            if (explicit) {
                return true;
            }
            return _this.autosave.autosave(_this.data);
        };
        this.setForm = function (form) {
            _this.autosave.contentForm = form;
        };
    }
    AutosaveDialogService.prototype.open = function (options) {
        var scope = options.scope;
        if (scope == null) {
            scope = this.$rootScope.$new();
            options.scope = scope;
        }
        this.autosave = this.autosaveFactory.getInstance(options.save, null, options.validate);
        scope.form = options.form;
        scope.formGetter = options.formGetter;
        scope.setForm = this.setForm;
        this.data = options.data;
        scope.dialog = options.data;
        var dialogOptions = options;
        dialogOptions.controller = autosaveDialog_controller_1.controllerName;
        dialogOptions.controllerAs = 'controller';
        return this.dialog.open(options, this.autosaveCloseHandler);
    };
    AutosaveDialogService.$inject = ['$rootScope', dialog_service_1.serviceName, __autosave.factoryName];
    return AutosaveDialogService;
})();
exports.AutosaveDialogService = AutosaveDialogService;
//# sourceMappingURL=autosaveDialog.service.js.map