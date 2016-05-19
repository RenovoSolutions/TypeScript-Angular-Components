"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var promise_service_1 = require('../../services/promise/promise.service');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonAsync';
exports.componentName = 'rlButtonAsync';
exports.controllerName = 'ButtonAsyncController';
var ButtonAsyncController = (function (_super) {
    __extends(ButtonAsyncController, _super);
    function ButtonAsyncController(promiseUtility) {
        _super.call(this);
        this.promiseUtility = promiseUtility;
    }
    ButtonAsyncController.prototype.trigger = function () {
        var _this = this;
        if (!this.busy) {
            this.busy = true;
            var result = this.action();
            if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
                result.finally(function () {
                    _this.busy = false;
                });
            }
            else if (result !== true) {
                this.busy = false;
            }
        }
    };
    ButtonAsyncController.$inject = [promise_service_1.serviceName];
    return ButtonAsyncController;
}(button_1.ButtonController));
exports.ButtonAsyncController = ButtonAsyncController;
var buttonAsync = button_1.buildButton({
    template: require('./buttonAsync.html'),
    bindings: {
        busy: '<?',
        rightAligned: '<?',
    },
    controller: exports.controllerName,
});
angular.module(exports.moduleName, [promise_service_1.moduleName])
    .component(exports.componentName, buttonAsync)
    .controller(exports.controllerName, ButtonAsyncController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uQXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidXR0b25Bc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QixnQ0FBbUcsd0NBQXdDLENBQUMsQ0FBQTtBQUU1SSx1QkFBOEMsa0JBQWtCLENBQUMsQ0FBQTtBQUVwRCxrQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBRXBELHFCQUFhLEdBQVcsZUFBZSxDQUFDO0FBQ3hDLHNCQUFjLEdBQVcsdUJBQXVCLENBQUM7QUFXOUQ7SUFBMkMseUNBQWdCO0lBTzFELCtCQUFvQixjQUErQjtRQUNsRCxpQkFBTyxDQUFDO1FBRFcsbUJBQWMsR0FBZCxjQUFjLENBQWlCO0lBRW5ELENBQUM7SUFFRCx1Q0FBTyxHQUFQO1FBQUEsaUJBYUM7UUFaQSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWpCLElBQUksTUFBTSxHQUFpRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNkLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQU0sTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ25CLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQWxCTSw2QkFBTyxHQUFhLENBQUMsNkJBQWtCLENBQUMsQ0FBQztJQW1CakQsNEJBQUM7QUFBRCxDQUFDLEFBekJELENBQTJDLHlCQUFnQixHQXlCMUQ7QUF6QlksNkJBQXFCLHdCQXlCakMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUE4QixvQkFBVyxDQUFDO0lBQzFELFFBQVEsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUM7SUFDdkMsUUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixZQUFZLEVBQUUsSUFBSTtLQUNsQjtJQUNELFVBQVUsRUFBRSxzQkFBYztDQUMxQixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyw0QkFBaUIsQ0FBQyxDQUFDO0tBQzdDLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFdBQVcsQ0FBQztLQUNyQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIn0=