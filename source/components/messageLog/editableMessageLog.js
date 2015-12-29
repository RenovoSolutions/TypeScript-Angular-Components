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
})();
exports.EditableMessageLogController = EditableMessageLogController;
function editableMessageLog() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<form ng-submit=\"log.add()\">\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"log.newMessage\" placeholder=\"Enter log message\" />\n\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t<button class=\"btn btn-default\" type=\"submit\" ng-disabled=\"log.busy\">\n\t\t\t\t\t\t\t<rl-busy loading=\"log.savingMessage\"></rl-busy> Add\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"message-log\">\n\t\t\t\t\t<rl-message-log service=\"log.service\" page-size=\"log.pageSize\" message-log=\"log.messageLogService\"></rl-message-log>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'log',
        scope: {},
        bindToController: {
            service: '=',
            pageSize: '=',
        },
    };
}
exports.editableMessageLog = editableMessageLog;
//# sourceMappingURL=editableMessageLog.js.map