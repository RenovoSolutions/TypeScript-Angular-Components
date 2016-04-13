// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.pager';
exports.componentName = 'rlPager';
exports.controllerName = 'PagerController';
exports.defaultVisiblePageCount = 5;
var PagerController = (function () {
    function PagerController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.canGoBack = false;
        this.canGoForward = false;
        this.hasPageFilter = true;
        this.updatePageCount = function () {
            var totalItems = _this.dataSource.count;
            var newLastPage = Math.ceil(totalItems / _this.pager.pageSize);
            if (newLastPage !== _this.lastPage) {
                _this.lastPage = newLastPage;
                _this.currentPage = 1;
            }
            _this.updatePaging();
        };
    }
    PagerController.prototype.$onInit = function () {
        var _this = this;
        if (this.cardContainer == null) {
            return;
        }
        this.pager = this.cardContainer.dataSource.pager;
        if (this.pager == null) {
            this.hasPageFilter = false;
        }
        else {
            this.visiblePageCount = this.pageCount != null ? this.pageCount : exports.defaultVisiblePageCount;
            this.lastPage = 1;
            this.dataSource = this.cardContainer.dataSource;
            this.$scope.$watch(function () { return _this.dataSource.count; }, this.updatePageCount);
            this.$scope.$watch(function () { return _this.pager.pageSize; }, this.updatePageCount);
            this.$scope.$watch(function () { return _this.currentPage; }, function (page) {
                _this.updatePaging();
                _this.pager.pageNumber = page;
                _this.dataSource.onPagingChange();
            });
        }
    };
    PagerController.prototype.updatePaging = function () {
        var page = this.currentPage;
        this.canGoBack = page > 1;
        this.canGoForward = page < this.lastPage;
        var nonCurrentVisiblePages = this.visiblePageCount - 1;
        var before = Math.floor(nonCurrentVisiblePages / 2);
        var after = Math.ceil(nonCurrentVisiblePages / 2);
        var startPage = page - before;
        var endPage = page + after;
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(this.visiblePageCount, this.lastPage);
        }
        else if (endPage > this.lastPage) {
            endPage = this.lastPage;
            startPage = Math.max(this.lastPage - nonCurrentVisiblePages, 1);
        }
        this.pages = _.range(startPage, endPage + 1);
    };
    PagerController.prototype.first = function () {
        this.currentPage = 1;
    };
    PagerController.prototype.previous = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    };
    PagerController.prototype.goto = function (page) {
        if (page >= 1 && page <= this.lastPage) {
            this.currentPage = page;
        }
    };
    PagerController.prototype.next = function () {
        if (this.currentPage < this.lastPage) {
            this.currentPage++;
        }
    };
    PagerController.prototype.last = function () {
        this.currentPage = this.lastPage;
    };
    PagerController.$inject = ['$scope'];
    return PagerController;
}());
exports.PagerController = PagerController;
var pager = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./pager.html'),
    controller: exports.controllerName,
    controllerAs: 'pager',
    bindings: {
        pageCount: '<?visiblePages',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, pager)
    .controller(exports.controllerName, PagerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFFN0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFLakIsa0JBQVUsR0FBVyxzQ0FBc0MsQ0FBQztBQUM1RCxxQkFBYSxHQUFXLFNBQVMsQ0FBQztBQUNsQyxzQkFBYyxHQUFXLGlCQUFpQixDQUFDO0FBRTNDLCtCQUF1QixHQUFXLENBQUMsQ0FBQztBQU0vQztJQWdCQyx5QkFBb0IsTUFBc0I7UUFoQjNDLGlCQTBHQztRQTFGb0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFaMUMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUc5QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQW9DdEIsb0JBQWUsR0FBZTtZQUNyQyxJQUFJLFVBQVUsR0FBVyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUUvQyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFBO0lBdkM0QyxDQUFDO0lBRTlDLGlDQUFPLEdBQVA7UUFBQSxpQkF3QkM7UUF2QkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFD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