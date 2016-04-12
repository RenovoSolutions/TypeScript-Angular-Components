'use strict';
var angular = require('angular');
var ratingBarBackgrounds_service_1 = require('./ratingBarBackgrounds.service');
var ratingBarClass_service_1 = require('./ratingBarClass.service');
exports.moduleName = 'rl.ui.components.ratingBar';
exports.componentName = 'rlRatingBar';
exports.controllerName = 'RatingBarController';
var RatingBarController = (function () {
    function RatingBarController($scope) {
        var _this = this;
        this.$scope = $scope;
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
    RatingBarController.$inject = ['$scope'];
    return RatingBarController;
}());
exports.RatingBarController = RatingBarController;
var ratingBar = {
    template: "\n\t\t<div class=\"rating-bar\">\n\t\t\t<div class=\"{{ratingBar.backgroundClass}}\" ng-class=\"{ empty: ratingBar.value == ratingBar.min }\" ng-style=\"ratingBar.dimensions\">\n\t\t\t\t<div ng-class=\"ratingBar.barClass\" ng-style=\"{ width: ratingBar.width, height: ratingBar.height }\"></div>\n\t\t\t</div>\n\t\t</div>\n\t",
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
//# sourceMappingURL=ratingBar.js.map