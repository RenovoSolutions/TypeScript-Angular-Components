"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
var messageLog_service_1 = require('./messageLog.service');
var messageLog_directive_1 = require('./messageLog.directive');
var editableMessageLog_1 = require('./editableMessageLog');
var componentServices = require('../../services/services.module');
var __dialog = componentServices.dialog;
var templateLoader_service_1 = require('../../services/templateLoader/templateLoader.service');
var date_filter_1 = require('../../filters/date/date.filter');
__export(require('./messageLog.service'));
__export(require('./messageLog.directive'));
exports.moduleName = 'rl.ui.components.messageLog';
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, jquery_service_1.moduleName, templateLoader_service_1.moduleName, __dialog.moduleName, date_filter_1.moduleName])
    .factory(messageLog_service_1.factoryName, messageLog_service_1.messageLogFactory)
    .directive(messageLog_directive_1.directiveName, messageLog_directive_1.messageLog)
    .controller(messageLog_directive_1.controllerName, messageLog_directive_1.MessageLogController)
    .directive(editableMessageLog_1.directiveName, editableMessageLog_1.editableMessageLog)
    .controller(editableMessageLog_1.controllerName, editableMessageLog_1.EditableMessageLogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlTG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQTBCLDhCQUE4QixDQUFDLENBQUE7QUFFekQsK0JBQStDLHNDQUFzQyxDQUFDLENBQUE7QUFFdEYsbUNBQStDLHNCQUFzQixDQUFDLENBQUE7QUFDdEUscUNBQW9ILHdCQUF3QixDQUFDLENBQUE7QUFDN0ksbUNBS08sc0JBQXNCLENBQUMsQ0FBQTtBQUU5QixJQUFZLGlCQUFpQixXQUFNLGdDQUFnQyxDQUFDLENBQUE7QUFDcEUsSUFBTyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0FBRTNDLHVDQUFtRCxzREFBc0QsQ0FBQyxDQUFBO0FBQzFHLDRCQUErQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWhGLGlCQUFjLHNCQUFzQixDQUFDLEVBQUE7QUFDckMsaUJBQWMsd0JBQXdCLENBQUMsRUFBQTtBQUU1QixrQkFBVSxHQUFXLDZCQUE2QixDQUFDO0FBRTlELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxFQUFFLDJCQUFnQixFQUFFLG1DQUFvQixFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztLQUMvSCxPQUFPLENBQUMsZ0NBQVcsRUFBRSxzQ0FBaUIsQ0FBQztLQUN2QyxTQUFTLENBQUMsb0NBQWEsRUFBRSxpQ0FBVSxDQUFDO0tBQ3BDLFVBQVUsQ0FBQyxxQ0FBYyxFQUFFLDJDQUFvQixDQUFDO0tBQ2hELFNBQVMsQ0FBQyxrQ0FBOEIsRUFBRSx1Q0FBa0IsQ0FBQztLQUM3RCxVQUFVLENBQUMsbUNBQWdDLEVBQUUsaURBQTRCLENBQUMsQ0FBQyJ9