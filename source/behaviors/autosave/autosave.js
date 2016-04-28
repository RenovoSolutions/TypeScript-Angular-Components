'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvc2F2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUluQyxvQ0FBd0gsZ0RBQWdELENBQUMsQ0FBQTtBQUV6SyxpQ0FNTywwQ0FBMEMsQ0FBQyxDQUFBO0FBR3ZDLGtCQUFVLEdBQVcsMEJBQTBCLENBQUM7QUFDaEQscUJBQWEsR0FBVyxZQUFZLENBQUM7QUFDckMsc0JBQWMsR0FBVyxvQkFBb0IsQ0FBQztBQWN6RDtJQVlDLDRCQUFvQixNQUFzQixFQUMvQixNQUEyQixFQUMzQixNQUE2QixFQUM3QixRQUFrQyxFQUNsQyxlQUF3QyxFQUN4QyxtQkFBZ0Q7UUFMdkMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQXlCO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBNkI7SUFBRyxDQUFDO0lBRS9ELG9DQUFPLEdBQVA7UUFBQSxpQkErQkM7UUE5QkEsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFDLFFBQTRCO1lBQ2pELEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFjLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLElBQUksY0FBYyxHQUFnQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEYsSUFBSSxJQUFJLEdBQW1DO1lBQzFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQztRQUVGLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1lBQ2hELElBQUksRUFBRSxJQUFJO1lBQ1YsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ3RCLGdCQUFnQixFQUFFLFFBQVE7WUFDMUIsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUM5QixpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNyQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEdBQXNCO1lBQ2pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7U0FDaEMsQ0FBQztRQUVGLHFFQUFxRTtRQUNyRSxJQUFJLFNBQVMsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQTVDTSwwQkFBTyxHQUFhLENBQUMsUUFBUTtRQUM1QixRQUFRO1FBQ1IsUUFBUTtRQUNSLFVBQVU7UUFDViw4QkFBbUI7UUFDbkIsaUNBQXNCLENBQUMsQ0FBQztJQXdDakMseUJBQUM7QUFBRCxDQUFDLEFBbkRELElBbURDO0FBbkRZLDBCQUFrQixxQkFtRDlCLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1FBQzFCLFVBQVUsRUFBRSxzQkFBYztRQUMxQixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3RCLENBQUM7QUFDSCxDQUFDO0FBVGUsZ0JBQVEsV0FTdkIsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQiw2QkFBa0I7SUFDbEIsZ0NBQXFCO0NBQ3JCLENBQUM7S0FDQSxTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9