'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.components.userRating';
exports.directiveName = 'rlUserRating';
exports.controllerName = 'UserRatingController';
var UserRatingController = (function () {
    function UserRatingController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.stars = [];
        var rangeSize = this.$scope.range != null ? this.$scope.range : 5;
        // css style requires the stars to show right to left. Reverse the list so the highest value is first
        var range = _.range(1, rangeSize + 1).reverse();
        _.each(range, function (rating) {
            _this.stars.push({
                value: rating,
                filled: false,
            });
        });
        var unbind = this.$scope.$watch('ngModel', function (value) {
            _this.updateStarView(_this.$scope.ngModel.$viewValue);
            unbind();
        });
    }
    UserRatingController.prototype.setRating = function (rating) {
        this.$scope.ngModel.$setViewValue(rating);
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
    UserRatingController.$inject = ['$scope'];
    return UserRatingController;
}());
exports.UserRatingController = UserRatingController;
function userRating() {
    'use strict';
    return {
        restrict: 'E',
        require: 'ngModel',
        template: "\n\t\t\t<span class=\"rating\">\n\t\t\t\t<span class=\"star\" ng-repeat=\"star in userRating.stars\" ng-class=\"{ 'filled': star.filled }\" ng-click=\"userRating.setRating(star.value)\"></span>\n\t\t\t</span>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'userRating',
        scope: {
            range: '=',
        },
        link: function (scope, element, attrs, ngModel) {
            scope.ngModel = ngModel;
        },
    };
}
exports.userRating = userRating;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, userRating)
    .controller(exports.controllerName, UserRatingController);
//# sourceMappingURL=userRating.js.map