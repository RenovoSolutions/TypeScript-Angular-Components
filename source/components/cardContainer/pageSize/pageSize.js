// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.pageSize';
exports.componentName = 'rlPageSize';
exports.controllerName = 'PageSizeController';
exports.availablePageSizes = [10, 25, 50, 100];
exports.defaultPageSize = 10;
var PageSizeController = (function () {
    function PageSizeController($scope) {
        this.$scope = $scope;
    }
    PageSizeController.prototype.$onInit = function () {
        var _this = this;
        if (this.cardContainer == null) {
            return;
        }
        this.selectedPageSize = exports.defaultPageSize;
        this.pageSizes = exports.availablePageSizes;
        this.hasPageFilter = true;
        var pager = this.cardContainer.dataSource.pager;
        if (pager == null) {
            this.hasPageFilter = false;
        }
        else {
            this.$scope.$watch(function () { return _this.selectedPageSize; }, function (newPageSize) {
                if (pager != null) {
                    pager.pageSize = newPageSize;
                    _this.cardContainer.dataSource.onPagingChange();
                }
            });
        }
    };
    PageSizeController.$inject = ['$scope'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVNpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFFN0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFLeEIsa0JBQVUsR0FBVyx5Q0FBeUMsQ0FBQztBQUMvRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUNyQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBRTlDLDBCQUFrQixHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakQsdUJBQWUsR0FBVyxFQUFFLENBQUM7QUFFeEM7SUFPQyw0QkFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBRyxDQUFDO0lBRTlDLG9DQUFPLEdBQVA7UUFBQSxpQkFxQkM7UUFwQkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsdUJBQWUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLDBCQUFrQixDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksS0FBSyxHQUF5QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFdEUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBZ0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLFdBQW1CO2dCQUN2RixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNoRCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQztJQXhCTSwwQkFBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUF5QnZDLHlCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CWSwwQkFBa0IscUJBK0I5QixDQUFBO0FBRUQsSUFBSSxRQUFRLEdBQThCO0lBQ3pDLE9BQU8sRUFBRSxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRTtJQUNoRCxRQUFRLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ3BDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsWUFBWTtDQUMxQixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUM7S0FDbEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9