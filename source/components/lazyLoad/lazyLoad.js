'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.lazyLoad';
exports.componentName = 'rlLazyLoad';
exports.controllerName = 'LazyLoadController';
var LazyLoadController = (function () {
    function LazyLoadController() {
        this.init = false;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eUxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXp5TG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUl0QixrQkFBVSxHQUFXLDJCQUEyQixDQUFDO0FBQ2pELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUFNM0Q7SUFBQTtRQUVDLFNBQUksR0FBWSxLQUFLLENBQUM7SUFPdkIsQ0FBQztJQUxBLHVDQUFVLEdBQVYsVUFBVyxPQUF5QjtRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztJQUNGLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksMEJBQWtCLHFCQVM5QixDQUFBO0FBRUQsSUFBTSxRQUFRLEdBQThCO0lBQzNDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSw2SUFNVDtJQUNELFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsVUFBVTtJQUN4QixRQUFRLEVBQUU7UUFDVCxJQUFJLEVBQUUsR0FBRztLQUNUO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsUUFBUSxDQUFDO0tBQ2xDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMifQ==