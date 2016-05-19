"use strict";
var angular = require('angular');
exports.moduleName = 'rl.ui.components.lazyLoad';
exports.componentName = 'rlLazyLoad';
exports.controllerName = 'LazyLoadController';
var LazyLoadController = (function () {
    function LazyLoadController() {
        this.init = false;
    }
    LazyLoadController.prototype.$onInit = function () {
        this.init = this.show;
    };
    LazyLoadController.prototype.$onChanges = function (changes) {
        if (!this.init && changes.show && changes.show.currentValue) {
            this.init = true;
        }
    };
    return LazyLoadController;
}());
exports.LazyLoadController = LazyLoadController;
var lazyLoad = {
    transclude: true,
    template: "\n\t\t<div ng-if=\"lazyLoad.init\">\n\t\t\t<div ng-show=\"lazyLoad.show\">\n\t\t\t\t<div ng-transclude></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'lazyLoad',
    bindings: {
        show: '<',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, lazyLoad)
    .controller(exports.controllerName, LazyLoadController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eUxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXp5TG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFJdEIsa0JBQVUsR0FBVywyQkFBMkIsQ0FBQztBQUNqRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUNyQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBTTNEO0lBQUE7UUFFQyxTQUFJLEdBQVksS0FBSyxDQUFDO0lBV3ZCLENBQUM7SUFUQSxvQ0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVcsT0FBeUI7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLENBQUM7SUFDRixDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLDBCQUFrQixxQkFhOUIsQ0FBQTtBQUVELElBQU0sUUFBUSxHQUE4QjtJQUMzQyxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsNklBTVQ7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFVBQVU7SUFDeEIsUUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLEdBQUc7S0FDVDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFFBQVEsQ0FBQztLQUNsQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIn0=