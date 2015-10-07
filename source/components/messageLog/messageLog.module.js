'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var messageLog_service_1 = require('./messageLog.service');
var messageLog_directive_1 = require('./messageLog.directive');
var editableMessageLog_1 = require('./editableMessageLog');
__export(require('./messageLog.service'));
__export(require('./messageLog.directive'));
exports.moduleName = 'rl.ui.components.messageLog';
angular.module(exports.moduleName, [__object.moduleName])
    .factory(messageLog_service_1.factoryName, messageLog_service_1.messageLogFactory)
    .directive(messageLog_directive_1.directiveName, messageLog_directive_1.messageLog)
    .controller(messageLog_directive_1.controllerName, messageLog_directive_1.MessageLogController)
    .directive(editableMessageLog_1.directiveName, editableMessageLog_1.editableMessageLog)
    .controller(editableMessageLog_1.controllerName, editableMessageLog_1.EditableMessageLogController);
//# sourceMappingURL=messageLog.module.js.map