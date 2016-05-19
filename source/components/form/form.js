"use strict";
var angular = require('angular');
var parentChild_service_1 = require('../../services/parentChild/parentChild.service');
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
    FormController.$inject = ['$element', '$scope', '$timeout', '$q', autosave_service_1.factoryName, parentChild_service_1.serviceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBR25DLG9DQUEwRixnREFBZ0QsQ0FBQyxDQUFBO0FBRzNJLGlDQUE0SCwwQ0FBMEMsQ0FBQyxDQUFBO0FBRTVKLGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFDN0MscUJBQWEsR0FBVyxRQUFRLENBQUM7QUFDakMsc0JBQWMsR0FBVyxrQkFBa0IsQ0FBQztBQWV2RDtJQVNDLHdCQUFvQixRQUFrQyxFQUMzQyxNQUFrQixFQUNsQixRQUFpQyxFQUNqQyxFQUFxQixFQUNyQixlQUF3QyxFQUN4QyxXQUF3QztRQUwvQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUMzQyxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtRQUN4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7SUFBSSxDQUFDO0lBRXhELGdDQUFPLEdBQVA7UUFBQSxpQkFhQztRQVpBLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDYixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7Z0JBQ2hELElBQUksRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUM7Z0JBQzlCLFdBQVcsRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQy9CLFFBQVEsRUFBRSxNQUFNO2FBQ2hCLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRTtnQkFDdEQsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3ZELENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBNUJNLHNCQUFPLEdBQWEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsOEJBQW1CLEVBQUUsaUNBQXNCLENBQUMsQ0FBQztJQTZCbEgscUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLHNCQUFjLGlCQXFDMUIsQ0FBQTtBQUVELElBQUksSUFBSSxHQUE4QjtJQUNyQyxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsaUdBQTZGO0lBQ3ZHLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUU7UUFDVCxNQUFNLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixTQUFTLEVBQUUsSUFBSTtLQUNmO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLDZCQUFjLENBQUMsQ0FBQztLQUMxQyxTQUFTLENBQUMscUJBQWEsRUFBRSxJQUFJLENBQUM7S0FDOUIsVUFBVSxDQUFDLHNCQUFjLEVBQUUsY0FBYyxDQUFDLENBQUMifQ==