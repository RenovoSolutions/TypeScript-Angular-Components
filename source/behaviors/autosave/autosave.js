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
        this.keyupListener = function (callback) {
            _this.$element.on('keyup', function () { _this.$scope.$apply(callback); });
            return function () {
                _this.$element.off('keyup');
            };
        };
        this.submitListener = function (callback) {
            _this.$element.on('submit', function () { _this.$scope.$apply(callback); });
            return function () {
                _this.$element.off('submit');
            };
        };
        var saveExpression = this.$parse(this.$attrs.save);
        var save = function () {
            return saveExpression(_this.$scope);
        };
        var debounce = this.$parse(this.$attrs.debounceDuration)(this.$scope);
        this.autosave = this.autosaveFactory.getInstance({
            save: save,
            contentForm: this.form,
            debounceDuration: debounce,
            triggers: this.$attrs.triggers,
            setChangeListener: this.keyupListener,
            setSubmitListener: this.submitListener,
            saveWhenInvalid: this.$parse(this.$attrs.saveWhenInvalid)(this.$scope),
        });
        var behavior = {
            autosave: this.autosave.autosave,
        };
        // register autosave behavior and assign the value back to the parent
        var childLink = this.$parse(this.$attrs.rlAutosave)(this.$scope);
        this.parentChildBehavior.registerChildBehavior(childLink, behavior);
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
}());
exports.AutosaveController = AutosaveController;
function autosave() {
    'use strict';
    return {
        restrict: 'A',
        priority: 1000,
        require: {
            autosaveController: 'rlAutosave',
            form: '?form',
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