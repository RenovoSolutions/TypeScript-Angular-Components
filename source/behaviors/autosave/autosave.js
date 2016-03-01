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
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.$element = $element;
        this.$timeout = $timeout;
        this.autosaveFactory = autosaveFactory;
        this.parentChildBehavior = parentChildBehavior;
        this.objectUtility = objectUtility;
    }
    AutosaveController.prototype.$onInit = function () {
        var _this = this;
        this.autosaveController.keyupListener = function (callback) {
            _this.$element.on('keyup', function () { _this.$scope.$apply(callback); });
            return function () {
                _this.$element.off('keyup');
            };
        };
        var hasValidator = this.objectUtility.isNullOrWhitespace(this.$attrs.validate) === false;
        var validateExpression = this.$parse(this.$attrs.validate);
        var validate;
        if (hasValidator) {
            validate = function () {
                return validateExpression(_this.$scope);
            };
        }
        var saveExpression = this.$parse(this.$attrs.save);
        var save = function () {
            return saveExpression(_this.$scope);
        };
        var debounce = this.$parse(this.$attrs.debounceDuration)(this.$scope);
        var unbind = this.$scope.$watch(function () { return _this.keyupListener; }, function (keyupListener) {
            if (keyupListener) {
                _this.autosave = _this.autosaveFactory.getInstance({
                    save: save,
                    validate: validate,
                    contentForm: _this.form,
                    debounceDuration: debounce,
                    triggers: _this.$attrs.triggers,
                    setChangeListener: keyupListener,
                });
                var behavior = {
                    autosave: _this.autosave.autosave,
                };
                // register autosave behavior and assign the value back to the parent
                var childLink = _this.$parse(_this.$attrs.rlAutosave)(_this.$scope);
                _this.parentChildBehavior.registerChildBehavior(childLink, behavior);
                unbind();
            }
        });
    };
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
        require: {
            autosaveController: 'rlAutosave',
            form: '?ngForm',
        },
        controller: exports.controllerName,
        bindToController: true,
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