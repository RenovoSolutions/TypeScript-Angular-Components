// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.multiStepIndicator';
exports.directiveName = 'rlMultiStepIndicator';
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
        return _.any(this.steps, function (step) {
            return step.loading;
        });
    };
    MultiStepIndicatorController.prototype.configureSteps = function () {
        var _this = this;
        _.each(this.steps, function (step) {
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
    MultiStepIndicatorController.$inject = ['$state', '$q', __object.serviceName];
    return MultiStepIndicatorController;
})();
exports.MultiStepIndicatorController = MultiStepIndicatorController;
function multiStepIndicator() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./multiStepIndicator.html'),
        controller: exports.controllerName,
        controllerAs: 'breadcrumb',
        scope: {},
        bindToController: {
            steps: '=',
            numbered: '=',
        },
    };
}
angular.module(exports.moduleName, [__object.moduleName])
    .directive(exports.directiveName, multiStepIndicator)
    .controller(exports.controllerName, MultiStepIndicatorController);
//# sourceMappingURL=multiStepIndicator.js.map