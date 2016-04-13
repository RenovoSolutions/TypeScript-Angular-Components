'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.lazyLoad';
exports.componentName = 'rlLazyLoad';
exports.controllerName = 'LazyLoadController';
var LazyLoadController = (function () {
    function LazyLoadController($scope) {
        var _this = this;
        this.init = false;
        var unbind = $scope.$watch(function () { return _this.show; }, function (value) {
            if (value) {
                _this.init = true;
                unbind();
            }
        });
    }
    LazyLoadController.$inject = ['$scope'];
    return LazyLoadController;
}());
exports.LazyLoadController = LazyLoadController;
var lazyLoad = {
    transclude: true,
    template: "\n\t\t<div ng-if=\"lazyLoad.init\">\n\t\t\t<div ng-show=\"lazyLoad.show\">\n\t\t\t\t<div ng-transclude></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'lazyLoad',
    bindings: {
        show: '=',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, lazyLoad)
    .controller(exports.controllerName, LazyLoadController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eUxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXp5TG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLDJCQUEyQixDQUFDO0FBQ2pELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUFFekQ7SUFLQyw0QkFBWSxNQUFzQjtRQUxuQyxpQkFhQztRQVhBLFNBQUksR0FBWSxLQUFLLENBQUM7UUFJckIsSUFBSSxNQUFNLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFpQixNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWM7WUFDekYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsTUFBTSxFQUFFLENBQUM7WUFDVixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBUk0sMEJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBU3ZDLHlCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSwwQkFBa0IscUJBYTlCLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBOEI7SUFDekMsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLDZJQU1UO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxVQUFVO0lBQ3hCLFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxHQUFHO0tBQ1Q7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9