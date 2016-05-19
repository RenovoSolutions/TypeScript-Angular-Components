"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx0ZXJuYXRpbmdDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFsdGVybmF0aW5nQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXRCLGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBT25FO0lBRUMsb0NBQW9CLE1BQXNCLEVBQVUsTUFBbUM7UUFBbkUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUE2QjtJQUFHLENBQUM7SUFJM0YsNENBQU8sR0FBUDtRQUNDLElBQU0sR0FBRyxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELDJHQUEyRztRQUMzRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRixDQUFDO0lBQ0YsQ0FBQztJQUVELGdEQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDO0lBQ0YsQ0FBQztJQW5CTSxrQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBb0JqRCxpQ0FBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksa0NBQTBCLDZCQXFCdEMsQ0FBQTtBQUVEO0lBQ0MsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLEdBQUc7UUFDYixVQUFVLEVBQUUsc0JBQWM7S0FDMUIsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGdCQUFnQixDQUFDO0tBQzFDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLDBCQUEwQixDQUFDLENBQUMifQ==