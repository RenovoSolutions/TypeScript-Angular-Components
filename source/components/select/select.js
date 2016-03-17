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
    function SelectController($scope, $q, object, componentValidatorFactory) {
        _super.call(this, $scope, componentValidatorFactory);
        this.$q = $q;
        this.object = object;
        this._nullOption = {
            __isNullOption: true,
        };
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
        },
        enumerable: true,
        configurable: true
    });
    SelectController.prototype.$onInit = function () {
        var _this = this;
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
    SelectController.$inject = ['$scope', '$q', __object.serviceName, componentValidator_service_1.factoryName];
    return SelectController;
}(input_1.InputController));
exports.SelectController = SelectController;
var select = _.clone(input_1.input);
select.template = require('./select.html');
select.controller = exports.controllerName;
select.controllerAs = 'select';
select.bindings.options = '<?';
select.bindings.getOptions = '&';
select.bindings.selector = '<?';
select.bindings.ngDisabled = '<?';
select.bindings.nullOption = '@';
angular.module(exports.moduleName, ['ui.select', __object.moduleName])
    .component(exports.componentName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=select.js.map