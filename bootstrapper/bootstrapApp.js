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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3ZELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzFELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BELElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDdkUsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFakQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQy9ELHFCQUFxQixrQkFBa0IsRUFBRSxjQUFjO0lBQ3RELGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxjQUFjO1NBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsUUFBUSxFQUFFLG1EQUFtRDtLQUM3RCxDQUFDO1NBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLEVBQUUsU0FBUztRQUNkLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQztTQUNELEtBQUssQ0FBQyxTQUFTLEVBQUU7UUFDakIsR0FBRyxFQUFFLFVBQVU7UUFDZixRQUFRLEVBQUUsZUFBZTtRQUN6QixVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFlBQVksRUFBRSxRQUFRO0tBQ3RCLENBQUM7U0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2YsR0FBRyxFQUFFLFFBQVE7UUFDYixRQUFRLEVBQUUsYUFBYTtRQUN2QixVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFlBQVksRUFBRSxPQUFPO0tBQ3JCLENBQUM7U0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2YsR0FBRyxFQUFFLFFBQVE7UUFDYixRQUFRLEVBQUUsYUFBYTtRQUN2QixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFlBQVksRUFBRSxPQUFPO0tBQ3JCLENBQUM7U0FDRCxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2QsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsWUFBWTtRQUN0QixVQUFVLEVBQUUsbUJBQW1CO1FBQy9CLFlBQVksRUFBRSxNQUFNO0tBQ3BCLENBQUM7U0FDRCxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2YsR0FBRyxFQUFFLFFBQVE7UUFDYixRQUFRLEVBQUUsYUFBYTtRQUN2QixVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFlBQVksRUFBRSxPQUFPO0tBQ3JCLENBQUM7U0FDRCxLQUFLLENBQUMsWUFBWSxFQUFFO1FBQ3BCLEdBQUcsRUFBRSxhQUFhO1FBQ2xCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxZQUFZLEVBQUUsWUFBWTtLQUMxQixDQUFDO1NBQ0QsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNkLEdBQUcsRUFBRSxPQUFPO1FBQ1osUUFBUSxFQUFFLFlBQVk7UUFDdEIsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxZQUFZLEVBQUUsTUFBTTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDIn0=