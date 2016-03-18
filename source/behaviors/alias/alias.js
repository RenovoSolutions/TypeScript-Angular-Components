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
//# sourceMappingURL=alias.js.map