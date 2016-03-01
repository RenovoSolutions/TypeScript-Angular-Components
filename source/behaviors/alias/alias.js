'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.behaviors.alias';
exports.directiveName = 'rlAlias';
exports.controllerName = 'AliasController';
var AliasController = (function () {
    function AliasController($scope, $attrs, $parse, $interpolate) {
        var expression;
        $scope.$watch(function () {
            expression = $attrs.rlAlias.split(' as ');
            return $parse(expression[0])($scope);
        }, function (item) {
            var alias = $interpolate(expression[1])($scope);
            if (alias != null) {
                $scope[alias] = item;
            }
        });
    }
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