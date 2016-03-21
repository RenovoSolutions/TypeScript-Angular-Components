// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
var autosave_service_1 = require('../../services/autosave/autosave.service');
exports.moduleName = 'rl.ui.components.form';
exports.componentName = 'rlForm';
exports.controllerName = 'rlFormController';
var FormController = (function () {
    function FormController($element, $scope, $timeout, $q, autosaveFactory) {
        this.$element = $element;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$q = $q;
        this.autosaveFactory = autosaveFactory;
    }
    FormController.prototype.$onInit = function () {
        var _this = this;
        this.$element.find('form').on('submit', function () {
            _this.autosave.validateAndSave();
        });
        this.$timeout(function () {
            _this.form = _this.$scope.rlForm;
            _this.autosave = _this.autosaveFactory.getInstance({
                save: _this.saveForm.bind(_this),
                contentForm: _this.$scope.rlForm,
                triggers: 'none',
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
    FormController.$inject = ['$element', '$scope', '$timeout', '$q', autosave_service_1.factoryName];
    return FormController;
}());
exports.FormController = FormController;
var form = {
    transclude: true,
    template: "<form ng-transclude name=\"rlForm\"></form>",
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        saving: '=?',
        save: '&',
        form: '=?',
    },
};
angular.module(exports.moduleName, [autosave_service_1.moduleName])
    .component(exports.componentName, form)
    .controller(exports.controllerName, FormController);
//# sourceMappingURL=form.js.map