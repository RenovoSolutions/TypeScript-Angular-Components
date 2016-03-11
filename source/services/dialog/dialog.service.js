'use strict';
var ng = require('angular');
var bootstrapModalDialog = require('./bootstrapModalDialog/bootstrapModalDialog.module');
exports.bootstrapModalDialog = bootstrapModalDialog;
exports.moduleName = 'rl.ui.services.dialog';
exports.serviceName = 'dialog';
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.open = function (options, closeHandler) {
        return this.dialog.open(options, closeHandler);
    };
    DialogService.prototype.prompt = function (options) {
        options.okButton = options.okButton || 'Ok';
        options.cancelButton = options.cancelButton || 'Cancel';
        return this.dialog.prompt(options, require('./promptDialog.html'));
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
        $get: function (bootstrapModalDialog) {
            var dialogImplementation = _this.dialogImplementation != null
                ? _this.dialogImplementation
                : bootstrapModalDialog;
            return new DialogService(dialogImplementation);
        },
    };
    provider.$get.$inject = [bootstrapModalDialog.serviceName];
    return provider;
}
exports.dialogServiceProvider = dialogServiceProvider;
ng.module(exports.moduleName, [bootstrapModalDialog.moduleName])
    .provider(exports.serviceName, dialogServiceProvider);
//# sourceMappingURL=dialog.service.js.map