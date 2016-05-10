'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.behaviors.required';
exports.directiveName = 'rlRequired';
exports.controllerName = 'RequiredController';
var RequiredController = (function () {
    function RequiredController($scope, $attrs, $interpolate) {
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.$interpolate = $interpolate;
        this.message = this.$interpolate(this.$attrs.rlRequired)(this.$scope);
    }
    RequiredController.$inject = ['$scope', '$attrs', '$interpolate'];
    return RequiredController;
}());
exports.RequiredController = RequiredController;
function required() {
    return {
        restrict: 'A',
        controller: exports.controllerName,
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, required)
    .controller(exports.controllerName, RequiredController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1aXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV0QixrQkFBVSxHQUFXLDBCQUEwQixDQUFDO0FBQ2hELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUFNM0Q7SUFFQyw0QkFBb0IsTUFBc0IsRUFDN0IsTUFBMkIsRUFDM0IsWUFBeUM7UUFGbEMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDM0IsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBTE0sMEJBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFRakUseUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVRZLDBCQUFrQixxQkFTOUIsQ0FBQTtBQUVEO0lBQ0MsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLEdBQUc7UUFDYixVQUFVLEVBQUUsc0JBQWM7S0FDMUIsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFFBQVEsQ0FBQztLQUNsQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIn0=