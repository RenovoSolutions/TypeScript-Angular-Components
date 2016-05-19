"use strict";
var angular = require('angular');
var parentChild_service_1 = require('../../services/parentChild/parentChild.service');
var autosave_service_1 = require('../../services/autosave/autosave.service');
exports.moduleName = 'rl.ui.behaviors.autosave';
exports.directiveName = 'rlAutosave';
exports.controllerName = 'AutosaveController';
var AutosaveController = (function () {
    function AutosaveController($scope, $attrs, $parse, $element, autosaveFactory, parentChildBehavior) {
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.$element = $element;
        this.autosaveFactory = autosaveFactory;
        this.parentChildBehavior = parentChildBehavior;
    }
    AutosaveController.prototype.$onInit = function () {
        var _this = this;
        this.keyupListener = function (callback) {
            _this.$element.on('keyup', function () { _this.$scope.$apply(callback); });
            return function () {
                _this.$element.off('keyup');
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
        autosave_service_1.factoryName,
        parentChild_service_1.serviceName];
    return AutosaveController;
}());
exports.AutosaveController = AutosaveController;
function autosave() {
    'use strict';
    return {
        restrict: 'A',
        priority: 1000,
        require: { form: '?form' },
        controller: exports.controllerName,
        bindToController: true,
    };
}
exports.autosave = autosave;
angular.module(exports.moduleName, [
    autosave_service_1.moduleName,
    parentChild_service_1.moduleName,
])
    .directive(exports.directiveName, autosave)
    .controller(exports.controllerName, AutosaveController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvc2F2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFJbkMsb0NBQXdILGdEQUFnRCxDQUFDLENBQUE7QUFFekssaUNBTU8sMENBQTBDLENBQUMsQ0FBQTtBQUd2QyxrQkFBVSxHQUFXLDBCQUEwQixDQUFDO0FBQ2hELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUFjekQ7SUFZQyw0QkFBb0IsTUFBc0IsRUFDL0IsTUFBMkIsRUFDM0IsTUFBNkIsRUFDN0IsUUFBa0MsRUFDbEMsZUFBd0MsRUFDeEMsbUJBQWdEO1FBTHZDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQzNCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTZCO0lBQUcsQ0FBQztJQUUvRCxvQ0FBTyxHQUFQO1FBQUEsaUJBK0JDO1FBOUJBLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxRQUE0QjtZQUNqRCxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQztnQkFDTixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBZ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksSUFBSSxHQUFtQztZQUMxQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUNoRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUN0QixnQkFBZ0IsRUFBRSxRQUFRO1lBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDOUIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDckMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RFLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxHQUFzQjtZQUNqQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1NBQ2hDLENBQUM7UUFFRixxRUFBcUU7UUFDckUsSUFBSSxTQUFTLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUE1Q00sMEJBQU8sR0FBYSxDQUFDLFFBQVE7UUFDNUIsUUFBUTtRQUNSLFFBQVE7UUFDUixVQUFVO1FBQ1YsOEJBQW1CO1FBQ25CLGlDQUFzQixDQUFDLENBQUM7SUF3Q2pDLHlCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSwwQkFBa0IscUJBbUQ5QixDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtRQUMxQixVQUFVLEVBQUUsc0JBQWM7UUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtLQUN0QixDQUFDO0FBQ0gsQ0FBQztBQVRlLGdCQUFRLFdBU3ZCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsNkJBQWtCO0lBQ2xCLGdDQUFxQjtDQUNyQixDQUFDO0tBQ0EsU0FBUyxDQUFDLHFCQUFhLEVBQUUsUUFBUSxDQUFDO0tBQ2xDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMifQ==