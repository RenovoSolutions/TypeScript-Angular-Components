// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.multiStepIndicator';
exports.componentName = 'rlMultiStepIndicator';
exports.controllerName = 'MultiStepIndicatorController';
var __object = typescript_angular_utilities_1.services.object;
var MultiStepIndicatorController = (function () {
    function MultiStepIndicatorController($state, $q, object) {
        this.$state = $state;
        this.$q = $q;
        this.object = object;
        this.configureSteps();
    }
    MultiStepIndicatorController.prototype.onClick = function (step) {
        if (!this.anyLoading()) {
            step.loading = true;
            this.$q.when(step.onClick()).then(function () {
                step.loading = false;
            });
        }
    };
    MultiStepIndicatorController.prototype.anyLoading = function () {
        return _.some(this.steps, function (step) {
            return step.loading;
        });
    };
    MultiStepIndicatorController.prototype.configureSteps = function () {
        var _this = this;
        _.each(this.steps, function (step) {
            step.hasCount = _.isFunction(step.count);
            step.getCompleted = function () { return _this.getIsCompleted(step); };
            step.getValid = function () { return _this.getIsValid(step); };
            if (!_.isFunction(step.onClick)) {
                if (_this.object.isNullOrWhitespace(step.stateName)) {
                    step.inactive = true;
                }
                else {
                    step.onClick = function () { return _this.redirectToState(step); };
                    if (_this.$state.includes(step.stateName)) {
                        step.isCurrent = true;
                    }
                }
            }
        });
    };
    MultiStepIndicatorController.prototype.redirectToState = function (step) {
        var _this = this;
        return this.$state.go(step.stateName).then(function () {
            _this.clearCurrentState();
            step.isCurrent = true;
        });
    };
    MultiStepIndicatorController.prototype.clearCurrentState = function () {
        _.each(this.steps, function (step) {
            step.isCurrent = false;
        });
    };
    MultiStepIndicatorController.prototype.getIsCompleted = function (step) {
        return _.isFunction(step.isCompleted)
            ? step.isCompleted()
            : step.isCompleted;
    };
    MultiStepIndicatorController.prototype.setIsCompleted = function (step, isCompleted) {
        if (!_.isFunction(step.isCompleted)) {
            step.isCompleted = isCompleted;
        }
    };
    MultiStepIndicatorController.prototype.getIsValid = function (step) {
        if (_.isFunction(step.isValid)) {
            return step.isValid();
        }
        else if (!_.isUndefined(step.isValid != null)) {
            return step.isValid;
        }
        else {
            return true;
        }
    };
    MultiStepIndicatorController.$inject = ['$state', '$q', __object.serviceName];
    return MultiStepIndicatorController;
}());
exports.MultiStepIndicatorController = MultiStepIndicatorController;
var multiStepIndicator = {
    template: require('./multiStepIndicator.html'),
    controller: exports.controllerName,
    controllerAs: 'breadcrumb',
    bindings: {
        steps: '=',
        numbered: '=',
    },
};
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, multiStepIndicator)
    .controller(exports.controllerName, MultiStepIndicatorController);
//# sourceMappingURL=multiStepIndicator.js.map