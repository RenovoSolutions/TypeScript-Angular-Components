'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __boolean = typescript_angular_utilities_1.services.boolean;
exports.moduleName = 'rl.ui.components.buttonToggle';
exports.componentName = 'rlButtonToggle';
exports.controllerName = 'ButtonToggleController';
var ButtonToggleController = (function () {
    function ButtonToggleController($scope, bool) {
        this.buttonClass = this.type != null ? this.type : 'default';
        this.buttonSize = this.size != null ? 'btn-' + this.size : null;
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
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onToggle({ value: this.checked });
        }
    };
    ButtonToggleController.$inject = ['$scope', __boolean.serviceName];
    return ButtonToggleController;
}());
var buttonToggle = {
    require: { ngModel: '^ngModel' },
    transclude: true,
    template: require('./buttonToggle.html'),
    controller: exports.controllerName,
    controllerAs: 'buttonToggle',
    bindings: {
        type: '@',
        size: '@',
        onToggle: '&',
        disabled: '<?ngDisabled',
    },
};
angular.module(exports.moduleName, [__boolean.moduleName])
    .component(exports.componentName, buttonToggle)
    .controller(exports.controllerName, ButtonToggleController);
//# sourceMappingURL=buttonToggle.js.map