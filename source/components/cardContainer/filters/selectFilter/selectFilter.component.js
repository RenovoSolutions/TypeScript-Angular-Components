// /// <reference path='../../../../../typings/commonjs.d.ts' />
'use strict';
exports.directiveName = 'rlSelectFilter';
exports.controllerName = 'SelectFilterController';
var SelectFilterController = (function () {
    function SelectFilterController($scope) {
        this.$scope = $scope;
    }
    Object.defineProperty(SelectFilterController.prototype, "selectedValue", {
        get: function () {
            return this.filter.selectedValue;
        },
        set: function (v) {
            this.filter.selectedValue = v;
            if (this.source != null) {
                this.source.refresh();
            }
            else {
                this.$scope.$emit('dataSource.requestRefresh'); //*event?
            }
        },
        enumerable: true,
        configurable: true
    });
    SelectFilterController.$inject = ['$scope'];
    return SelectFilterController;
}());
exports.SelectFilterController = SelectFilterController;
function selectFilter() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./selectFilter.html'),
        controller: exports.controllerName,
        controllerAs: 'filter',
        scope: {},
        bindToController: {
            filter: '=',
            options: '=',
            getOptions: '&',
            source: '=',
            label: '@',
            selector: '=',
            nullOption: '@'
        },
    };
}
exports.selectFilter = selectFilter;
//# sourceMappingURL=selectFilter.component.js.map