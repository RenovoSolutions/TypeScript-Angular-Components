'use strict';
var messageLog_service_1 = require('./messageLog.service');
exports.directiveName = 'rlMessageLog';
exports.controllerName = 'MessageLogController';
var MessageLogController = (function () {
    function MessageLogController($scope, messageLogFactory) {
        var _this = this;
        this.messageLog = this.messageLogBinding != null ? this.messageLogBinding : messageLogFactory.getInstance();
        this.loadingInitial = true;
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
        this.messageLog.pageSize = this.pageSize != null ? this.pageSize : 8;
        this.messageLog.dataService = this.service;
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
        template: "\n\t\t\t<div>\n\t\t\t\t<rl-busy loading=\"log.loadingInitial\" size=\"2x\"></rl-busy>\n\t\t\t\t<div class=\"content-group\" ng-repeat=\"entry in log.messages\">\n\t\t\t\t\t<div ng-bind-html=\"entry.message\"></div>\n\t\t\t\t\t<div class=\"byline\">{{entry.createdBy}}</div>\n\t\t\t\t\t<div class=\"byline\">{{entry.createdDate}} {{entry.createdTime}} UTC</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<div class=\"text-center\">\n\t\t\t\t\t\t\t<rl-button type=\"default\" action=\"log.getTopPage()\" ng-disabled=\"log.loading\" button-right-aligned=\"true\">\n\t\t\t\t\t\t\t\t<span ng-show=\"log.hasPreviousPage\">Top</span>\n\t\t\t\t\t\t\t\t<span ng-hide=\"log.hasPreviousPage\">Refresh</span>\n\t\t\t\t\t\t\t</rl-button>\n\t\t\t\t\t\t\t<rl-button type=\"default\" ng-disabled=\"log.hasNextPage == false || log.loading\" action=\"log.getNextPage()\">\n\t\t\t\t\t\t\t\tOlder <i class=\"fa fa-chevron-right\"></i>\n\t\t\t\t\t\t\t</rl-button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t",
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