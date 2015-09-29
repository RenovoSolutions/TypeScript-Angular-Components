'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.behaviors.autosave';
exports.directiveName = 'rlAutosave';
exports.controllerName = 'AutosaveController';
var __autosave = typescript_angular_utilities_1.services.autosave;
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __objectUtility = typescript_angular_utilities_1.services.object;
var __autosaveAction = typescript_angular_utilities_1.services.autosaveAction;
var AutosaveController = (function () {
    function AutosaveController($scope, $attrs, $parse, $element, autosaveFactory, parentChildBehavior, objectUtility) {
        this.$scope = $scope;
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
        var autosave = autosaveFactory.getInstance(save, contentForm, validate);
        var behavior = {
            autosave: autosave.autosave,
        };
        // register autosave behavior and assign the value back to the parent
        var childLink = $parse($attrs.rlAutosave)($scope);
        parentChildBehavior.registerChildBehavior(childLink, behavior);
    }
    AutosaveController.$inject = ['$scope',
        '$attrs',
        '$parse',
        '$element',
        __autosave.factoryName,
        __parentChild.serviceName,
        __objectUtility.serviceName,
        __autosaveAction.serviceName];
    return AutosaveController;
})();
exports.AutosaveController = AutosaveController;
function autosave() {
    'use strict';
    return {
        restrict: 'A',
        require: '?ngForm',
        controller: exports.controllerName,
    };
}
exports.autosave = autosave;
angular.module(exports.moduleName, [
    __autosave.moduleName,
    __autosaveAction.moduleName,
    __objectUtility.moduleName,
    __parentChild.moduleName,
])
    .directive(exports.directiveName, autosave)
    .controller(exports.controllerName, AutosaveController);
//# sourceMappingURL=autosave.js.map