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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nV2l0aFdhdGVybWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmluZ1dpdGhXYXRlcm1hcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFFdkIsa0JBQVUsR0FBVyxzQ0FBc0MsQ0FBQztBQUM1RCxxQkFBYSxHQUFXLHVCQUF1QixDQUFDO0FBQ2hELHNCQUFjLEdBQVcsK0JBQStCLENBQUM7QUFRcEU7SUFRQyx1Q0FBWSxNQUFzQixFQUFFLGFBQXNDO1FBUjNFLGlCQWFDO1FBSkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFnQixNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWE7WUFDbEUsS0FBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFMTSxxQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQU03RCxvQ0FBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlkscUNBQTZCLGdDQWF6QyxDQUFBO0FBRUQsSUFBSSxtQkFBbUIsR0FBOEI7SUFDcEQsUUFBUSxFQUFFLDRNQUtUO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULE1BQU0sRUFBRSxHQUFHO1FBQ1gsU0FBUyxFQUFFLEdBQUc7S0FDZDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDL0MsU0FBUyxDQUFDLHFCQUFhLEVBQUUsbUJBQW1CLENBQUM7S0FDN0MsVUFBVSxDQUFDLHNCQUFjLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyJ9