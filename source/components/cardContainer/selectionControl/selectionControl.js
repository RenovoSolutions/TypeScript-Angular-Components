// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __boolean = typescript_angular_utilities_1.services.boolean;
exports.moduleName = 'rl.ui.components.cardContainer.selectionControl';
exports.directiveName = 'rlSelectionControl';
exports.controllerName = 'SelectionControlController';
var SelectionControlController = (function () {
    function SelectionControlController($scope, bool) {
        var _this = this;
        this.$scope = $scope;
        if (this.builder == null) {
            return;
        }
        this.selectedItems = this.builder._numberSelected;
        this.pagingEnabled = bool.toBool(this.builder._pager);
        this.dataSource = this.builder._dataSource;
        $scope.$watch(function () { return _this.builder._numberSelected; }, function (value) {
            _this.selectedItems = value;
        });
    }
    SelectionControlController.prototype.selectPage = function () {
        _.each(this.dataSource.dataSet, function (item) {
            item.viewData.selected = true;
        });
        this.$scope.$emit('selectionChanged'); //*events?
    };
    SelectionControlController.prototype.selectAll = function () {
        _.each(this.dataSource.filteredDataSet, function (item) {
            item.viewData.selected = true;
        });
        this.$scope.$emit('selectionChanged'); //*events?
    };
    SelectionControlController.prototype.clearPage = function () {
        _.each(this.dataSource.dataSet, function (item) {
            item.viewData.selected = false;
        });
        this.$scope.$emit('selectionChanged'); //*events?
    };
    SelectionControlController.prototype.clearAll = function () {
        _.each(this.dataSource.filteredDataSet, function (item) {
            item.viewData.selected = false;
        });
        this.$scope.$emit('selectionChanged'); //*events?
    };
    SelectionControlController.$inject = ['$scope', __boolean.serviceName];
    return SelectionControlController;
})();
exports.SelectionControlController = SelectionControlController;
function selectionControl() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./selectionControl.html'),
        controller: exports.controllerName,
        controllerAs: 'selection',
        scope: {},
        bindToController: {
            builder: '=',
        },
    };
}
exports.selectionControl = selectionControl;
angular.module(exports.moduleName, [__boolean.moduleName])
    .directive(exports.directiveName, selectionControl)
    .controller(exports.controllerName, SelectionControlController);
//# sourceMappingURL=selectionControl.js.map