"use strict";
var angular = require('angular');
var dialog_service_1 = require('../../source/services/dialog/dialog.service');
exports.moduleName = 'PopupTestModule';
var PopupTestController = (function () {
    function PopupTestController(dialog) {
        this.dialog = dialog;
    }
    PopupTestController.prototype.$onInit = function () {
        this.popover = '<div>{{popup.content}}</div>';
        this.content = 'Some content';
    };
    PopupTestController.prototype.prompt = function () {
        this.dialog.prompt({
            acceptHandler: function () { alert('Yes'); },
            cancelHandler: function () { alert('No'); },
            okButton: 'Yes',
            cancelButton: 'No',
            message: 'Do you want to do this?',
        });
    };
    PopupTestController.prototype.openDialog = function () {
        this.dialog.open({
            template: "<rl-dialog>\n\t\t\t\t\t\t<rl-dialog-header>Header</rl-dialog-header>\n\t\t\t\t\t\t<rl-dialog-content>Content</rl-dialog-content>\n\t\t\t\t\t\t<rl-dialog-footer>Footer</rl-dialog-footer>\n\t\t\t\t\t</rl-dialog >",
        });
    };
    PopupTestController.$inject = [dialog_service_1.serviceName];
    return PopupTestController;
}());
PopupRoute.$inject = ['$stateProvider'];
function PopupRoute($stateProvider) {
    $stateProvider
        .state('popup', {
        url: '/popup',
        template: require('./popup.html'),
        controller: 'PopupTestController',
        controllerAs: 'popup',
    });
}
angular.module(exports.moduleName, [])
    .controller('PopupTestController', PopupTestController)
    .config(PopupRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXBCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3B1cEJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsK0JBQW1FLDZDQUE2QyxDQUFDLENBQUE7QUFFcEcsa0JBQVUsR0FBVyxpQkFBaUIsQ0FBQztBQUVwRDtJQUtDLDZCQUFvQixNQUF5RDtRQUF6RCxXQUFNLEdBQU4sTUFBTSxDQUFtRDtJQUFJLENBQUM7SUFFbEYscUNBQU8sR0FBUDtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixhQUFhLEVBQUUsY0FBYSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLGFBQWEsRUFBRSxjQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUseUJBQXlCO1NBQ2xDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBVSxHQUFWO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsUUFBUSxFQUFFLG9OQUlNO1NBQ2hCLENBQUMsQ0FBQztJQUNKLENBQUM7SUExQk0sMkJBQU8sR0FBYSxDQUFDLDRCQUFhLENBQUMsQ0FBQztJQTJCNUMsMEJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDO0FBRUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDeEMsb0JBQW9CLGNBQWM7SUFDakMsY0FBYztTQUNaLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ2pDLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsVUFBVSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDO0tBQ3RELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyJ9