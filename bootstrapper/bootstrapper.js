"use strict";
var angular = require('angular');
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
]).config(BaseRoute);
BaseRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
function BaseRoute($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
        url: '/',
        template: '<h3>Welcome to typescript-angular-components</h3>',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQywwQkFBK0MscUJBQXFCLENBQUMsQ0FBQTtBQUVyRSxrQ0FBOEMsNEJBQTRCLENBQUMsQ0FBQTtBQUMzRSxtQ0FBK0MsOEJBQThCLENBQUMsQ0FBQTtBQUM5RSxrQ0FBOEMsMkJBQTJCLENBQUMsQ0FBQTtBQUMxRSx1Q0FBbUQscUNBQXFDLENBQUMsQ0FBQTtBQUN6RiwwQ0FBNkMsbUNBQW1DLENBQUMsQ0FBQTtBQUNqRixpQ0FBNEMseUJBQXlCLENBQUMsQ0FBQTtBQUN0RSxrQ0FBNkMsMkJBQTJCLENBQUMsQ0FBQTtBQUN6RSxpQ0FBNkMseUJBQXlCLENBQUMsQ0FBQTtBQUN2RSxxQkFBNkMsYUFBYSxDQUFDLENBQUE7QUFFM0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7SUFDckIsc0JBQWdCO0lBQ2hCLFdBQVc7SUFFWCw4QkFBZTtJQUNmLCtCQUFnQjtJQUNoQiw4QkFBZTtJQUNmLG1DQUFvQjtJQUNwQixzQ0FBYztJQUNkLDZCQUFhO0lBQ2IsOEJBQWM7SUFDZCw2QkFBYztJQUNkLGlCQUFjO0NBQ2QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVyQixTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM3RCxtQkFBbUIsa0JBQWtCLEVBQUUsY0FBYztJQUNwRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsY0FBYztTQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDWCxHQUFHLEVBQUUsR0FBRztRQUNSLFFBQVEsRUFBRSxtREFBbUQ7S0FDN0QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9