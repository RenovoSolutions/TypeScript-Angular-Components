"use strict";
var angular = require('angular');
var dialog_service_1 = require('../../source/services/dialog/dialog.service');
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
angular.module('app')
    .controller('PopupTestController', PopupTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXBCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3B1cEJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsK0JBQW1FLDZDQUE2QyxDQUFDLENBQUE7QUFFakg7SUFLQyw2QkFBb0IsTUFBeUQ7UUFBekQsV0FBTSxHQUFOLE1BQU0sQ0FBbUQ7SUFBSSxDQUFDO0lBRWxGLHFDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsYUFBYSxFQUFFLGNBQWEsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxhQUFhLEVBQUUsY0FBYSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsWUFBWSxFQUFFLElBQUk7WUFDbEIsT0FBTyxFQUFFLHlCQUF5QjtTQUNsQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxvTkFJTTtTQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBMUJNLDJCQUFPLEdBQWEsQ0FBQyw0QkFBYSxDQUFDLENBQUM7SUEyQjVDLDBCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ25CLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIn0=