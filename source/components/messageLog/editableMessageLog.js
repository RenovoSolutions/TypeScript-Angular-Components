'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var messageLog_service_1 = require('./messageLog.service');
exports.directiveName = 'rlEditableMessageLog';
exports.controllerName = 'EditableMessageLogController';
var __object = typescript_angular_utilities_1.services.object;
;
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
    EditableMessageLogController.$inject = ['$scope', messageLog_service_1.factoryName, __object.serviceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGVNZXNzYWdlTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdGFibGVNZXNzYWdlTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUliLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELG1DQU1PLHNCQUFzQixDQUFDLENBQUE7QUFFbkIscUJBQWEsR0FBVyxzQkFBc0IsQ0FBQztBQUMvQyxzQkFBYyxHQUFXLDhCQUE4QixDQUFBO0FBRWxFLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQUEsQ0FBQztBQVNuQztJQWFDLHNDQUFZLE1BQXNCLEVBQy9CLGlCQUFxQyxFQUM3QixNQUErQjtRQWYzQyxpQkFzQ0M7UUF2QlcsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBaUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxLQUFjO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwwQ0FBRyxHQUFIO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUF6Qk0sb0NBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxnQ0FBcUIsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUEwQnBGLG1DQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQXRDWSxvQ0FBNEIsK0JBc0N4QyxDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSwwdUJBZVQ7UUFDRCxVQUFVLEVBQUUsc0JBQWM7UUFDMUIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsS0FBSyxFQUFFLEVBQUU7UUFDVCxnQkFBZ0IsRUFBRTtZQUNqQixPQUFPLEVBQUUsR0FBRztZQUNaLFFBQVEsRUFBRSxHQUFHO1lBQ2IsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDZjtLQUNELENBQUM7QUFDSCxDQUFDO0FBOUJlLDBCQUFrQixxQkE4QmpDLENBQUEifQ==