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
    function RatingBarController(useDefaultTheme) {
        this.useDefaultTheme = useDefaultTheme;
        var ratingBarBackgrounds = new ratingBarBackgrounds_service_1.RatingBarBackgroundService;
        this.ratingBarClass = new ratingBarClass_service_1.RatingBarClassService;
        this.backgroundClass = ratingBarBackgrounds.getBackground(this.background);
        if (this.value == null) {
            this.value = 0;
        }
        this.updateValue(this.value);
        this.updateDimensions(this.totalWidth);
    }
    RatingBarController.prototype.$onChanges = function (changes) {
        if (changes.value) {
            this.updateValue(changes.value.currentValue);
        }
        if (changes.totalWidth) {
            this.updateDimensions(changes.totalWidth.currentValue);
        }
    };
    RatingBarController.prototype.updateValue = function (newValue) {
        var confidenceScore = (newValue - this.min) / (this.max - this.min);
        this.barClass = this.ratingBarClass.getClass(confidenceScore);
        this.width = Math.round(confidenceScore * this.totalWidth);
    };
    RatingBarController.prototype.updateDimensions = function (totalWidth) {
        this.dimensions = {
            width: totalWidth + 2,
            height: this.height + 2,
        };
        this.updateValue(this.value);
    };
    RatingBarController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmF0aW5nQmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLFFBQU8saUJBQWlCLENBQUMsQ0FBQTtBQUV6QixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyx1Q0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRSw2Q0FBeUUsZ0NBQWdDLENBQUMsQ0FBQTtBQUMxRyx1Q0FBOEQsMEJBQTBCLENBQUMsQ0FBQTtBQUk5RSxrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBQ2xELHFCQUFhLEdBQVcsYUFBYSxDQUFDO0FBQ3RDLHNCQUFjLEdBQVcscUJBQXFCLENBQUM7QUFxQjFEO0lBaUJDLDZCQUFtQixlQUF3QjtRQUF4QixvQkFBZSxHQUFmLGVBQWUsQ0FBUztRQUMxQyxJQUFJLG9CQUFvQixHQUFpQyxJQUFJLHlEQUEwQixDQUFDO1FBQ3hGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSw4Q0FBcUIsQ0FBQztRQUVoRCxJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsT0FBMEI7UUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0YsQ0FBQztJQUVPLHlDQUFXLEdBQW5CLFVBQW9CLFFBQWdCO1FBQ25DLElBQUksZUFBZSxHQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLDhDQUFnQixHQUF4QixVQUF5QixVQUFrQjtRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2pCLEtBQUssRUFBRSxVQUFVLEdBQUcsQ0FBQztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1NBQ3ZCLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBckNNLDJCQUFPLEdBQWEsQ0FBQyw4Q0FBcUIsQ0FBQyxDQUFDO0lBc0NwRCwwQkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7QUF0RFksMkJBQW1CLHNCQXNEL0IsQ0FBQTtBQUVELElBQUksU0FBUyxHQUE4QjtJQUMxQyxRQUFRLEVBQUUsbVhBTVQ7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFdBQVc7SUFDekIsUUFBUSxFQUFFO1FBQ1QsVUFBVSxFQUFFLFFBQVE7UUFDcEIsTUFBTSxFQUFFLEdBQUc7UUFDWCxLQUFLLEVBQUUsR0FBRztRQUNWLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixVQUFVLEVBQUUsR0FBRztLQUNmO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsU0FBUyxDQUFDO0tBQ25DLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==