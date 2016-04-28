'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var messageLog_service_1 = require('./messageLog.service');
exports.directiveName = 'rlEditableMessageLog';
exports.controllerName = 'EditableMessageLogController';
var EditableMessageLogController = (function () {
    function EditableMessageLogController($scope, messageLogFactory, object) {
        var _this = this;
        this.object = object;
        this.messageLogService = messageLogFactory.getInstance();
        $scope.$watch(function () { return _this.messageLogService.busy; }, function (value) {
            if (value === false) {
                _this.busy = false;
                _this.savingMessage = false;
            }
            else {
                _this.busy = true;
            }
        });
    }
    EditableMessageLogController.prototype.add = function () {
        if (this.object.isNullOrWhitespace(this.newMessage)) {
            return null;
        }
        this.savingMessage = true;
        var message = this.newMessage;
        this.newMessage = '';
        return this.messageLogService.addMessage({ message: message });
    };
    EditableMessageLogController.$inject = ['$scope', messageLog_service_1.factoryName, typescript_angular_utilities_1.downgrade.objectServiceName];
    return EditableMessageLogController;
}());
exports.EditableMessageLogController = EditableMessageLogController;
function editableMessageLog() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<form ng-submit=\"log.add()\">\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"log.newMessage\" placeholder=\"Enter log message\" />\n\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t<button class=\"btn btn-default\" type=\"submit\" ng-disabled=\"log.busy\">\n\t\t\t\t\t\t\t<rl-busy loading=\"log.savingMessage\"></rl-busy> Add\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"message-log\">\n\t\t\t\t\t<rl-message-log service=\"log.service\" page-size=\"log.pageSize\" message-log=\"log.messageLogService\"\n\t\t\t\t\t\t\t\t\tcurrent-user=\"log.currentUser\" can-delete=\"log.canDelete\"></rl-message-log>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'log',
        scope: {},
        bindToController: {
            service: '=',
            pageSize: '=',
            currentUser: '=?',
            canDelete: '=?',
        },
    };
}
exports.editableMessageLog = editableMessageLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGVNZXNzYWdlTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdGFibGVNZXNzYWdlTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUliLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR25FLG1DQU1PLHNCQUFzQixDQUFDLENBQUE7QUFFbkIscUJBQWEsR0FBVyxzQkFBc0IsQ0FBQztBQUMvQyxzQkFBYyxHQUFXLDhCQUE4QixDQUFBO0FBVWxFO0lBYUMsc0NBQVksTUFBc0IsRUFDL0IsaUJBQXFDLEVBQzdCLE1BQStCO1FBZjNDLGlCQXNDQztRQXZCVyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFpQixNQUFNLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWM7WUFDcEYsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDBDQUFHLEdBQUg7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQXpCTSxvQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLGdDQUFxQixFQUFFLHdDQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQTBCM0YsbUNBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBdENZLG9DQUE0QiwrQkFzQ3hDLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLDB1QkFlVDtRQUNELFVBQVUsRUFBRSxzQkFBYztRQUMxQixZQUFZLEVBQUUsS0FBSztRQUNuQixLQUFLLEVBQUUsRUFBRTtRQUNULGdCQUFnQixFQUFFO1lBQ2pCLE9BQU8sRUFBRSxHQUFHO1lBQ1osUUFBUSxFQUFFLEdBQUc7WUFDYixXQUFXLEVBQUUsSUFBSTtZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNmO0tBQ0QsQ0FBQztBQUNILENBQUM7QUE5QmUsMEJBQWtCLHFCQThCakMsQ0FBQSJ9