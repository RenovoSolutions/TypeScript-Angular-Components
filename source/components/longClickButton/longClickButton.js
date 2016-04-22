// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promise = typescript_angular_utilities_1.services.promise;
var __object = typescript_angular_utilities_1.services.object;
var __notification = typescript_angular_utilities_1.services.notification;
var button_1 = require('../button/button');
var buttonAsync_1 = require('../buttonAsync/buttonAsync');
exports.moduleName = 'rl.ui.components.longClickButton';
exports.componentName = 'rlLongClickButton';
exports.controllerName = 'LongClickButtonController';
var LongClickButtonController = (function (_super) {
    __extends(LongClickButtonController, _super);
    function LongClickButtonController($interval, $timeout, objectUtility, promise, notification) {
        _super.call(this, promise);
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.objectUtility = objectUtility;
        this.notification = notification;
        this.interval = 25;
        this.duration = 1500;
        this.buttonText = this.text;
        this.updateProgressBarWidth();
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
                _this.updateProgressBarWidth();
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
        var warning = this.warning || this.onShortClickText || 'Press and hold to complete this action';
        this.notification.warning(warning);
    };
    LongClickButtonController.prototype.updateProgressBarWidth = function () {
        var _this = this;
        this.$timeout(function () {
            _this.width = angular.element('#actionButton').outerWidth();
        });
    };
    LongClickButtonController.$inject = ['$interval', '$timeout', __object.serviceName, __promise.serviceName, __notification.serviceName];
    return LongClickButtonController;
}(buttonAsync_1.ButtonAsyncController));
exports.LongClickButtonController = LongClickButtonController;
var longClickButton = button_1.buildButton({
    template: require('./longClickButton.html'),
    controller: exports.controllerName,
    bindings: {
        warning: '@',
        busy: '<?',
        rightAligned: '<?',
        // deprecated
        onShortClickText: '@',
        icon: '@',
        text: '@',
    },
});
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, longClickButton)
    .controller(exports.controllerName, LongClickButtonController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ0NsaWNrQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9uZ0NsaWNrQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3BDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sY0FBYyxHQUFHLHVDQUFRLENBQUMsWUFBWSxDQUFDO0FBRTlDLHVCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDRCQUFzQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRXhELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBRWhFO0lBQStDLDZDQUFxQjtJQWdCbkUsbUNBQW9CLFNBQW1DLEVBQzNDLFFBQWlDLEVBQ2pDLGFBQXNDLEVBQzlDLE9BQWtDLEVBQzFCLFlBQWlEO1FBQzVELGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBTEksY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBRXRDLGlCQUFZLEdBQVosWUFBWSxDQUFxQztRQWJyRCxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFjdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQ0FBVyxHQUFYO1FBQUEsaUJBaUJDO1FBaEJBLEVBQUUsQ0FBQyxDQUFDLElB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