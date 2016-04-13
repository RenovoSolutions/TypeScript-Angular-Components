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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJSYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBRTFCLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLHVDQUFzQywyQkFBMkIsQ0FBQyxDQUFBO0FBRXZELGtCQUFVLEdBQVcsMEJBQTBCLENBQUM7QUFFaEQscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztBQWdCM0Q7SUFPQyw4QkFBb0IsUUFBaUMsRUFBUyxlQUF3QjtRQUFsRSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFTO0lBQUksQ0FBQztJQUUzRixzQ0FBTyxHQUFQO1FBQUEsaUJBZUM7UUFkQSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM1RCxxR0FBcUc7UUFDckcsSUFBSSxLQUFLLEdBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsTUFBYztZQUM1QixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZixLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsS0FBSzthQUNiLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNiLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsTUFBYztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyw2Q0FBYyxHQUF0QixVQUF1QixNQUFjO1FBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVc7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDckIsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWpDTSw0QkFBTyxHQUFhLENBQUMsVUFBVSxFQUFFLDhDQUFxQixDQUFDLENBQUM7SUFrQ2hFLDJCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSw0QkFBb0IsdUJBd0NoQyxDQUFBO0FBRUQsSUFBSSxVQUFVLEdBQThCO0lBQzNDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7SUFDL0IsUUFBUSxFQUFFLDZRQUlUO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULEtBQUssRUFBRSxHQUFHO0tBQ1Y7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxVQUFVLENBQUM7S0FDcEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9