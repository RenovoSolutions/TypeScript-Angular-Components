// /// <reference path='../../../../../typings/commonjs.d.ts' />
'use strict';
exports.directiveName = 'rlFilterGroup';
exports.controllerName = 'FilterGroupController';
var FilterGroupController = (function () {
    function FilterGroupController($scope) {
        this.$scope = $scope;
        this.hasIcon = $scope.icon != null && $scope.icon !== '';
        this.showChildren = true;
    }
    FilterGroupController.prototype.toggleChildren = function () {
        this.showChildren = !this.showChildren;
    };
    FilterGroupController.prototype.selectOption = function (option) {
        this.$scope.filterGroup.activeOption = option;
        this.showChildren = false;
        if (this.$scope.source != null) {
            this.$scope.source.refresh();
        }
        else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    };
    FilterGroupController.$inject = ['$scope'];
    return FilterGroupController;
})();
exports.FilterGroupController = FilterGroupController;
function filterGroup() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./filterGroup.directive.html'),
        controller: exports.controllerName,
        controllerAs: 'controller',
        scope: {},
        bindToController: {
            icon: '=',
            filterGroup: '=',
            source: '=',
        },
    };
}
exports.filterGroup = filterGroup;
//# sourceMappingURL=filterGroup.directive.js.map