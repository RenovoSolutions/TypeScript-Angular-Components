// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVNpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFFN0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFLdEIsa0JBQVUsR0FBVyx5Q0FBeUMsQ0FBQztBQUMvRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUNyQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBRTlDLDBCQUFrQixHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakQsdUJBQWUsR0FBVyxFQUFFLENBQUM7QUFFMUM7SUFBQTtJQTRCQSxDQUFDO0lBdkJBLHNCQUFJLGdEQUFnQjthQUFwQjtZQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzVCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQzthQUVELFVBQXFCLEtBQWE7WUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQztRQUNGLENBQUM7OztPQU5BO0lBUUQsb0NBQU8sR0FBUDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUM7UUFDUixDQUFDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHVCQUFlLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRywwQkFBa0IsQ0FBQztRQUVwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBNUJZLDBCQUFrQixxQkE0QjlCLENBQUE7QUFFRCxJQUFNLFFBQVEsR0FBOEI7SUFDM0MsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFO0lBQ2hELFFBQVEsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDcEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0NBQzFCLENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFFBQVEsQ0FBQztLQUNsQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIn0=