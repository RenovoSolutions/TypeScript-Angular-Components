'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
var bootstrapModalDialog_controller_1 = require('./bootstrapModalDialog.controller');
var bootstrapModalDialog_service_1 = require('./bootstrapModalDialog.service');
__export(require('./bootstrapModalDialog.controller'));
__export(require('./bootstrapModalDialog.service'));
exports.moduleName = 'rl.ui.services.dialog.bootstrapModalDialog';
angular.module(exports.moduleName, [__promise.moduleName])
    .controller(bootstrapModalDialog_controller_1.controllerName, bootstrapModalDialog_controller_1.BootstrapModalDialogController)
    .service(bootstrapModalDialog_service_1.serviceName, bootstrapModalDialog_service_1.BootstrapModalDialogService);
//# sourceMappingURL=bootstrapModalDialog.module.js.map