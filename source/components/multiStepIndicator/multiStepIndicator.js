'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.multiStepIndicator';
exports.directiveName = 'rlMultiStepIndicator';
exports.controllerName = 'MultiStepIndicatorController';
var __object = typescript_angular_utilities_1.services.object;
var MultiStepIndicatorController = (function () {
    function MultiStepIndicatorController($state, object) {
        var _this = this;
        this.$state = $state;
        this.object = object;
        this.redirectToState = function (step) {
            _this.clearCurrentState();
            _this.$state.go(step.stateName);
            step.isCurrent = true;
        };
        this.configureSteps();
    }
    MultiStepIndicatorController.prototype.configureSteps = function () {
        var _this = this;
        _.each(this.steps, function (step) {
            if (!_.isFunction(step.onClick)) {
                if (_this.object.isNullOrWhitespace(step.stateName)) {
                    step.inactive = true;
                }
                else {
                    step.onClick = function () { _this.redirectToState(step); };
                    if (_this.$state.includes(step.stateName)) {
                        step.isCurrent = true;
                    }
                }
            }
        });
    };
    MultiStepIndicatorController.prototype.clearCurrentState = function () {
        _.each(this.steps, function (step) {
            step.isCurrent = false;
        });
    };
    MultiStepIndicatorController.$inject = ['$state', __object.serviceName];
    return MultiStepIndicatorController;
})();
exports.MultiStepIndicatorController = MultiStepIndicatorController;
function multiStepIndicator() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div class=\"multi-step\" ng-class=\"{ 'numbered': breadcrumb.numbered }\">\n\t\t\t\t<ol>\n\t\t\t\t\t<li ng-repeat=\"step in breadcrumb.steps\" ng-click=\"step.onClick()\"\n\t\t\t\t\t\tng-class=\"{ 'completed': step.isCompleted, 'current': step.isCurrent, 'active': !step.inactive }\">\n\t\t\t\t\t\t<div class=\"wrap\">\n\t\t\t\t\t\t\t<p class=\"title\">{{step.title}}</p>\n\t\t\t\t\t\t\t<p class=\"subtitle\">{{step.subtitle}}</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ol>\n\t\t\t</div>\n\t\t",
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