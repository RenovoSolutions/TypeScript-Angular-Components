'use strict';
require('./ratingBar.css');
var angular = require('angular');
var componentsDefaultTheme_1 = require('../componentsDefaultTheme');
var ratingBarBackgrounds_service_1 = require('./ratingBarBackgrounds.service');
var ratingBarClass_service_1 = require('./ratingBarClass.service');
exports.moduleName = 'rl.ui.components.ratingBar';
exports.componentName = 'rlRatingBar';
exports.controllerName = 'RatingBarController';
var RatingBarController = (function () {
    function RatingBarController($scope, useDefaultTheme) {
        var _this = this;
        this.$scope = $scope;
        this.useDefaultTheme = useDefaultTheme;
        var ratingBarBackgrounds = new ratingBarBackgrounds_service_1.RatingBarBackgroundService;
        this.ratingBarClass = new ratingBarClass_service_1.RatingBarClassService;
        this.backgroundClass = ratingBarBackgrounds.getBackground(this.background);
        if (this.value == null) {
            this.value = 0;
        }
        $scope.$watch(function () { return _this.value; }, function (newValue) {
            _this.updateValue(newValue);
        });
        $scope.$watch(function () { return _this.totalWidth; }, function (newWidth) {
            _this.dimensions = {
                width: newWidth + 2,
                height: _this.height + 2,
            };
            _this.updateValue(_this.value);
        });
    }
    RatingBarController.prototype.updateValue = function (newValue) {
        var confidenceScore = (newValue - this.min) / (this.max - this.min);
        this.barClass = this.ratingBarClass.getClass(confidenceScore);
        this.width = Math.round(confidenceScore * this.totalWidth);
    };
    RatingBarController.$inject = ['$scope', componentsDefaultTheme_1.defaultThemeValueName];
    return RatingBarController;
}());
exports.RatingBarController = RatingBarController;
var ratingBar = {
    template: "\n\t\t<div class=\"rating-bar\">\n\t\t\t<div class=\"{{ratingBar.backgroundClass}}\" ng-class=\"{ empty: ratingBar.value == ratingBar.min, 'default-theme': ratingBar.useDefaultTheme }\" ng-style=\"ratingBar.dimensions\">\n\t\t\t\t<div ng-class=\"ratingBar.barClass\" ng-style=\"{ width: ratingBar.width, height: ratingBar.height }\"></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'ratingBar',
    bindings: {
        totalWidth: '<width',
        height: '<',
        value: '<',
        min: '<',
        max: '<',
        background: '<',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, ratingBar)
    .controller(exports.controllerName, RatingBarController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmF0aW5nQmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLFFBQU8saUJBQWlCLENBQUMsQ0FBQTtBQUV6QixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyx1Q0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRSw2Q0FBeUUsZ0NBQWdDLENBQUMsQ0FBQTtBQUMxRyx1Q0FBOEQsMEJBQTBCLENBQUMsQ0FBQTtBQUU5RSxrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBQ2xELHFCQUFhLEdBQVcsYUFBYSxDQUFDO0FBQ3RDLHNCQUFjLEdBQVcscUJBQXFCLENBQUM7QUFnQjFEO0lBaUJDLDZCQUFvQixNQUFzQixFQUFTLGVBQXdCO1FBakI1RSxpQkE2Q0M7UUE1Qm9CLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQVM7UUFDMUUsSUFBSSxvQkFBb0IsR0FBaUMsSUFBSSx5REFBMEIsQ0FBQztRQUN4RixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksOENBQXFCLENBQUM7UUFFaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFnQixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLFFBQWdCO1lBQ3BFLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWdCLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsUUFBZ0I7WUFDekUsS0FBSSxDQUFDLFVBQVUsR0FBRztnQkFDakIsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQ3ZCLENBQUM7WUFDRixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyx5Q0FBVyxHQUFuQixVQUFvQixRQUFnQjtRQUNuQyxJQUFJLGVBQWUsR0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUE1Qk0sMkJBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSw4Q0FBcUIsQ0FBQyxDQUFDO0lBNkI5RCwwQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksMkJBQW1CLHNCQTZDL0IsQ0FBQTtBQUVELElBQUksU0FBUyxHQUE4QjtJQUMxQyxRQUFRLEVBQUUsbVhBTVQ7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFdBQVc7SUFDekIsUUFBUSxFQUFFO1FBQ1QsVUFBVSxFQUFFLFFBQVE7UUFDcEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxLQUFLLEVBQUUsR0FBRztRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixVQUFVLEVBQUUsR0FBRztLQUNmO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsU0FBUyxDQUFDO0tBQ25DLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==