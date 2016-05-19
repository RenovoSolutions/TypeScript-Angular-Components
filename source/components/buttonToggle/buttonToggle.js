"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uVG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBSW5DLHVCQUE4QyxrQkFBa0IsQ0FBQyxDQUFBO0FBRXBELGtCQUFVLEdBQVcsK0JBQStCLENBQUM7QUFDckQscUJBQWEsR0FBVyxnQkFBZ0IsQ0FBQztBQUN6QyxzQkFBYyxHQUFXLHdCQUF3QixDQUFDO0FBYS9EO0lBQTRDLDBDQUFnQjtJQWEzRDtRQUNDLGlCQUFPLENBQUM7SUFDVCxDQUFDO0lBVkQsc0JBQUksMkNBQU87YUFBWDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBWSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUpBO0lBVUQsd0NBQU8sR0FBUDtRQUNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0YsQ0FBQztJQUNGLDZCQUFDO0FBQUQsQ0FBQyxBQXZCRCxDQUE0Qyx5QkFBZ0IsR0F1QjNEO0FBdkJZLDhCQUFzQix5QkF1QmxDLENBQUE7QUFFRCxJQUFNLFlBQVksR0FBOEIsb0JBQVcsQ0FBQztJQUMzRCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO0lBQ2hDLFFBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7SUFDeEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxjQUFjO0lBQzVCLFFBQVEsRUFBRTtRQUNULFFBQVEsRUFBRSxHQUFHO1FBQ2IsTUFBTSxFQUFFLElBQUk7S0FDWjtDQUNELENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsWUFBWSxDQUFDO0tBQ3RDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLHNCQUFzQixDQUFDLENBQUMifQ==