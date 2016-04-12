// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var $ = require('jquery');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
var __object = typescript_angular_utilities_1.services.object;
var button_1 = require('../button/button');
var buttonAsync_1 = require('../buttonAsync/buttonAsync');
exports.moduleName = 'rl.ui.components.longClickButton';
exports.componentName = 'rlLongClickButton';
exports.controllerName = 'LongClickButtonController';
var LongClickButtonController = (function (_super) {
    __extends(LongClickButtonController, _super);
    function LongClickButtonController($scope, $interval, $timeout, objectUtility, promise) {
        var _this = this;
        _super.call(this, promise);
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.objectUtility = objectUtility;
        this.interval = 25;
        this.duration = 1500;
        this.buttonText = this.text;
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
    LongClickButtonController.$inject = ['$scope', '$interval', '$timeout', __object.serviceName, __promise.serviceName];
    return LongClickButtonController;
}(buttonAsync_1.ButtonAsyncController));
exports.LongClickButtonController = LongClickButtonController;
var longClickButton = button_1.buildButton({
    template: require('./longClickButton.html'),
    controller: exports.controllerName,
    bindings: {
        text: '@',
        onShortClickText: '@',
        icon: '@',
        busy: '<?',
        rightAligned: '<?',
    },
});
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, longClickButton)
    .controller(exports.controllerName, LongClickButtonController);
//# sourceMappingURL=longClickButton.js.map