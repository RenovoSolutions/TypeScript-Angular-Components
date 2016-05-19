"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('ui-select');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
var jquery_service_1 = require('../../services/jquery/jquery.service');
exports.moduleName = 'rl.ui.components.select';
exports.componentName = 'rlSelect';
exports.controllerName = 'SelectController';
var SelectController = (function (_super) {
    __extends(SelectController, _super);
    function SelectController($scope, $attrs, $q, $transclude, object, componentValidatorFactory, jqueryUtility) {
        var _this = this;
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$q = $q;
        this.object = object;
        this._nullOption = {
            __isNullOption: true,
        };
        this.inputType = 'select';
        this.transform = this.transform || this.selector;
        if (!this.template) {
            $transclude(function (clone) {
                if (clone.length) {
                    _this.template = jqueryUtility.getHtml(clone);
                }
                else {
                    _this.template = '{{select.getDisplayName($item)}}';
                }
            });
        }
    }
    Object.defineProperty(SelectController.prototype, "selection", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            if (value.__isNullOption) {
                this.ngModel.$setViewValue(null);
            }
            else {
                this.ngModel.$setViewValue(value);
            }
            this.select({ item: this.ngModel.$viewValue });
        },
        enumerable: true,
        configurable: true
    });
    SelectController.prototype.$onInit = function () {
        var _this = this;
        _super.prototype.$onInit.call(this);
        if (_.isUndefined(this.options)) {
            this.loading = true;
            this.loadItems().then(function (options) {
                _this.options = options;
                _this.loading = false;
            });
        }
        else {
            this.options = this.configureOptions(this.options);
        }
    };
    SelectController.prototype.getDisplayName = function (item) {
        return __transform.getValue(item, this.transform);
    };
    SelectController.prototype.loadItems = function () {
        var _this = this;
        var promise;
        promise = this.getOptions();
        if (promise == null) {
            promise = this.$q.when(this.options);
        }
        return promise.then(function (options) { return _this.configureOptions(options); });
    };
    SelectController.prototype.configureOptions = function (options) {
        if (!this.object.isNullOrWhitespace(this.nullOption)) {
            options.unshift(this._nullOption);
        }
        return options;
    };
    SelectController.$inject = ['$scope', '$attrs', '$q', '$transclude', typescript_angular_utilities_1.downgrade.objectServiceName, componentValidator_service_1.factoryName, jquery_service_1.serviceName];
    return SelectController;
}(input_1.InputController));
exports.SelectController = SelectController;
var select = input_1.buildInput({
    transclude: true,
    template: require('./select.html'),
    controller: exports.controllerName,
    controllerAs: 'select',
    bindings: {
        options: '<?',
        getOptions: '&',
        transform: '<?',
        ngDisabled: '<?',
        nullOption: '@',
        select: '&',
        itemAs: '@',
        // deprecated
        selector: '<?',
        // private
        template: '<?',
    },
});
angular.module(exports.moduleName, ['ui.select', typescript_angular_utilities_1.downgrade.moduleName, input_1.moduleName, jquery_service_1.moduleName])
    .component(exports.componentName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLFFBQU8sV0FBVyxDQUFDLENBQUE7QUFFbkIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFFbkUsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBRWxELHNCQUF1RSxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hGLDJDQUF5Riw4REFBOEQsQ0FBQyxDQUFBO0FBQ3hKLCtCQUE2RixzQ0FBc0MsQ0FBQyxDQUFBO0FBRXZILGtCQUFVLEdBQVcseUJBQXlCLENBQUM7QUFDL0MscUJBQWEsR0FBVyxVQUFVLENBQUM7QUFDbkMsc0JBQWMsR0FBVyxrQkFBa0IsQ0FBQztBQU16RDtJQUFzQyxvQ0FBZTtJQWlDcEQsMEJBQVksTUFBc0IsRUFDOUIsTUFBMkIsRUFDbkIsRUFBcUIsRUFDN0IsV0FBd0MsRUFDaEMsTUFBK0IsRUFDdkMseUJBQXFELEVBQ3JELGFBQTZCO1FBdkNsQyxpQkF5RkM7UUFqREMsa0JBQU0sTUFBTSxFQUFPLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBTDNDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBRXJCLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBdEJuQyxnQkFBVyxHQUFRO1lBQzFCLGNBQWMsRUFBRSxJQUFJO1NBQ3BCLENBQUM7UUF3QkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwQixXQUFX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