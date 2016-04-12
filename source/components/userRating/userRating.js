'use strict';
require('./userRating.css');
var angular = require('angular');
var _ = require('lodash');
var componentsDefaultTheme_1 = require('../componentsDefaultTheme');
exports.moduleName = 'rl.components.userRating';
exports.componentName = 'rlUserRating';
exports.controllerName = 'UserRatingController';
var UserRatingController = (function () {
    function UserRatingController($timeout, useDefaultTheme) {
        this.$timeout = $timeout;
        this.useDefaultTheme = useDefaultTheme;
    }
    UserRatingController.prototype.$onInit = function () {
        var _this = this;
        this.stars = [];
        var rangeSize = this.range != null ? this.range : 5;
        // css style requires the stars to show right to left. Reverse the list so the highest value is first
        var range = _.range(1, rangeSize + 1).reverse();
        _.each(range, function (rating) {
            _this.stars.push({
                value: rating,
                filled: false,
            });
        });
        this.$timeout(function () {
            _this.updateStarView(_this.ngModel.$viewValue);
        });
    };
    UserRatingController.prototype.setRating = function (rating) {
        this.ngModel.$setViewValue(rating);
        this.updateStarView(rating);
    };
    UserRatingController.prototype.updateStarView = function (rating) {
        _.each(this.stars, function (star) {
            if (star.value <= rating) {
                star.filled = true;
            }
            else {
                star.filled = false;
            }
        });
    };
    UserRatingController.$inject = ['$timeout', componentsDefaultTheme_1.defaultThemeValueName];
    return UserRatingController;
}());
exports.UserRatingController = UserRatingController;
var userRating = {
    require: { ngModel: 'ngModel' },
    template: "\n\t\t<span class=\"rating\" ng-class=\"{ 'default-theme': userRating.useDefaultTheme }\">\n\t\t\t<span class=\"star\" ng-repeat=\"star in userRating.stars\" ng-class=\"{ 'filled': star.filled }\" ng-click=\"userRating.setRating(star.value)\"></span>\n\t\t</span>\n\t",
    controller: exports.controllerName,
    controllerAs: 'userRating',
    bindings: {
        range: '=',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, userRating)
    .controller(exports.controllerName, UserRatingController);
//# sourceMappingURL=userRating.js.map