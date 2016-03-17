// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var jquery_service_1 = require('../../services/jquery/jquery.service');
var messageLog_service_1 = require('./messageLog.service');
var componentServices = require('../../services/services.module');
var __autosaveDialog = componentServices.autosaveDialog;
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
    function MessageLogController(autosaveDialog, $scope, messageLogFactory) {
        var _this = this;
        this.autosaveDialog = autosaveDialog;
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
        this.autosaveDialog.open({
            save: this.updateNote.bind(this),
            form: 'noteForm',
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
    MessageLogController.$inject = [__autosaveDialog.serviceName, '$scope', messageLog_service_1.factoryName];
    return MessageLogController;
}());
exports.MessageLogController = MessageLogController;
messageLog.$inject = [
    '$interpolate',
    jquery_service_1.serviceName,
    templateLoader_service_1.serviceName,
    __object.serviceName,
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
//# sourceMappingURL=messageLog.directive.js.map