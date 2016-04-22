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
        var index = this.checkForIndex(this.$scope);
        // return true for odd items (index is even, since it's 0 based)
        if (!(index % 2)) {
            this.$attrs.$addClass(this.$attrs.rlAlternatingClass);
        }
    };
    AlternatingClassController.prototype.checkForIndex = function (scope) {
        if (scope.$index == null && scope.$parent) {
            return this.checkForIndex(scope.$parent);
        }
        else {
            return scope.$index;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpbmdDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFsdGVybmF0aW5nQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyxrQ0FBa0MsQ0FBQztBQUN4RCxxQkFBYSxHQUFXLG9CQUFvQixDQUFDO0FBQzdDLHNCQUFjLEdBQVcsNEJBQTRCLENBQUM7QUFNbkU7SUFFQyxvQ0FBb0IsTUFBc0IsRUFBVSxNQUFtQztRQUFuRSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQTZCO0lBQUcsQ0FBQztJQUkzRiw0Q0FBTyxHQUFQO1FBQ0MsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsZ0VBQWdFO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0YsQ0FBQztJQUVELGtEQUFhLEdBQWIsVUFBYyxLQUFVO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQW5CTSxrQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBb0JqRCxpQ0FBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksa0NBQTBCLDZCQXFCdEMsQ0FBQTtBQUVEO0lBQ0MsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLEdBQUc7UUFDYixVQUFVLEVBQUUsc0JBQWM7S0FDMUIsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGdCQUFnQixDQUFDO0tBQzFDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLDBCQUEwQixDQUFDLENBQUMifQ==