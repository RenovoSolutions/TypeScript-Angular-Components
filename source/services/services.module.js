"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmljZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxJQUFZLFFBQVEsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBY3ZELGdCQUFRO0FBYlQsSUFBWSxjQUFjLFdBQU0seUNBQXlDLENBQUMsQ0FBQTtBQWN6RSxzQkFBYztBQWJmLElBQVksV0FBVyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFjL0QsbUJBQVc7QUFiWixJQUFZLGtCQUFrQixXQUFNLGlEQUFpRCxDQUFDLENBQUE7QUFjckYsMEJBQWtCO0FBYm5CLElBQVksZUFBZSxXQUFNLDJDQUEyQyxDQUFDLENBQUE7QUFjNUUsdUJBQWU7QUFiaEIsSUFBWSxNQUFNLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQWNqRCxjQUFNO0FBYlAsSUFBWSxlQUFlLFdBQU0sMkNBQTJDLENBQUMsQ0FBQTtBQWM1RSx1QkFBZTtBQWJoQixJQUFZLElBQUksV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBYzNDLFlBQUk7QUFiTCxJQUFZLE1BQU0sV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBY2pELGNBQU07QUFiUCxJQUFZLE9BQU8sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBY3BELGVBQU87QUFiUixJQUFZLGNBQWMsV0FBTSx5Q0FBeUMsQ0FBQyxDQUFBO0FBY3pFLHNCQUFjO0FBYmYsSUFBWSxhQUFhLFdBQU0sdUNBQXVDLENBQUMsQ0FBQTtBQWN0RSxxQkFBYTtBQUdILGtCQUFVLEdBQVcsZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLFFBQVEsQ0FBQyxVQUFVO0lBQ25CLGNBQWMsQ0FBQyxVQUFVO0lBQ3pCLFdBQVcsQ0FBQyxVQUFVO0lBQ3RCLGtCQUFrQixDQUFDLFVBQVU7SUFDN0IsZUFBZSxDQUFDLFVBQVU7SUFDMUIsTUFBTSxDQUFDLFVBQVU7SUFDakIsZUFBZSxDQUFDLFVBQVU7SUFDMUIsSUFBSSxDQUFDLFVBQVU7SUFDZixNQUFNLENBQUMsVUFBVTtJQUNqQixPQUFPLENBQUMsVUFBVTtJQUNsQixjQUFjLENBQUMsVUFBVTtJQUN6QixhQUFhLENBQUMsVUFBVTtDQUN4QixDQUFDLENBQUMifQ==