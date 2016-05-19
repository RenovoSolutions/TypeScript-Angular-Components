// /// <reference path='../../../../typings/commonjs.d.ts' />
"use strict";
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.pageSize';
exports.componentName = 'rlPageSize';
exports.controllerName = 'PageSizeController';
exports.availablePageSizes = [10, 25, 50, 100];
exports.defaultPageSize = 10;
var PageSizeController = (function () {
    function PageSizeController() {
    }
    Object.defineProperty(PageSizeController.prototype, "selectedPageSize", {
        get: function () {
            if (this.pager != null) {
                return this.pager.pageSize;
            }
            return null;
        },
        set: function (value) {
            if (this.pager != null) {
                this.pager.pageSize = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    PageSizeController.prototype.$onInit = function () {
        if (this.cardContainer == null) {
            return;
        }
        this.selectedPageSize = exports.defaultPageSize;
        this.pageSizes = exports.availablePageSizes;
        this.pager = this.cardContainer.dataSource.pager;
    };
    return PageSizeController;
}());
exports.PageSizeController = PageSizeController;
var pageSize = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./pageSize.html'),
    controller: exports.controllerName,
    controllerAs: 'controller',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, pageSize)
    .controller(exports.controllerName, PageSizeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVNpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7O0FBRTdELElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBS3RCLGtCQUFVLEdBQVcseUNBQXlDLENBQUM7QUFDL0QscUJBQWEsR0FBVyxZQUFZLENBQUM7QUFDckMsc0JBQWMsR0FBVyxvQkFBb0IsQ0FBQztBQUU5QywwQkFBa0IsR0FBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELHVCQUFlLEdBQVcsRUFBRSxDQUFDO0FBRTFDO0lBQUE7SUE0QkEsQ0FBQztJQXZCQSxzQkFBSSxnREFBZ0I7YUFBcEI7WUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM1QixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7YUFFRCxVQUFxQixLQUFhO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUM7UUFDRixDQUFDOzs7T0FOQTtJQVFELG9DQUFPLEdBQVA7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyx1QkFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsMEJBQWtCLENBQUM7UUFFcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQTVCWSwwQkFBa0IscUJBNEI5QixDQUFBO0FBRUQsSUFBTSxRQUFRLEdBQThCO0lBQzNDLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRTtJQUNoRCxRQUFRLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ3BDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsWUFBWTtDQUMxQixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9