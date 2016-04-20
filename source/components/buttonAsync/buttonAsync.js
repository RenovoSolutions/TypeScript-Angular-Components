'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promiseUtility = typescript_angular_utilities_1.services.promise;
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
    ButtonAsyncController.$inject = [__promiseUtility.serviceName];
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
angular.module(exports.moduleName, [__promiseUtility.moduleName])
    .component(exports.componentName, buttonAsync)
    .controller(exports.controllerName, ButtonAsyncController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uQXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidXR0b25Bc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELElBQU8sZ0JBQWdCLEdBQUcsdUNBQVEsQ0FBQyxPQUFPLENBQUM7QUFFM0MsdUJBQThDLGtCQUFrQixDQUFDLENBQUE7QUFFcEQsa0JBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUVwRCxxQkFBYSxHQUFXLGVBQWUsQ0FBQztBQUN4QyxzQkFBYyxHQUFXLHVCQUF1QixDQUFDO0FBVzlEO0lBQTJDLHlDQUFnQjtJQU8xRCwrQkFBb0IsY0FBZ0Q7UUFDbkUsaUJBQU8sQ0FBQztRQURXLG1CQUFjLEdBQWQsY0FBYyxDQUFrQztJQUVwRSxDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUFBLGlCQWFDO1FBWkEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVqQixJQUFJLE1BQU0sR0FBaUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDZCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFNLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNuQixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFsQk0sNkJBQU8sR0FBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBbUIzRCw0QkFBQztBQUFELENBQUMsQUF6QkQsQ0FBMkMseUJBQWdCLEdBeUIxRDtBQXpCWSw2QkFBcUIsd0JBeUJqQyxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQThCLG9CQUFXLENBQUM7SUFDMUQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztJQUN2QyxRQUFRLEVBQUU7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLFlBQVksRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0NBQzFCLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZELFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFdBQVcsQ0FBQztLQUNyQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIn0=