// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
var messageLog_service_1 = require('./messageLog.service');
var componentServices = require('../../services/services.module');
var __dialog = componentServices.dialog;
var templateLoader_service_1 = require('../../services/templateLoader/templateLoader.service');
exports.directiveName = 'rlMessageLog';
exports.controllerName = 'MessageLogController';
(function (DeletePermissions) {
    DeletePermissions[DeletePermissions["deleteMine"] = 0] = "deleteMine";
    DeletePermissions[DeletePermissions["deleteAll"] = 1] = "deleteAll";
    DeletePermissions[DeletePermissions["deleteNone"] = 2] = "deleteNone";
})(exports.DeletePermissions || (exports.DeletePermissions = {}));
var DeletePermissions = exports.DeletePermissions;
(function (EditPermissions) {
    EditPermissions[EditPermissions["editMine"] = 0] = "editMine";
    EditPermissions[EditPermissions["editAll"] = 1] = "editAll";
    EditPermissions[EditPermissions["editNone"] = 2] = "editNone";
})(exports.EditPermissions || (exports.EditPermissions = {}));
var EditPermissions = exports.EditPermissions;
var MessageLogController = (function () {
    function MessageLogController(dialog, $scope, messageLogFactory) {
        var _this = this;
        this.dialog = dialog;
        this.messageLog = this.messageLogBinding || messageLogFactory.getInstance();
        $scope.$watch(function () { return _this.messageLog.visibleMessages; }, function (value) {
            _this.messages = value;
        });
        $scope.$watch(function () { return _this.messageLog.hasForwardMessages; }, function (value) {
            _this.hasNextPage = value;
        });
        $scope.$watch(function () { return _this.messageLog.hasBackwardMessages; }, function (value) {
            _this.hasPreviousPage = value;
        });
        $scope.$watch(function () { return _this.messageLog.busy; }, function (value) {
            if (!value) {
                _this.loading = false;
                _this.loadingInitial = false;
            }
            else {
                _this.loading = true;
            }
        });
        $scope.$watch(function () { return _this.service; }, function (service) {
            _this.messageLog.dataService = service;
            _this.loadingInitial = true;
        });
        this.messageLog.pageSize = this.pageSize != null ? this.pageSize : 8;
        this.tooltipTemplate = require('./editedByPopover.html');
    }
    MessageLogController.prototype.getEntrySelector = function (entry) {
        if (_.isString(this.selector)) {
            return entry[this.selector];
        }
        else if (_.isFunction(this.selector)) {
            return this.selector(entry);
        }
    };
    MessageLogController.prototype.getOlder = function () {
        return this.messageLog.getNextPage();
    };
    MessageLogController.prototype.getTop = function () {
        return this.messageLog.getTopPage();
    };
    MessageLogController.prototype.canDeleteEntry = function (entry) {
        if (entry.isSystemNote) {
            return false;
        }
        switch (this.canDelete) {
            case DeletePermissions.deleteAll:
                return true;
            case DeletePermissions.deleteMine:
                return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
            default:
                return false;
        }
    };
    MessageLogController.prototype.canEditEntry = function (entry) {
        if (entry.isSystemNote) {
            return false;
        }
        switch (this.canEdit) {
            case EditPermissions.editAll:
                return true;
            case EditPermissions.editMine:
                return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
            default:
                return false;
        }
    };
    MessageLogController.prototype.editMessage = function (entry) {
        var editedEntry = _.clone(entry);
        this.dialog.openForm({
            save: this.updateNote.bind(this),
            data: {
                entry: editedEntry,
                originalEntry: entry,
            },
            template: require('./messageLogEditDialog.html'),
        });
    };
    MessageLogController.prototype.updateNote = function (data) {
        return this.messageLog.updateMessage(data.entry);
    };
    MessageLogController.prototype.saveNote = function (data) {
        return this.messageLog.addMessage(data.entry);
    };
    MessageLogController.$inject = [__dialog.serviceName, '$scope', messageLog_service_1.factoryName];
    return MessageLogController;
}());
exports.MessageLogController = MessageLogController;
messageLog.$inject = [
    '$interpolate',
    jquery_service_1.serviceName,
    templateLoader_service_1.serviceName,
    typescript_angular_utilities_1.downgrade.objectServiceName,
];
function messageLog($interpolate, jquery, templateLoader, object) {
    'use strict';
    return {
        restrict: 'E',
        template: require('./messageLog.html'),
        transclude: true,
        controller: exports.controllerName,
        controllerAs: 'log',
        scope: {
            messageData: "=",
        },
        bindToController: {
            service: '=',
            selector: '=',
            pageSize: '=',
            messageLogBinding: '=messageLog',
            messageAs: "@",
            currentUser: '=?',
            canDelete: '=?',
            canEdit: '=?',
        },
        link: function (scope, element, attributes, controller, transclude) {
            controller.templates = templateLoader.loadTemplates(transclude).templates;
        }
    };
}
exports.messageLog = messageLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlTG9nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDO0FBSWIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFJbkUsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUU5QyxtQ0FBc0csc0JBQXNCLENBQUMsQ0FBQTtBQUM3SCxJQUFZLGlCQUFpQixXQUFNLGdDQUFnQyxDQUFDLENBQUE7QUFDcEUsSUFBTyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0FBRTNDLHVDQUFzRSxzREFBc0QsQ0FBQyxDQUFBO0FBRWxILHFCQUFhLEdBQVcsY0FBYyxDQUFDO0FBQ3ZDLHNCQUFjLEdBQVcsc0JBQXNCLENBQUM7QUFFM0QsV0FBWSxpQkFBaUI7SUFDNUIscUVBQWMsQ0FBQTtJQUNkLG1FQUFhLENBQUE7SUFDYixxRUFBYyxDQUFBO0FBQ2YsQ0FBQyxFQUpXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFJNUI7QUFKRCxJQUFZLGlCQUFpQixHQUFqQix5QkFJWCxDQUFBO0FBRUQsV0FBWSxlQUFlO0lBQzFCLDZEQUFZLENBQUE7SUFDWiwyREFBVyxDQUFBO0lBQ1gsNkRBQVksQ0FBQTtBQUNiLENBQUMsRUFKVyx1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBSkQsSUFBWSxlQUFlLEdBQWYsdUJBSVgsQ0FBQTtBQWNEO0lBd0JDLDhCQUFvQixNQUFvQyxFQUFFLE1BQWlCLEVBQUUsaUJBQXFDO1FBeEJuSCxpQkE0SEM7UUFwR29CLFdBQU0sR0FBTixNQUFNLENBQThCO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBb0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxV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