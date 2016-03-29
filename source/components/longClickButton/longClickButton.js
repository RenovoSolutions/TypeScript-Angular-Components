// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var $ = require('jquery');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
exports.moduleName = 'rl.ui.components.longClickButton';
exports.componentName = 'rlLongClickButton';
exports.controllerName = 'LongClickButtonController';
var __object = typescript_angular_utilities_1.services.object;
var LongClickButtonController = (function () {
    function LongClickButtonController($scope, $interval, $timeout, objectUtility, promise) {
        var _this = this;
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.objectUtility = objectUtility;
        this.promise = promise;
        this.interval = 25;
        this.duration = 1500;
        this.buttonText = this.text;
        this.type = this.type != null ? this.type : 'default';
        this.size = this.size != null ? 'btn-' + this.size : null;
        $scope.$watch(function () { return _this.buttonText; }, function () {
            $timeout(function () {
                _this.width = $('#actionButton').outerWidth();
            });
        });
    }
    LongClickButtonController.prototype.startAction = function () {
        var _this = this;
        if (this.active || this.busy) {
            return;
        }
        this.actionProgress = 0;
        this.active = true;
        this.actionInterval = this.$interval(function () {
            _this.actionProgress += _this.interval;
            if (_this.actionProgress >= _this.duration) {
                _this.cleanup();
                _this.buttonText = _this.text;
                _this.trigger();
            }
        }, this.interval);
    };
    LongClickButtonController.prototype.stopAction = function () {
        if (this.active) {
            if (this.actionProgress < this.duration) {
                this.warn();
            }
            this.cleanup();
        }
    };
    LongClickButtonController.prototype.cleanup = function () {
        this.$interval.cancel(this.actionInterval);
        this.actionProgress = 0;
        this.active = false;
    };
    LongClickButtonController.prototype.warn = function () {
        if (this.objectUtility.isNullOrEmpty(this.onShortClickText) === false) {
            this.buttonText = this.onShortClickText;
        }
    };
    LongClickButtonController.prototype.trigger = function () {
        var _this = this;
        if (!this.busy) {
            this.busy = true;
            var result = this.action();
            if (this.promise.isPromise(result) && _.isFunction(result.finally)) {
                result.finally(function () {
                    _this.busy = false;
                });
            }
        }
    };
    LongClickButtonController.$inject = ['$scope', '$interval', '$timeout', __object.serviceName, __promise.serviceName];
    return LongClickButtonController;
}());
exports.LongClickButtonController = LongClickButtonController;
var longClickButton = {
    template: require('./longClickButton.html'),
    controller: exports.controllerName,
    controllerAs: 'button',
    bindings: {
        action: '&',
        text: '@',
        onShortClickText: '@',
        icon: '@',
        busy: '<?',
        rightAligned: '<?',
        type: '@',
        ngDisabled: '<?',
    },
};
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, longClickButton)
    .controller(exports.controllerName, LongClickButtonController);
//# sourceMappingURL=longClickButton.js.map