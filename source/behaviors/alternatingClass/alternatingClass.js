'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.behaviors.alternatingClass';
exports.directiveName = 'rlAlternatingClass';
exports.controllerName = 'AlternatingClassController';
var AlternatingClassController = (function () {
    function AlternatingClassController($scope, $attrs) {
        this.$scope = $scope;
        this.$attrs = $attrs;
    }
    AlternatingClassController.prototype.$onInit = function () {
        var odd = this.checkForOdd(this.$scope);
        // angular appears to set $odd on the odd indexed items. We want to set the class on the even ones instead.
        if (odd === false) {
            this.$attrs.$set('class', this.$attrs.class + ' ' + this.$attrs.rlAlternatingClass);
        }
    };
    AlternatingClassController.prototype.checkForOdd = function (scope) {
        if (scope.$odd == null && scope.$parent) {
            return this.checkForOdd(scope.$parent);
        }
        else {
            return scope.$odd;
        }
    };
    AlternatingClassController.$inject = ['$scope', '$attrs'];
    return AlternatingClassController;
}());
exports.AlternatingClassController = AlternatingClassController;
function alternatingClass() {
    return {
        restrict: 'A',
        controller: exports.controllerName,
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, alternatingClass)
    .controller(exports.controllerName, AlternatingClassController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpbmdDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFsdGVybmF0aW5nQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyxrQ0FBa0MsQ0FBQztBQUN4RCxxQkFBYSxHQUFXLG9CQUFvQixDQUFDO0FBQzdDLHNCQUFjLEdBQVcsNEJBQTRCLENBQUM7QUFPbkU7SUFFQyxvQ0FBb0IsTUFBc0IsRUFBVSxNQUFtQztRQUFuRSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQTZCO0lBQUcsQ0FBQztJQUkzRiw0Q0FBTyxHQUFQO1FBQ0MsSUFBTSxHQUFHLEdBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsMkdBQTJHO1FBQzNHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7SUFDRixDQUFDO0lBRUQsZ0RBQVcsR0FBWCxVQUFZLEtBQVU7UUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7SUFDRixDQUFDO0lBbkJNLGtDQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFvQmpELGlDQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxrQ0FBMEIsNkJBcUJ0QyxDQUFBO0FBRUQ7SUFDQyxNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFVBQVUsRUFBRSxzQkFBYztLQUMxQixDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsZ0JBQWdCLENBQUM7S0FDMUMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyJ9