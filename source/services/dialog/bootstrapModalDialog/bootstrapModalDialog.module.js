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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwTW9kYWxEaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBRXBDLGdEQUErRCxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ25HLDZDQUF5RCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTFGLGlCQUFjLG1DQUFtQyxDQUFDLEVBQUE7QUFDbEQsaUJBQWMsZ0NBQWdDLENBQUMsRUFBQTtBQUVwQyxrQkFBVSxHQUFXLDRDQUE0QyxDQUFDO0FBRTdFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxVQUFVLENBQUMsZ0RBQWMsRUFBRSxnRUFBOEIsQ0FBQztLQUMxRCxPQUFPLENBQUMsMENBQVcsRUFBRSwwREFBMkIsQ0FBQyxDQUFDIn0=