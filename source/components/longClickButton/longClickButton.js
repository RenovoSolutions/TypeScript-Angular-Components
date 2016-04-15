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
    function LongClickButtonController($interval, $timeout, objectUtility, promise) {
        _super.call(this, promise);
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.objectUtility = objectUtility;
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
        if (this.objectUtility.isNullOrEmpty(this.onShortClickText) === false) {
            this.buttonText = this.onShortClickText;
            this.updateProgressBarWidth();
        }
    };
    LongClickButtonController.prototype.updateProgressBarWidth = function () {
        var _this = this;
        this.$timeout(function () {
            _this.width = $('#actionButton').outerWidth();
        });
    };
    LongClickButtonController.$inject = ['$interval', '$timeout', __object.serviceName, __promise.serviceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ0NsaWNrQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9uZ0NsaWNrQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3BDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRWxDLHVCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDRCQUFzQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRXhELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBRWhFO0lBQStDLDZDQUFxQjtJQWVuRSxtQ0FBb0IsU0FBbUMsRUFDM0MsUUFBaUMsRUFDakMsYUFBc0MsRUFDOUMsT0FBa0M7UUFDckMsa0JBQU0sT0FBTyxDQUFDLENBQUM7UUFKSSxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUMzQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFYMUMsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBYXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsK0NBQVcsR0FBWDtRQUFBLGlCQWlCQztRQWhCQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFD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