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
    }
    RequiredController.prototype.$onInit = function () {
        this.message = this.$interpolate(this.$attrs.rlRequired)(this.$scope);
    };
    RequiredController.$inject = ['$scope', '$attrs', '$interpolate'];
    return RequiredController;
}());
exports.RequiredController = RequiredController;
function required() {
    return {
        restrict: 'A',
        priority: 200,
        controller: exports.controllerName,
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, required)
    .controller(exports.controllerName, RequiredController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1aXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQU94QixrQkFBVSxHQUFXLDBCQUEwQixDQUFDO0FBQ2hELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUFNekQ7SUFFQyw0QkFBb0IsTUFBc0IsRUFDOUIsTUFBMkIsRUFDM0IsWUFBeUM7UUFGakMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDM0IsaUJBQVksR0FBWixZQUFZLENBQTZCO0lBQUcsQ0FBQztJQUl6RCxvQ0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFUTSwwQkFBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQVVqRSx5QkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWFksMEJBQWtCLHFCQVc5QixDQUFBO0FBRUQ7SUFDQyxNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxHQUFHO1FBQ2IsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9