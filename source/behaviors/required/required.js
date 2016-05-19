"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXF1aXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVywwQkFBMEIsQ0FBQztBQUNoRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUNyQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBTTNEO0lBRUMsNEJBQW9CLE1BQXNCLEVBQzdCLE1BQTJCLEVBQzNCLFlBQXlDO1FBRmxDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQzdCLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUxNLDBCQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBUWpFLHlCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSwwQkFBa0IscUJBUzlCLENBQUE7QUFFRDtJQUNDLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9