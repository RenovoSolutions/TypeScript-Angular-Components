'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonToggle';
exports.componentName = 'rlButtonToggle';
exports.controllerName = 'ButtonToggleController';
var ButtonToggleController = (function (_super) {
    __extends(ButtonToggleController, _super);
    function ButtonToggleController() {
        _super.call(this);
    }
    Object.defineProperty(ButtonToggleController.prototype, "checked", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonToggleController.prototype.clicked = function () {
        if (!this.ngDisabled) {
            this.checked = !this.checked;
            this.onToggle({ value: this.checked });
        }
    };
    return ButtonToggleController;
}(button_1.ButtonController));
exports.ButtonToggleController = ButtonToggleController;
var buttonToggle = button_1.buildButton({
    require: { ngModel: '^ngModel' },
    template: require('./buttonToggle.html'),
    controller: exports.controllerName,
    controllerAs: 'buttonToggle',
    bindings: {
        onToggle: '&',
        action: null,
    },
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonToggle)
    .controller(exports.controllerName, ButtonToggleController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uVG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFJbkMsdUJBQThDLGtCQUFrQixDQUFDLENBQUE7QUFFcEQsa0JBQVUsR0FBVywrQkFBK0IsQ0FBQztBQUNyRCxxQkFBYSxHQUFXLGdCQUFnQixDQUFDO0FBQ3pDLHNCQUFjLEdBQVcsd0JBQXdCLENBQUM7QUFhL0Q7SUFBNEMsMENBQWdCO0lBYTNEO1FBQ0MsaUJBQU8sQ0FBQztJQUNULENBQUM7SUFWRCxzQkFBSSwyQ0FBTzthQUFYO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFZLEtBQWM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7SUFVRCx3Q0FBTyxHQUFQO1FBQ0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7SUFDRixDQUFDO0lBQ0YsNkJBQUM7QUFBRCxDQUFDLEFBdkJELENBQTRDLHlCQUFnQixHQXVCM0Q7QUF2QlksOEJBQXNCLHlCQXVCbEMsQ0FBQTtBQUVELElBQU0sWUFBWSxHQUE4QixvQkFBVyxDQUFDO0lBQzNELE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7SUFDaEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztJQUN4QyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLGNBQWM7SUFDNUIsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEdBQUc7UUFDYixNQUFNLEVBQUUsSUFBSTtLQUNaO0NBQ0QsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxZQUFZLENBQUM7S0FDdEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyJ9