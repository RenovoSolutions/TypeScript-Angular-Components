// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('ui-select');
require('ui-select/dist/select.css');
var angular = require('angular');
var _ = require('lodash');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.select';
exports.directiveName = 'rlSelect';
exports.controllerName = 'SelectController';
var SelectController = (function () {
    function SelectController($element, $scope, $q, componentValidatorFactory) {
        var _this = this;
        this.$q = $q;
        this.ngModel = $element.controller('ngModel');
        if (_.isUndefined(this.options)) {
            this.loading = true;
            this.loadItems().then(function (options) {
                _this.options = options;
                _this.loading = false;
            });
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
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    SelectController.prototype.getDisplayName = function (item) {
        if (item == null) {
            return null;
        }
        return _.isFunction(this.selector)
            ? this.selector(item)
            : item[this.selector];
    };
    SelectController.prototype.loadItems = function () {
        if (_.isFunction(this.getOptions)) {
            return this.getOptions();
        }
        else {
            return this.$q.when(this.options);
        }
    };
    SelectController.$inject = ['$element', '$scope', '$q', componentValidator_service_1.factoryName];
    return SelectController;
})();
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
        },
    };
}
exports.select = select;
angular.module(exports.moduleName, ['ui.select', componentValidator_service_1.moduleName])
    .directive(exports.directiveName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=select.js.map