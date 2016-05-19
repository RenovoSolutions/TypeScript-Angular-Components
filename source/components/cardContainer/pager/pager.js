// /// <reference path='../../../../typings/commonjs.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2REFBNkQ7O0FBRTdELElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBS2pCLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFDNUQscUJBQWEsR0FBVyxTQUFTLENBQUM7QUFDbEMsc0JBQWMsR0FBVyxpQkFBaUIsQ0FBQztBQUUzQywrQkFBdUIsR0FBVyxDQUFDLENBQUM7QUFNL0M7SUFBQTtRQUFBLGlCQXNHQztRQWxHQSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBbUN0QixvQkFBZSxHQUFlO1lBQ3JDLElBQUksVUFBVSxHQUFXLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBRS9DLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEUsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUVELEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUE7SUFtREYsQ0FBQztJQXpGQSxzQkFBSSx3Q0FBVzthQUFmO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFnQixJQUFZO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFD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