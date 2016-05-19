"use strict";
require('jquery');
var angular = require('angular');
require('angular-ui-router');
var upgrade_1 = require('@angular/upgrade');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
var upgradeAdapter = new upgrade_1.UpgradeAdapter();
typescript_angular_utilities_1.downgrade.downgradeUtilitiesToAngular1(upgradeAdapter);
var bootstrapper = {
    template: require('./app.html'),
};
var moduleName = 'bootstrapper-app';
angular.module(moduleName, [
    ui_module_1.moduleName,
    'ui.router',
    typescript_angular_utilities_1.downgrade.moduleName,
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
    .component('tsBootstrapper', bootstrapper)
    .config(BaseRoute)
    .value(typescript_angular_utilities_1.downgrade.notificationServiceName, {
    success: function (message) { return console.log(message); },
    info: function (message) { return console.log(message); },
    warning: function (message) { return console.log(message); },
    error: function (message) { return console.error(message); },
});
BaseRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
function BaseRoute($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
        url: '/',
        template: '<h3>Welcome to typescript-angular-components</h3>',
    });
}
upgradeAdapter.bootstrap(document.body, [moduleName]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLFFBQVEsQ0FBQyxDQUFBO0FBQ2hCLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sbUJBQW1CLENBQUMsQ0FBQTtBQUUzQix3QkFBK0Isa0JBQWtCLENBQUMsQ0FBQTtBQUVsRCw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUduRSwwQkFBK0MscUJBQXFCLENBQUMsQ0FBQTtBQUVyRSxrQ0FBOEMsNEJBQTRCLENBQUMsQ0FBQTtBQUMzRSxtQ0FBK0MsOEJBQThCLENBQUMsQ0FBQTtBQUM5RSxrQ0FBOEMsMkJBQTJCLENBQUMsQ0FBQTtBQUMxRSx1Q0FBbUQscUNBQXFDLENBQUMsQ0FBQTtBQUN6RiwwQ0FBNkMsbUNBQW1DLENBQUMsQ0FBQTtBQUNqRixpQ0FBNEMseUJBQXlCLENBQUMsQ0FBQTtBQUN0RSxrQ0FBNkMsMkJBQTJCLENBQUMsQ0FBQTtBQUN6RSxpQ0FBNkMseUJBQXlCLENBQUMsQ0FBQTtBQUN2RSxxQkFBNkMsYUFBYSxDQUFDLENBQUE7QUFFM0QsSUFBSSxjQUFjLEdBQW1CLElBQUksd0JBQWMsRUFBRSxDQUFDO0FBQzFELHdDQUFTLENBQUMsNEJBQTRCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFdkQsSUFBTSxZQUFZLEdBQThCO0lBQy9DLFFBQVEsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDO0NBQy9CLENBQUE7QUFFRCxJQUFNLFVBQVUsR0FBVyxrQkFBa0IsQ0FBQztBQUU5QyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtJQUMxQixzQkFBZ0I7SUFDaEIsV0FBVztJQUVYLHdDQUFTLENBQUMsVUFBVTtJQUVwQiw4QkFBZTtJQUNmLCtCQUFnQjtJQUNoQiw4QkFBZTtJQUNmLG1DQUFvQjtJQUNwQixzQ0FBYztJQUNkLDZCQUFhO0lBQ2IsOEJBQWM7SUFDZCw2QkFBYztJQUNkLGlCQUFjO0NBQ2QsQ0FBQztLQUNBLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7S0FDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUNqQixLQUFLLENBQUMsd0NBQVMsQ0FBQyx1QkFBdUIsRUFBRTtJQUN6QyxPQUFPLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFwQixDQUFvQjtJQUN4QyxJQUFJLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFwQixDQUFvQjtJQUNyQyxPQUFPLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFwQixDQUFvQjtJQUN4QyxLQUFLLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQjtDQUN4QyxDQUFDLENBQUM7QUFFSixTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM3RCxtQkFBbUIsa0JBQWtCLEVBQUUsY0FBYztJQUNwRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsY0FBYztTQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLFFBQVEsRUFBRSxtREFBbUQ7S0FDN0QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMifQ==