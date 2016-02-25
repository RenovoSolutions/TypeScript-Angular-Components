'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __objectUtility = typescript_angular_utilities_1.services.object;
var autosave_service_1 = require('../../services/autosave/autosave.service');
exports.moduleName = 'rl.ui.behaviors.autosave';
exports.directiveName = 'rlAutosave';
exports.controllerName = 'AutosaveController';
var AutosaveController = (function () {
    function AutosaveController($scope, $attrs, $parse, $element, $timeout, autosaveFactory, parentChildBehavior, objectUtility) {
        var _this = this;
        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
        var contentForm = $element.controller('form');
        var hasValidator = objectUtility.isNullOrWhitespace($attrs.validate) === false;
        var validateExpression = $parse($attrs.validate);
        var validate;
        if (hasValidator) {
            validate = function () {
                return validateExpression($scope);
            };
        }
        var saveExpression = $parse($attrs.save);
        var save = function () {
            return saveExpression($scope);
        };
        var debounce = $parse($attrs.debounceDuration)($scope);
        var unbind = $scope.$watch(function () { return _this.keyupListener; }, function (keyupListener) {
            if (keyupListener) {
                _this.autosave = autosaveFactory.getInstance({
                    save: save,
                    validate: validate,
                    contentForm: contentForm,
                    debounceDuration: debounce,
                    triggers: $attrs.triggers,
                    setChangeListener: keyupListener,
                });
                var behavior = {
                    autosave: _this.autosave.autosave,
                };
                // register autosave behavior and assign the value back to the parent
                var childLink = $parse($attrs.rlAutosave)($scope);
                parentChildBehavior.registerChildBehavior(childLink, behavior);
                unbind();
            }
        });
    }
    AutosaveController.$inject = ['$scope',
        '$attrs',
        '$parse',
        '$element',
        '$timeout',
        autosave_service_1.factoryName,
        __parentChild.serviceName,
        __objectUtility.serviceName];
    return AutosaveController;
})();
exports.AutosaveController = AutosaveController;
function autosave() {
    'use strict';
    return {
        restrict: 'A',
        require: ['rlAutosave', '?ngForm'],
        controller: exports.controllerName,
        link: function (scope, element, attrs, controllers) {
            var autosaveController = controllers[0];
            autosaveController.keyupListener = function (callback) {
                element.on('keyup', function () { scope.$apply(callback); });
                return function () {
                    element.off('keyup');
                };
            };
        },
    };
}
exports.autosave = autosave;
angular.module(exports.moduleName, [
    autosave_service_1.moduleName,
    __objectUtility.moduleName,
    __parentChild.moduleName,
])
    .directive(exports.directiveName, autosave)
    .controller(exports.controllerName, AutosaveController);
//# sourceMappingURL=autosave.js.map