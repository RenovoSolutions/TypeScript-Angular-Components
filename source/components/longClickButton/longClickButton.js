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
        this.duration = 2000; // Should match the CSS animation time
        this.buttonText = this.text;
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
        var warning = this.warning || this.onShortClickText || 'Press and hold to complete this action';
        this.notification.warning(warning);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ0NsaWNrQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9uZ0NsaWNrQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3BDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sY0FBYyxHQUFHLHVDQUFRLENBQUMsWUFBWSxDQUFDO0FBRTlDLHVCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDRCQUFzQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRXhELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBRWhFO0lBQStDLDZDQUFxQjtJQWVuRSxtQ0FBb0IsU0FBbUMsRUFDM0MsUUFBaUMsRUFDakMsYUFBc0MsRUFDOUMsT0FBa0MsRUFDMUIsWUFBaUQ7UUFDNUQsa0JBQU0sT0FBTyxDQUFDLENBQUM7UUFMSSxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUMzQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdEMsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBWnJELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDOUIsYUFBUSxHQUFXLElBQUksQ0FBQyxDQUFDLHNDQUFzQztRQWE5RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELCtDQUFXLEdBQVg7UUFBQSxpQkFnQkM7UUFmQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUks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