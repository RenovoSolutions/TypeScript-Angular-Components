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
//# sourceMappingURL=pageSize.js.map