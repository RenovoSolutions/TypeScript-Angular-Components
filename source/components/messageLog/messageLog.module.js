'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var messageLog_service_1 = require('./messageLog.service');
var messageLog_directive_1 = require('./messageLog.directive');
__export(require('./messageLog.service'));
__export(require('./messageLog.directive'));
exports.moduleName = 'rl.ui.components.messageLog';
angular.module(exports.moduleName, [])
    .factory(messageLog_service_1.factoryName, messageLog_service_1.messageLogFactory)
    .directive(messageLog_directive_1.directiveName, messageLog_directive_1.messageLog)
    .controller(messageLog_directive_1.controllerName, messageLog_directive_1.MessageLogController);
//# sourceMappingURL=messageLog.module.js.map