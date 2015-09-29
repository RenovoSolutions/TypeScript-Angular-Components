'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promiseUtility = typescript_angular_utilities_1.services.promise;
exports.moduleName = 'rl.ui.components.button';
exports.directiveName = 'rlButton';
exports.controllerName = 'ButtonController';
var ButtonController = (function () {
    function ButtonController($scope, promiseUtility) {
        var _this = this;
        this.$scope = $scope;
        this.promiseUtility = promiseUtility;
        this.busy = $scope.busy;
        this.sizeClass = $scope.size != null ? 'btn-' + $scope.size : null;
        if (!_.isUndefined($scope.busy)) {
            $scope.$watch('busy', function (value) {
                if (value !== _this.busy) {
                    _this.busy = value;
                }
            });
            $scope.$watch(function () { return _this.busy; }, function (value) {
                if (value !== $scope.busy) {
                    $scope.busy = value;
                }
            });
        }
    }
    ButtonController.prototype.trigger = function () {
        var _this = this;
        if (!this.busy) {
            this.busy = true;
            var result = this.$scope.action();
            if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
                result.finally(function () {
                    _this.busy = false;
                });
            }
        }
    };
    ButtonController.$inject = ['$scope', __promiseUtility.serviceName];
    return ButtonController;
})();
function button() {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: require('./button.html'),
        scope: {
            busy: '=',
            action: '&',
            type: '@',
            ngDisabled: '=',
            buttonRightAligned: '=',
            size: '@',
        },
        controller: exports.controllerName,
        controllerAs: 'button',
    };
}
angular.module(exports.moduleName, [__promiseUtility.moduleName])
    .directive(exports.directiveName, button)
    .controller(exports.controllerName, ButtonController);
//# sourceMappingURL=button.js.map