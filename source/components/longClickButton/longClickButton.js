"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var promise_service_1 = require('../../services/promise/promise.service');
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
        this.duration = 2000; // Should match the CSS animation time
    }
    LongClickButtonController.prototype.startAction = function () {
        var _this = this;
        if (this.active || this.busy) {
            return;
        }
        this.active = true;
        this.actionTimeout = this.$timeout(function () {
            _this.cleanup();
            _this.trigger();
        }, this.duration);
    };
    LongClickButtonController.prototype.stopAction = function () {
        if (this.active) {
            if (this.actionTimeout != null) {
                this.warn();
            }
            this.cleanup();
        }
    };
    LongClickButtonController.prototype.cleanup = function () {
        this.$timeout.cancel(this.actionTimeout);
        this.actionTimeout = null;
        this.active = false;
    };
    LongClickButtonController.prototype.warn = function () {
        var warning = this.warning || this.onShortClickText || 'Press and hold to complete this action';
        this.notification.warning(warning);
    };
    LongClickButtonController.$inject = ['$interval', '$timeout', typescript_angular_utilities_1.downgrade.objectServiceName, promise_service_1.serviceName, typescript_angular_utilities_1.downgrade.notificationServiceName];
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
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, promise_service_1.moduleName])
    .component(exports.componentName, longClickButton)
    .controller(exports.controllerName, LongClickButtonController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ0NsaWNrQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9uZ0NsaWNrQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBSW5FLGdDQUFtRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRzVJLHVCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDRCQUFzQyw0QkFBNEIsQ0FBQyxDQUFBO0FBRXhELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBRWhFO0lBQStDLDZDQUFxQjtJQVluRSxtQ0FBb0IsU0FBbUMsRUFDM0MsUUFBaUMsRUFDakMsYUFBc0MsRUFDOUMsT0FBd0IsRUFDaEIsWUFBaUQ7UUFDNUQsa0JBQU0sT0FBTyxDQUFDLENBQUM7UUFMSSxjQUFTLEdBQVQsU0FBUyxDQUEwQjtRQUMzQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFFdEMsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBVDdELGFBQVEsR0FBVyxJQUFJLENBQUMsQ0FBQyxzQ0FBc0M7SUFXL0QsQ0FBQztJQUVELCtDQUFXLEdBQVg7UUFBQSxpQkFXQztRQVZBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsOENBQVUsR0FBVjtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQztZQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0YsQ0FBQztJQUVPLDJDQUFPLEdBQWY7UUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVPLHdDQUFJLEdBQVo7UUFDQyxJQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSx3Q0FBd0MsQ0FBQztRQUMxRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBekNNLGlDQUFPLEdBQWEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLHdDQUFTLENBQUMsaUJBQWlCLEVBQUUsNkJBQWtCLEVBQUUsd0NBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBMEMxSSxnQ0FBQztBQUFELENBQUMsQUFyREQsQ0FBK0MsbUNBQXFCLEdBcURuRTtBQXJEWSxpQ0FBeUIsNEJBcURyQyxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQThCLG9CQUFXLENBQUM7SUFDNUQsUUFBUSxFQUFFLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztJQUMzQyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEdBQUc7UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLFlBQVksRUFBRSxJQUFJO1FBQ2xCLGFBQWE7UUFDYixnQkFBZ0IsRUFBRSxHQUFHO1FBQ3JCLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLEdBQUc7S0FDVDtDQUNELENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxFQUFFLDRCQUFpQixDQUFDLENBQUM7S0FDbkUsU0FBUyxDQUFDLHFCQUFhLEVBQUUsZUFBZSxDQUFDO0tBQ3pDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLHlCQUF5QixDQUFDLENBQUMifQ==