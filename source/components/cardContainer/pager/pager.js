// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.pager';
exports.directiveName = 'rlPager';
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
function pager() {
    'use strict';
    return {
        restrict: 'E',
        require: { cardContainer: '?^^rlCardContainer' },
        template: require('./pager.html'),
        controller: exports.controllerName,
        controllerAs: 'pager',
        scope: {},
        bindToController: {
            pageCount: '=visiblePages',
        },
    };
}
exports.pager = pager;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, pager)
    .controller(exports.controllerName, PagerController);
//# sourceMappingURL=pager.js.map