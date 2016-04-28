'use strict';
var angular = require('angular');
var autosave = require('./autosave/autosave.service');
exports.autosave = autosave;
var autosaveAction = require('./autosaveAction/autosaveAction.service');
exports.autosaveAction = autosaveAction;
var breakpoints = require('./breakpoints/breakpoints.module');
exports.breakpoints = breakpoints;
var componentValidator = require('./componentValidator/componentValidator.service');
exports.componentValidator = componentValidator;
var contentProvider = require('./contentProvider/contentProvider.service');
exports.contentProvider = contentProvider;
var dialog = require('./dialog/dialog.service');
exports.dialog = dialog;
var documentWrapper = require('./documentWrapper/documentWrapper.service');
exports.documentWrapper = documentWrapper;
var form = require('./form/form.service');
exports.form = form;
var jquery = require('./jquery/jquery.service');
exports.jquery = jquery;
var promise = require('./promise/promise.service');
exports.promise = promise;
var templateLoader = require('./templateLoader/templateLoader.service');
exports.templateLoader = templateLoader;
var windowWrapper = require('./windowWrapper/windowWrapper.service');
exports.windowWrapper = windowWrapper;
exports.moduleName = 'rl.ui.services';
angular.module(exports.moduleName, [
    autosave.moduleName,
    autosaveAction.moduleName,
    breakpoints.moduleName,
    componentValidator.moduleName,
    contentProvider.moduleName,
    dialog.moduleName,
    documentWrapper.moduleName,
    form.moduleName,
    jquery.moduleName,
    promise.moduleName,
    templateLoader.moduleName,
    windowWrapper.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksUUFBUSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUFjdkQsZ0JBQVE7QUFiVCxJQUFZLGNBQWMsV0FBTSx5Q0FBeUMsQ0FBQyxDQUFBO0FBY3pFLHNCQUFjO0FBYmYsSUFBWSxXQUFXLFdBQU0sa0NBQWtDLENBQUMsQ0FBQTtBQWMvRCxtQkFBVztBQWJaLElBQVksa0JBQWtCLFdBQU0saURBQWlELENBQUMsQ0FBQTtBQWNyRiwwQkFBa0I7QUFibkIsSUFBWSxlQUFlLFdBQU0sMkNBQTJDLENBQUMsQ0FBQTtBQWM1RSx1QkFBZTtBQWJoQixJQUFZLE1BQU0sV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBY2pELGNBQU07QUFiUCxJQUFZLGVBQWUsV0FBTSwyQ0FBMkMsQ0FBQyxDQUFBO0FBYzVFLHVCQUFlO0FBYmhCLElBQVksSUFBSSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFjM0MsWUFBSTtBQWJMLElBQVksTUFBTSxXQUFNLHlCQUF5QixDQUFDLENBQUE7QUFjakQsY0FBTTtBQWJQLElBQVksT0FBTyxXQUFNLDJCQUEyQixDQUFDLENBQUE7QUFjcEQsZUFBTztBQWJSLElBQVksY0FBYyxXQUFNLHlDQUF5QyxDQUFDLENBQUE7QUFjekUsc0JBQWM7QUFiZixJQUFZLGFBQWEsV0FBTSx1Q0FBdUMsQ0FBQyxDQUFBO0FBY3RFLHFCQUFhO0FBR0gsa0JBQVUsR0FBVyxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsUUFBUSxDQUFDLFVBQVU7SUFDbkIsY0FBYyxDQUFDLFVBQVU7SUFDekIsV0FBVyxDQUFDLFVBQVU7SUFDdEIsa0JBQWtCLENBQUMsVUFBVTtJQUM3QixlQUFlLENBQUMsVUFBVTtJQUMxQixNQUFNLENBQUMsVUFBVTtJQUNqQixlQUFlLENBQUMsVUFBVTtJQUMxQixJQUFJLENBQUMsVUFBVTtJQUNmLE1BQU0sQ0FBQyxVQUFVO0lBQ2pCLE9BQU8sQ0FBQyxVQUFVO0lBQ2xCLGNBQWMsQ0FBQyxVQUFVO0lBQ3pCLGFBQWEsQ0FBQyxVQUFVO0NBQ3hCLENBQUMsQ0FBQyJ9