// /// <reference path='../../../../../typings/commonjs.d.ts' />
'use strict';
exports.componentName = 'rlFilterGroup';
exports.controllerName = 'FilterGroupController';
var FilterGroupController = (function () {
    function FilterGroupController($scope) {
        this.$scope = $scope;
        this.hasIcon = this.icon != null && this.icon !== '';
        this.showChildren = true;
    }
    FilterGroupController.prototype.toggleChildren = function () {
        this.showChildren = !this.showChildren;
    };
    FilterGroupController.prototype.selectOption = function (option) {
        this.filterGroup.activeOption = option;
        this.showChildren = false;
        if (this.source != null) {
            this.source.refresh();
        }
        else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    };
    FilterGroupController.$inject = ['$scope'];
    return FilterGroupController;
}());
exports.FilterGroupController = FilterGroupController;
exports.filterGroup = {
    template: require('./filterGroup.directive.html'),
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        icon: '=',
        filterGroup: '=',
        source: '=',
    },
};
//# sourceMappingURL=filterGroup.directive.js.map