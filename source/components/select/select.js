// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('ui-select');
require('ui-select/dist/select.css');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.select';
exports.directiveName = 'rlSelect';
exports.controllerName = 'SelectController';
var SelectController = (function () {
    function SelectController($element, $scope, $q, componentValidatorFactory, object) {
        var _this = this;
        this.$q = $q;
        this.object = object;
        this._nullOption = {
            __isNullOption: true,
        };
        this.ngModel = $element.controller('ngModel');
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
        if (!_.isUndefined(this.validator)) {
            this.selectValidator = componentValidatorFactory.getInstance({
                ngModel: this.ngModel,
                $scope: $scope,
                validators: [this.validator],
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
        },
        enumerable: true,
        configurable: true
    });
    SelectController.prototype.getDisplayName = function (item) {
        if (item == null) {
            return null;
        }
        if (item.__isNullOption) {
            return this.nullOption;
        }
        if (this.selector == null) {
            return item;
        }
        return _.isFunction(this.selector)
            ? this.selector(item)
            : item[this.selector];
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
    SelectController.$inject = ['$element', '$scope', '$q', componentValidator_service_1.factoryName, __object.serviceName];
    return SelectController;
}());
exports.SelectController = SelectController;
function select() {
    return {
        restrict: 'E',
        require: 'ngModel',
        template: require('./select.html'),
        controller: exports.controllerName,
        controllerAs: 'select',
        scope: {},
        bindToController: {
            options: '=',
            getOptions: '&',
            selector: '=',
            validator: '=',
            label: '@',
            ngDisabled: '=',
            nullOption: '@',
        },
    };
}
exports.select = select;
angular.module(exports.moduleName, ['ui.select', componentValidator_service_1.moduleName, __object.moduleName])
    .directive(exports.directiveName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=select.js.map