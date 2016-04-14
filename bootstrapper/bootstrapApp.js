"use strict";
var inputsTemplate = require('./inputs/inputs.html');
var buttonsTemplate = require('./buttons/buttons.html');
var popupTemplate = require('./popup/popup.html');
var cardsTemplate = require('./cards/cards.html');
var tabsTemplate = require('./tabs/tabs.html');
var formsTemplate = require('./forms.html');
var messageLogTemplate = require('./messageLog/messageLogTest.html');
var miscTemplate = require('./misc.html');
angular.module('app', ['rl.ui', 'ui.router'])
    .controller('FormTestController', FormTestController)
    .controller('MiscTestController', MiscTestController)
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
FormTestController.$inject = ['$q', '$timeout'];
function FormTestController($q, $timeout) {
    var self = this;
    self.submit = function () {
        return $timeout(function () {
            console.log('Submitted');
        }, 1000);
    };
    self.count = 0;
    self.save = function () {
        self.count++;
        return $q.when();
    };
}
MiscTestController.$inject = ['$scope', '$q', '$timeout', 'dialog', 'cardContainerBuilder'];
function MiscTestController($scope, $q, $timeout, dialog, cardContainerBuilderFactory) {
    var self = this;
    // Misc
    self.myNum = 2;
    self.myValue = 1;
    self.validator = {
        validate: function () {
            return self.text === 'valid';
        },
        errorMessage: 'String must be valid',
    };
    var templateScope = $scope.$new();
    templateScope.text = 'Some text';
    self.template = {
        template: '<div>{{text}}</div>',
        scope: templateScope,
    };
    self.number = 5;
    self.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
    var unbind = $scope.$watch('misc.lazyLoad', function (value) {
        if (value) {
            self.initialized = true;
            unbind();
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vdHN0cmFwQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLGNBQWMsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3ZELElBQVksZUFBZSxXQUFNLHdCQUF3QixDQUFDLENBQUE7QUFDMUQsSUFBWSxhQUFhLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUNwRCxJQUFZLGFBQWEsV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3BELElBQVksWUFBWSxXQUFNLGtCQUFrQixDQUFDLENBQUE7QUFDakQsSUFBWSxhQUFhLFdBQU0sY0FBYyxDQUFDLENBQUE7QUFDOUMsSUFBWSxrQkFBa0IsV0FBTSxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3ZFLElBQVksWUFBWSxXQUFNLGFBQWEsQ0FBQyxDQUFBO0FBRTVDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQzNDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztLQUNwRCxVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7S0FDcEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQy9ELHFCQUFxQixrQkFBa0IsRUFBRSxjQUFjO0lBQ3RELGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxjQUFjO1NBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNYLEdBQUcsRUFBRSxHQUFHO1FBQ1IsUUFBUSxFQUFFLG1EQUFtRDtLQUM3RCxDQUFDO1NBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUNoQixHQUFHLEVBQUUsU0FBUztRQUNkLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7UUFD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