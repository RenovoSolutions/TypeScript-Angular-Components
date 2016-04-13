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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBR25DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sYUFBYSxHQUFHLHVDQUFRLENBQUMsbUJBQW1CLENBQUM7QUFHcEQsaUNBQTRILDBDQUEwQyxDQUFDLENBQUE7QUFFNUosa0JBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUM3QyxxQkFBYSxHQUFXLFFBQVEsQ0FBQztBQUNqQyxzQkFBYyxHQUFXLGtCQUFrQixDQUFDO0FBZXZEO0lBU0Msd0JBQW9CLFFBQWtDLEVBQzFDLE1BQWtCLEVBQ2xCLFFBQWlDLEVBQ2pDLEVBQXFCLEVBQ3JCLGVBQXdDLEVBQ3hDLFdBQXNEO1FBTDlDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQzFDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQXlCO1FBQ3hDLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztJQUFJLENBQUM7SUFFdkUsZ0NBQU8sR0FBUDtRQUFBLGlCQWFDO1FBWkEsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNiLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztnQkFDaEQsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQztnQkFDOUIsV0FBVyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDL0IsUUFBUSxFQUFFLE1BQU07YUFDaEIsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFO2dCQUN0RCxJQUFJLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUM7YUFDdkQsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUE1Qk0sc0JBQU8sR0FBYSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSw4QkFBbUIsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUE2QnJILHFCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxzQkFBYyxpQkFxQzFCLENBQUE7QUFFRCxJQUFJLElBQUksR0FBOEI7SUFDckMsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLGlHQUE2RjtJQUN2RyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFlBQVk7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsTUFBTSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsR0FBRztRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7S0FDZjtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyw2QkFBYyxDQUFDLENBQUM7S0FDMUMsU0FBUyxDQUFDLHFCQUFhLEVBQUUsSUFBSSxDQUFDO0tBQzlCLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=