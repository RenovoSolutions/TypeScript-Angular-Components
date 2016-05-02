'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
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
angular.module(exports.moduleName, [__object.moduleName, jquery_service_1.moduleName, templateLoader_service_1.moduleName, __dialog.moduleName, date_filter_1.moduleName])
    .factory(messageLog_service_1.factoryName, messageLog_service_1.messageLogFactory)
    .directive(messageLog_directive_1.directiveName, messageLog_directive_1.messageLog)
    .controller(messageLog_directive_1.controllerName, messageLog_directive_1.MessageLogController)
    .directive(editableMessageLog_1.directiveName, editableMessageLog_1.editableMessageLog)
    .controller(editableMessageLog_1.controllerName, editableMessageLog_1.EditableMessageLogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlTG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUVsQywrQkFBK0Msc0NBQXNDLENBQUMsQ0FBQTtBQUV0RixtQ0FBK0Msc0JBQXNCLENBQUMsQ0FBQTtBQUN0RSxxQ0FBb0gsd0JBQXdCLENBQUMsQ0FBQTtBQUM3SSxtQ0FLTyxzQkFBc0IsQ0FBQyxDQUFBO0FBRTlCLElBQVksaUJBQWlCLFdBQU0sZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRSxJQUFPLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7QUFFM0MsdUNBQW1ELHNEQUFzRCxDQUFDLENBQUE7QUFDMUcsNEJBQStDLGdDQUFnQyxDQUFDLENBQUE7QUFFaEYsaUJBQWMsc0JBQXNCLENBQUMsRUFBQTtBQUNyQyxpQkFBYyx3QkFBd0IsQ0FBQyxFQUFBO0FBRTVCLGtCQUFVLEdBQVcsNkJBQTZCLENBQUM7QUFFOUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSwyQkFBZ0IsRUFBRSxtQ0FBb0IsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7S0FDOUgsT0FBTyxDQUFDLGdDQUFXLEVBQUUsc0NBQWlCLENBQUM7S0FDdkMsU0FBUyxDQUFDLG9DQUFhLEVBQUUsaUNBQVUsQ0FBQztLQUNwQyxVQUFVLENBQUMscUNBQWMsRUFBRSwyQ0FBb0IsQ0FBQztLQUNoRCxTQUFTLENBQUMsa0NBQThCLEVBQUUsdUNBQWtCLENBQUM7S0FDN0QsVUFBVSxDQUFDLG1DQUFnQyxFQUFFLGlEQUE0QixDQUFDLENBQUMifQ==