"use strict";
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __notification = typescript_angular_utilities_1.services.notification;
var ui_module_1 = require('../source/ui.module');
var inputBootstrapper_1 = require('./inputs/inputBootstrapper');
var buttonBootstrapper_1 = require('./buttons/buttonBootstrapper');
var popupBootstrapper_1 = require('./popup/popupBootstrapper');
var messageLogBootstrapper_1 = require('./messageLog/messageLogBootstrapper');
var cardContainerBootstrapper_1 = require('./cards/cardContainerBootstrapper');
var tabsBootstrapper_1 = require('./tabs/tabsBootstrapper');
var formsBootstrapper_1 = require('./forms/formsBootstrapper');
var miscBootstrapper_1 = require('./misc/miscBootstrapper');
var text_1 = require('./text/text');
angular.module('app', [
    ui_module_1.moduleName,
    'ui.router',
    inputBootstrapper_1.moduleName,
    buttonBootstrapper_1.moduleName,
    popupBootstrapper_1.moduleName,
    messageLogBootstrapper_1.moduleName,
    cardContainerBootstrapper_1.moduleName,
    tabsBootstrapper_1.moduleName,
    formsBootstrapper_1.moduleName,
    miscBootstrapper_1.moduleName,
    text_1.moduleName,
])
    .config(BaseRoute)
    .config(notificationConfig);
BaseRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
function BaseRoute($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
        url: '/',
        template: '<h3>Welcome to typescript-angular-components</h3>',
    });
}
notificationConfig.$inject = [__notification.serviceName + 'Provider'];
function notificationConfig(notificationProvider) {
    notificationProvider.setNotifier({
        success: function (message) { return console.log(message); },
        info: function (message) { return console.log(message); },
        warning: function (message) { return console.log(message); },
        error: function (message) { return console.error(message); },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLGNBQWMsR0FBRyx1Q0FBUSxDQUFDLFlBQVksQ0FBQztBQUU5QywwQkFBK0MscUJBQXFCLENBQUMsQ0FBQTtBQUVyRSxrQ0FBOEMsNEJBQTRCLENBQUMsQ0FBQTtBQUMzRSxtQ0FBK0MsOEJBQThCLENBQUMsQ0FBQTtBQUM5RSxrQ0FBOEMsMkJBQTJCLENBQUMsQ0FBQTtBQUMxRSx1Q0FBbUQscUNBQXFDLENBQUMsQ0FBQTtBQUN6RiwwQ0FBNkMsbUNBQW1DLENBQUMsQ0FBQTtBQUNqRixpQ0FBNEMseUJBQXlCLENBQUMsQ0FBQTtBQUN0RSxrQ0FBNkMsMkJBQTJCLENBQUMsQ0FBQTtBQUN6RSxpQ0FBNkMseUJBQXlCLENBQUMsQ0FBQTtBQUN2RSxxQkFBNkMsYUFBYSxDQUFDLENBQUE7QUFFM0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7SUFDckIsc0JBQWdCO0lBQ2hCLFdBQVc7SUFFWCw4QkFBZTtJQUNmLCtCQUFnQjtJQUNoQiw4QkFBZTtJQUNmLG1DQUFvQjtJQUNwQixzQ0FBYztJQUNkLDZCQUFhO0lBQ2IsOEJBQWM7SUFDZCw2QkFBYztJQUNkLGlCQUFjO0NBQ2QsQ0FBQztLQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDakIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0IsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsbUJBQW1CLGtCQUFrQixFQUFFLGNBQWM7SUFDcEQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLGNBQWM7U0FDWixLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixRQUFRLEVBQUUsbURBQW1EO0tBQzdELENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZFLDRCQUE0QixvQkFBaUU7SUFDNUYsb0JBQW9CLENBQUMsV0FBVyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CO1FBQ3hDLElBQUksRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CO1FBQ3JDLE9BQU8sRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CO1FBQ3hDLEtBQUssRUFBRSxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCO0tBQ3hDLENBQUMsQ0FBQztBQUNKLENBQUMifQ==