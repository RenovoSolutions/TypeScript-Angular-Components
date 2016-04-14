"use strict";
var inputsTemplate = require('./inputs/inputs.html');
var buttonsTemplate = require('./buttons/buttons.html');
var popupTemplate = require('./popup/popup.html');
var cardsTemplate = require('./cards/cards.html');
var tabsTemplate = require('./tabs/tabs.html');
var formsTemplate = require('./forms/forms.html');
var messageLogTemplate = require('./messageLog/messageLogTest.html');
var miscTemplate = require('./misc/misc.html');
angular.module('app', ['rl.ui', 'ui.router'])
    .config(RouteConfig);
RouteConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
function RouteConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
        url: '/',
        template: '<h3>Welcome to typescript-angular-components</h3>',
    })
        .state('inputs', {
        url: '/inputs',
        template: inputsTemplate,
        controller: 'InputTestController',
        controllerAs: 'input',
    })
        .state('buttons', {
        url: '/buttons',
        template: buttonsTemplate,
        controller: 'ButtonTestController',
        controllerAs: 'button',
    })
        .state('popup', {
        url: '/popup',
        template: popupTemplate,
        controller: 'PopupTestController',
        controllerAs: 'popup',
    })
        .state('cards', {
        url: '/cards',
        template: cardsTemplate,
        controller: 'CardTestController',
        controllerAs: 'cards',
    })
        .state('tabs', {
        url: '/tabs',
        template: tabsTemplate,
        controller: 'TabTestController',
        controllerAs: 'tabs',
    })
        .state('forms', {
        url: '/forms',
        template: formsTemplate,
        controller: 'FormTestController',
        controllerAs: 'forms',
    })
        .state('messageLog', {
        url: '/messageLog',
        template: messageLogTemplate,
        controller: 'MessageLogTestController',
        controllerAs: 'messageLog',
    })
        .state('misc', {
        url: '/misc',
        template: miscTemplate,
        controller: 'MiscTestController',
        controllerAs: 'misc',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLGNBQWMsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3ZELElBQVksZUFBZSxXQUFNLHdCQUF3QixDQUFDLENBQUE7QUFDMUQsSUFBWSxhQUFhLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUNwRCxJQUFZLGFBQWEsV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3BELElBQVksWUFBWSxXQUFNLGtCQUFrQixDQUFDLENBQUE7QUFDakQsSUFBWSxhQUFhLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUNwRCxJQUFZLGtCQUFrQixXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFDdkUsSUFBWSxZQUFZLFdBQU0sa0JBQWtCLENBQUMsQ0FBQTtBQUVqRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEIsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDL0QscUJBQXFCLGtCQUFrQixFQUFFLGNBQWM7SUFDdEQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLGNBQWM7U0FDWixLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ1gsR0FBRyxFQUFFLEdBQUc7UUFDUixRQUFRLEVBQUUsbURBQW1EO0tBQzdELENBQUM7U0FDRCxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ2hCLEdBQUcsRUFBRSxTQUFTO1FBQ2QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxZQUFZLEVBQUUsT0FBTztLQUNyQixDQUFDO1NBQ0QsS0FBSyxDQUFDLFNBQVMsRUFBRTtRQUNqQixHQUFHLEVBQUUsVUFBVTtRQUNmLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFVBQVUsRUFBRSxzQkFBc0I7UUFDbEMsWUFBWSxFQUFFLFFBQVE7S0FDdEIsQ0FBQztTQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQztTQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQztTQUNELEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDZCxHQUFHLEVBQUUsT0FBTztRQUNaLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFVBQVUsRUFBRSxtQkFBbUI7UUFDL0IsWUFBWSxFQUFFLE1BQU07S0FDcEIsQ0FBQztTQUNELEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQztTQUNELEtBQUssQ0FBQyxZQUFZLEVBQUU7UUFDcEIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLFlBQVksRUFBRSxZQUFZO0tBQzFCLENBQUM7U0FDRCxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2QsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsWUFBWTtRQUN0QixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFlBQVksRUFBRSxNQUFNO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUMifQ==