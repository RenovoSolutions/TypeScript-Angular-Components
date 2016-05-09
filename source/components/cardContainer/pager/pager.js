// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.pager';
exports.componentName = 'rlPager';
exports.controllerName = 'PagerController';
exports.defaultVisiblePageCount = 5;
var PagerController = (function () {
    function PagerController() {
        var _this = this;
        this.canGoBack = false;
        this.canGoForward = false;
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
    Object.defineProperty(PagerController.prototype, "currentPage", {
        get: function () {
            return this.pager.pageNumber;
        },
        set: function (page) {
            this.pager.pageNumber = page;
            this.updatePaging();
        },
        enumerable: true,
        configurable: true
    });
    PagerController.prototype.$onInit = function () {
        if (this.cardContainer == null) {
            return;
        }
        this.pager = this.cardContainer.dataSource.pager;
        if (this.pager) {
            this.visiblePageCount = this.pageCount != null ? this.pageCount : exports.defaultVisiblePageCount;
            this.lastPage = 1;
            this.dataSource = this.cardContainer.dataSource;
            this.dataSource.countChanges.subscribe(this.updatePageCount);
            this.pager.pageSizeChanges.subscribe(this.updatePageCount);
            this.updatePageCount();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7QUFFN0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFLakIsa0JBQVUsR0FBVyxzQ0FBc0MsQ0FBQztBQUM1RCxxQkFBYSxHQUFXLFNBQVMsQ0FBQztBQUNsQyxzQkFBYyxHQUFXLGlCQUFpQixDQUFDO0FBRTNDLCtCQUF1QixHQUFXLENBQUMsQ0FBQztBQU0vQztJQUFBO1FBQUEsaUJBc0dDO1FBbEdBLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFtQ3RCLG9CQUFlLEdBQWU7WUFDckMsSUFBSSxVQUFVLEdBQVcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFFL0MsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0RSxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEtBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO2dCQUM1QixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBRUQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQTtJQW1ERixDQUFDO0lBekZBLHNCQUFJLHdDQUFXO2FBQWY7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWdCLElBQVk7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZ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