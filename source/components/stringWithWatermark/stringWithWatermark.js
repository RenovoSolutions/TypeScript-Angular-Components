'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.ui.components.stringWithWatermark';
exports.componentName = 'rlStringWithWatermark';
exports.controllerName = 'StringWithWatermarkController';
var StringWithWatermarkController = (function () {
    function StringWithWatermarkController($scope, objectUtility) {
        var _this = this;
        $scope.$watch(function () { return _this.string; }, function (value) {
            _this.hasString = objectUtility.isNullOrEmpty(value) === false;
        });
    }
    StringWithWatermarkController.$inject = ['$scope', __object.serviceName];
    return StringWithWatermarkController;
}());
exports.StringWithWatermarkController = StringWithWatermarkController;
var stringWithWatermark = {
    template: "\n\t\t<span>\n\t\t\t<span ng-show=\"controller.hasString\">{{controller.string}}</span>\n\t\t\t<span ng-hide=\"controller.hasString\" class=\"watermark\">{{controller.watermark}}</span>\n\t\t</span>\n\t",
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        string: '@',
        watermark: '@',
    },
};
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, stringWithWatermark)
    .controller(exports.controllerName, StringWithWatermarkController);
//# sourceMappingURL=stringWithWatermark.js.map