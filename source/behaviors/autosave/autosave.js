'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
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
        __parentChild.serviceName];
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
    __parentChild.moduleName,
])
    .directive(exports.directiveName, autosave)
    .controller(exports.controllerName, AutosaveController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvc2F2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUV4RCxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBRXBELGlDQU1PLDBDQUEwQyxDQUFDLENBQUE7QUFHdkMsa0JBQVUsR0FBVywwQkFBMEIsQ0FBQztBQUNoRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUNyQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBY3pEO0lBWUMsNEJBQW9CLE1BQXNCLEVBQy9CLE1BQTJCLEVBQzNCLE1BQTZCLEVBQzdCLFFBQWtDLEVBQ2xDLGVBQXdDLEVBQ3hDLG1CQUE4RDtRQUxyRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBeUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUEyQztJQUFHLENBQUM7SUFFN0Usb0NBQU8sR0FBUDtRQUFBLGlCQStCQztRQTlCQSxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQUMsUUFBNEI7WUFDakQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUM7Z0JBQ04sS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxjQUFjLEdBQWdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRixJQUFJLElBQUksR0FBbUM7WUFDMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7WUFDaEQsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDdEIsZ0JBQWdCLEVBQUUsUUFBUTtZQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzlCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ3JDLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0RSxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsR0FBc0I7WUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtTQUNoQyxDQUFDO1FBRUYscUVBQXFFO1FBQ3JFLElBQUksU0FBUyxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBNUNNLDBCQUFPLEdBQWEsQ0FBQyxRQUFRO1FBQzVCLFFBQVE7UUFDUixRQUFRO1FBQ1IsVUFBVTtRQUNWLDhCQUFtQjtRQUNuQixhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUF3Q3BDLHlCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSwwQkFBa0IscUJBbUQ5QixDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtRQUMxQixVQUFVLEVBQUUsc0JBQWM7UUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtLQUN0QixDQUFDO0FBQ0gsQ0FBQztBQVRlLGdCQUFRLFdBU3ZCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsNkJBQWtCO0lBQ2xCLGFBQWEsQ0FBQyxVQUFVO0NBQ3hCLENBQUM7S0FDQSxTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9