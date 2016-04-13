'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbGlhcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLHVCQUF1QixDQUFDO0FBQzdDLHFCQUFhLEdBQVcsU0FBUyxDQUFDO0FBQ2xDLHNCQUFjLEdBQVcsaUJBQWlCLENBQUM7QUFNdEQ7SUFFQyx5QkFBb0IsTUFBc0IsRUFDOUIsTUFBd0IsRUFDeEIsTUFBNkIsRUFDN0IsWUFBeUM7UUFIakMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3BELElBQUksWUFBWSxHQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBSU8sa0NBQVEsR0FBaEI7UUFDQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTyxzQ0FBWSxHQUFwQixVQUFxQixLQUFVO1FBQzlCLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDO0lBQ0YsQ0FBQztJQXRCTSx1QkFBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUF1QjNFLHNCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSx1QkFBZSxrQkF3QjNCLENBQUE7QUFFRDtJQUNDLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBTGUsYUFBSyxRQUtwQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxLQUFLLENBQUM7S0FDL0IsVUFBVSxDQUFDLHNCQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMifQ==