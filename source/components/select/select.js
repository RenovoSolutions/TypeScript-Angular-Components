// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('ui-select');
require('ui-select/dist/select.css');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.select';
exports.componentName = 'rlSelect';
exports.controllerName = 'SelectController';
var SelectController = (function (_super) {
    __extends(SelectController, _super);
    function SelectController($scope, $attrs, $q, object, componentValidatorFactory) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$q = $q;
        this.object = object;
        this._nullOption = {
            __isNullOption: true,
        };
        this.inputType = 'select';
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
        if (item != null && item.__isNullOption) {
            return this.nullOption;
        }
        return __transform.getValue(item, this.selector);
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
    SelectController.$inject = ['$scope', '$attrs', '$q', __object.serviceName, componentValidator_service_1.factoryName];
    return SelectController;
}(input_1.InputController));
exports.SelectController = SelectController;
var select = input_1.buildInput({
    template: require('./select.html'),
    controller: exports.controllerName,
    controllerAs: 'select',
    bindings: {
        options: '<?',
        getOptions: '&',
        selector: '<?',
        ngDisabled: '<?',
        nullOption: '@',
        select: '&',
    },
});
angular.module(exports.moduleName, ['ui.select', __object.moduleName, input_1.moduleName])
    .component(exports.componentName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLFFBQU8sV0FBVyxDQUFDLENBQUE7QUFDbkIsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBRW5DLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUVsRCxzQkFBdUUsZ0JBQWdCLENBQUMsQ0FBQTtBQUN4RiwyQ0FBeUYsOERBQThELENBQUMsQ0FBQTtBQUUzSSxrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLHFCQUFhLEdBQVcsVUFBVSxDQUFDO0FBQ25DLHNCQUFjLEdBQVcsa0JBQWtCLENBQUM7QUFNekQ7SUFBc0Msb0NBQWU7SUE2QnBELDBCQUFZLE1BQXNCLEVBQzlCLE1BQTJCLEVBQ25CLEVBQXFCLEVBQ3JCLE1BQStCLEVBQ3ZDLHlCQUFxRDtRQUN4RCxrQkFBTSxNQUFNLEVBQU8sTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFIM0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFyQm5DLGdCQUFXLEdBQVE7WUFDMUIsY0FBYyxFQUFFLElBQUk7U0FDcEIsQ0FBQztRQXNCRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBckJELHNCQUFJLHVDQUFTO2FBQWI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDaEMsQ0FBQzthQUVELFVBQWMsS0FB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