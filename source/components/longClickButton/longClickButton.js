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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ0NsaWNrQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9uZ0NsaWNrQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3BDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRWxDLHVCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDRCQUFzQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRXhELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBRWhFO0lBQStDLDZDQUFxQjtJQWVuRSxtQ0FBWSxNQUFzQixFQUN0QixTQUFtQyxFQUNuQyxRQUFpQyxFQUNqQyxhQUFzQyxFQUM5QyxPQUFrQztRQW5CdkMsaUJBcUVDO1FBakRDLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBSkosY0FBUyxHQUFULFNBQVMsQ0FBMEI7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBWjFDLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDOUIsYUFBUSxHQUFXLElBQUksQ0FBQztRQWN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFnQixNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4RCxRQUFRLENBQUM7Z0JBQ1IsS0FBSSxDQUFDLEtBQUssR0FB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