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
//# sourceMappingURL=required.js.map