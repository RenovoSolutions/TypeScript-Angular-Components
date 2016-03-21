// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var autosave_service_1 = require('../../services/autosave/autosave.service');
exports.moduleName = 'rl.ui.components.form';
exports.componentName = 'rlForm';
exports.controllerName = 'rlFormController';
var FormController = (function () {
    function FormController($element, $scope, $timeout, $q, autosaveFactory, parentChild) {
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;
        this.autosaveFactory = autosaveFactory;
        this.parentChild = parentChild;
    }
    FormController.prototype.$onInit = function () {
        var _this = this;
        this.$timeout(function () {
            _this.form = _this.$scope.rlForm;
            _this.autosave = _this.autosaveFactory.getInstance({
                save: _this.saveForm.bind(_this),
                contentForm: _this.$scope.rlForm,
                triggers: 'none',
            });
            _this.parentChild.registerChildBehavior(_this.childLink, {
                save: _this.autosave.validateAndSave.bind(_this.autosave),
            });
        });
    };
    FormController.prototype.saveForm = function () {
        var _this = this;
        this.saving = true;
        return this.$q.when(this.save()).then(function () {
            _this.saving = false;
        }).catch(function () { _this.saving = false; });
    };
    FormController.$inject = ['$element', '$scope', '$timeout', '$q', autosave_service_1.factoryName, __parentChild.serviceName];
    return FormController;
}());
exports.FormController = FormController;
var form = {
    transclude: true,
    template: "<form ng-transclude name=\"rlForm\" ng-submit=\"controller.autosave.validateAndSave()\"></form>",
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        saving: '=?',
        save: '&',
        form: '=?',
        childLink: '=?',
    },
};
angular.module(exports.moduleName, [autosave_service_1.moduleName])
    .component(exports.componentName, form)
    .controller(exports.controllerName, FormController);
//# sourceMappingURL=form.js.map