'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uQXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidXR0b25Bc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLGdDQUFtRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRTVJLHVCQUE4QyxrQkFBa0IsQ0FBQyxDQUFBO0FBRXBELGtCQUFVLEdBQVcsOEJBQThCLENBQUM7QUFFcEQscUJBQWEsR0FBVyxlQUFlLENBQUM7QUFDeEMsc0JBQWMsR0FBVyx1QkFBdUIsQ0FBQztBQVc5RDtJQUEyQyx5Q0FBZ0I7SUFPMUQsK0JBQW9CLGNBQStCO1FBQ2xELGlCQUFPLENBQUM7UUFEVyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7SUFFbkQsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFBQSxpQkFhQztRQVpBLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakIsSUFBSSxNQUFNLEdBQWlELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQ2QsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBTSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbkIsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBbEJNLDZCQUFPLEdBQWEsQ0FBQyw2QkFBa0IsQ0FBQyxDQUFDO0lBbUJqRCw0QkFBQztBQUFELENBQUMsQUF6QkQsQ0FBMkMseUJBQWdCLEdBeUIxRDtBQXpCWSw2QkFBcUIsd0JBeUJqQyxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQThCLG9CQUFXLENBQUM7SUFDMUQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztJQUN2QyxRQUFRLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLFlBQVksRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0NBQzFCLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDRCQUFpQixDQUFDLENBQUM7S0FDN0MsU0FBUyxDQUFDLHFCQUFhLEVBQUUsV0FBVyxDQUFDO0tBQ3JDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLHFCQUFxQixDQUFDLENBQUMifQ==