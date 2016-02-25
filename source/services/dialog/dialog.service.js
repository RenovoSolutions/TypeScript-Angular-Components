'use strict';
var ng = require('angular');
var baseDialog = require('./baseDialog/baseDialog.module');
exports.baseDialog = baseDialog;
exports.moduleName = 'rl.ui.services.dialog';
exports.serviceName = 'dialog';
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.open = function (options, closeHandler) {
        return this.dialog.open(options, closeHandler);
    };
    return DialogService;
})();
exports.DialogService = DialogService;
function dialogServiceProvider() {
    'use strict';
    var _this = this;
    var provider = {
        setImplementation: function (dialogImplementation) {
            _this.dialogImplementation = dialogImplementation;
        },
        $get: function (baseDialog) {
            var dialogImplementation = _this.dialogImplementation != null
                ? _this.dialogImplementation
                : baseDialog;
            return new DialogService(dialogImplementation);
        },
    };
    provider.$get.$inject = [baseDialog.serviceName];
    return provider;
}
exports.dialogServiceProvider = dialogServiceProvider;
ng.module(exports.moduleName, [baseDialog.moduleName])
    .provider(exports.serviceName, dialogServiceProvider);
//# sourceMappingURL=dialog.service.js.map