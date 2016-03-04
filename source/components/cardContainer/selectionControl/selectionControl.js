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
        this.$scope = $scope;
        this.bool = bool;
    }
    SelectionControlController.prototype.$onInit = function () {
        var _this = this;
        if (this.cardContainer == null) {
            return;
        }
        this.selectedItems = this.cardContainer.numberSelected;
        this.pagingEnabled = this.bool.toBool(this.cardContainer.dataSource.pager);
        this.dataSource = this.cardContainer.dataSource;
        this.$scope.$watch(function () { return _this.cardContainer.numberSelected; }, function (value) {
            _this.selectedItems = value;
        });
    };
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
        require: { cardContainer: '?^^rlCardContainer' },
        template: require('./selectionControl.html'),
        controller: exports.controllerName,
        controllerAs: 'selection',
        scope: {},
        bindToController: {},
    };
}
exports.selectionControl = selectionControl;
angular.module(exports.moduleName, [__boolean.moduleName])
    .directive(exports.directiveName, selectionControl)
    .controller(exports.controllerName, SelectionControlController);
//# sourceMappingURL=selectionControl.js.map