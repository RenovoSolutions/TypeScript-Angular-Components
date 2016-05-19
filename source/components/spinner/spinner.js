"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('../../../libraries/bootstrap-touchspin/index');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __string = typescript_angular_utilities_1.services.string;
var __number = typescript_angular_utilities_1.services.number;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.spinner';
exports.componentName = 'rlSpinner';
exports.controllerName = 'SpinnerController';
exports.defaultMaxValue = 100000000000000000000;
var SpinnerController = (function (_super) {
    __extends(SpinnerController, _super);
    function SpinnerController($scope, $attrs, componentValidatorFactory, $element, $timeout) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$element = $element;
        this.$timeout = $timeout;
        this.inputType = 'spinner';
    }
    SpinnerController.prototype.$postLink = function () {
        this.setDisabled(this.ngDisabled);
    };
    SpinnerController.prototype.$onChanges = function (changes) {
        if (changes.ngDisabled) {
            this.setDisabled(changes.ngDisabled.currentValue);
        }
    };
    SpinnerController.prototype.round = function (num) {
        if (num != null && this.roundToStep) {
            num = __number.numberUtility.roundToStep(num, this.step);
            num = __number.numberUtility.preciseRound(num, this.decimals);
        }
        return num;
    };
    SpinnerController.prototype.setDisabled = function (disabled) {
        var _this = this;
        if (disabled) {
            if (_.isFunction(this.unbindWatches)) {
                this.unbindWatches();
            }
        }
        else {
            // Initialize the spinner after $timeout to give angular a chance initialize ngModel
            this.$timeout(function () {
                var touchspin = _this.$element.find('input.spinner').TouchSpin({
                    min: (_this.min != null ? _this.min : 0),
                    max: (_this.max != null ? _this.max : exports.defaultMaxValue),
                    step: _this.step,
                    prefix: _this.prefix,
                    postfix: _this.postfix,
                    decimals: _this.decimals,
                    initval: _this.ngModel.$viewValue,
                    forcestepdivisibility: _this.roundToStep ? 'round' : 'none',
                });
                touchspin.on('change', function () {
                    _this.$scope.$apply(function () {
                        var spinValue = touchspin.val();
                        _this.ngModel.$setViewValue(__string.stringUtility.toNumber(spinValue));
                    });
                });
                var unbindViewWatch = _this.$scope.$watch(function () {
                    return _this.ngModel.$viewValue;
                }, function (newValue) {
                    touchspin.val(newValue != null ? newValue.toString() : '');
                });
                // round the model value when it gets set
                // this is different from parsers and formatters because we want to update the actual model value,
                // not just display a formatted value.
                var unbindModelWatch = _this.$scope.$watch(function () {
                    return _this.ngModel.$modelValue;
                }, function (newModel) {
                    _this.ngModel.$modelValue = _this.round(newModel);
                });
                _this.unbindWatches = function () {
                    unbindViewWatch();
                    unbindModelWatch();
                };
            });
        }
    };
    SpinnerController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element', '$timeout'];
    return SpinnerController;
}(input_1.InputController));
exports.SpinnerController = SpinnerController;
var spinner = input_1.buildInput({
    template: require('./spinner.html'),
    controller: exports.controllerName,
    controllerAs: 'spinner',
    bindings: {
        min: '<?',
        max: '<?',
        step: '<?',
        decimals: '<?',
        prefix: '@',
        postfix: '@',
        roundToStep: '<?',
        ngDisabled: '<?',
        spinnerId: '@',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, spinner)
    .controller(exports.controllerName, SpinnerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsUUFBTyw4Q0FBOEMsQ0FBQyxDQUFBO0FBR3RELElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBR2xDLHNCQUF5RixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzFHLDJDQUF5Riw4REFBOEQsQ0FBQyxDQUFBO0FBTzNJLGtCQUFVLEdBQVcsMEJBQTBCLENBQUM7QUFDaEQscUJBQWEsR0FBVyxXQUFXLENBQUM7QUFDcEMsc0JBQWMsR0FBVyxtQkFBbUIsQ0FBQztBQUU3Qyx1QkFBZSxHQUFXLHFCQUFxQixDQUFDO0FBdUI3RDtJQUF1QyxxQ0FBZTtJQVlyRCwyQkFBWSxNQUFzQixFQUM5QixNQUF3QixFQUN4Qix5QkFBcUQsRUFDN0MsUUFBa0MsRUFDbEMsUUFBaUM7UUFDNUMsa0JBQU0sTUFBTSxFQUFFLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBRnRDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBRzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxPQUF3QjtRQUNsQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FB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