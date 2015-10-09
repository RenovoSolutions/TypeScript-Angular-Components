// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var messageLog_service_1 = require('./messageLog.service');
exports.directiveName = 'rlMessageLog';
exports.controllerName = 'MessageLogController';
var MessageLogController = (function () {
    function MessageLogController($scope, messageLogFactory) {
        var _this = this;
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
    MessageLogController.prototype.getOlder = function () {
        return this.messageLog.getNextPage();
    };
    MessageLogController.prototype.getTop = function () {
        return this.messageLog.getTopPage();
    };
    MessageLogController.$inject = ['$scope', messageLog_service_1.factoryName];
    return MessageLogController;
})();
exports.MessageLogController = MessageLogController;
function messageLog() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./messageLog.html'),
        controller: exports.controllerName,
        controllerAs: 'log',
        scope: {},
        bindToController: {
            service: '=',
            pageSize: '=',
            messageLogBinding: '=messageLog',
        },
    };
}
exports.messageLog = messageLog;
//# sourceMappingURL=messageLog.directive.js.map