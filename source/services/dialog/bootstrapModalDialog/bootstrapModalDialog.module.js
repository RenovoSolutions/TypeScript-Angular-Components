"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var bootstrapModalDialog_controller_1 = require('./bootstrapModalDialog.controller');
var bootstrapModalDialog_service_1 = require('./bootstrapModalDialog.service');
__export(require('./bootstrapModalDialog.controller'));
__export(require('./bootstrapModalDialog.service'));
exports.moduleName = 'rl.ui.services.dialog.bootstrapModalDialog';
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .controller(bootstrapModalDialog_controller_1.controllerName, bootstrapModalDialog_controller_1.BootstrapModalDialogController)
    .service(bootstrapModalDialog_service_1.serviceName, bootstrapModalDialog_service_1.BootstrapModalDialogService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwTW9kYWxEaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCxnREFBK0QsbUNBQW1DLENBQUMsQ0FBQTtBQUNuRyw2Q0FBeUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUUxRixpQkFBYyxtQ0FBbUMsQ0FBQyxFQUFBO0FBQ2xELGlCQUFjLGdDQUFnQyxDQUFDLEVBQUE7QUFFcEMsa0JBQVUsR0FBVyw0Q0FBNEMsQ0FBQztBQUU3RSxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx3Q0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2hELFVBQVUsQ0FBQyxnREFBYyxFQUFFLGdFQUE4QixDQUFDO0tBQzFELE9BQU8sQ0FBQywwQ0FBVyxFQUFFLDBEQUEyQixDQUFDLENBQUMifQ==