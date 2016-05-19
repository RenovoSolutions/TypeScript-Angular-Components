"use strict";
var angular = require('angular');
exports.moduleName = 'rl.ui.behaviors.alias';
exports.directiveName = 'rlAlias';
exports.controllerName = 'AliasController';
var AliasController = (function () {
    function AliasController($scope, $attrs, $parse, $interpolate) {
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.$interpolate = $interpolate;
        var initialValue = this.getValue();
        this.resolveAlias(initialValue);
        $scope.$watch(this.getValue.bind(this), this.resolveAlias.bind(this));
    }
    AliasController.prototype.getValue = function () {
        this.expression = this.$attrs.rlAlias.split(' as ');
        return this.$parse(this.expression[0])(this.$scope);
    };
    AliasController.prototype.resolveAlias = function (value) {
        var alias = this.$interpolate(this.expression[1])(this.$scope);
        if (alias != null) {
            this.$scope[alias] = value;
        }
    };
    AliasController.$inject = ['$scope', '$attrs', '$parse', '$interpolate'];
    return AliasController;
}());
exports.AliasController = AliasController;
function alias() {
    return {
        restrict: 'A',
        controller: exports.controllerName,
    };
}
exports.alias = alias;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, alias)
    .controller(exports.controllerName, AliasController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUM3QyxxQkFBYSxHQUFXLFNBQVMsQ0FBQztBQUNsQyxzQkFBYyxHQUFXLGlCQUFpQixDQUFDO0FBTXREO0lBRUMseUJBQW9CLE1BQXNCLEVBQzlCLE1BQXdCLEVBQ3hCLE1BQTZCLEVBQzdCLFlBQXlDO1FBSGpDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUNwRCxJQUFJLFlBQVksR0FBUSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUlPLGtDQUFRLEdBQWhCO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sc0NBQVksR0FBcEIsVUFBcUIsS0FBVTtRQUM5QixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztJQUNGLENBQUM7SUF0Qk0sdUJBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBdUIzRSxzQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksdUJBQWUsa0JBd0IzQixDQUFBO0FBRUQ7SUFDQyxNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFVBQVUsRUFBRSxzQkFBYztLQUMxQixDQUFDO0FBQ0gsQ0FBQztBQUxlLGFBQUssUUFLcEIsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsS0FBSyxDQUFDO0tBQy9CLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDIn0=