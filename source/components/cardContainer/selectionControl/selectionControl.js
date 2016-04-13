// /// <reference path='../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __boolean = typescript_angular_utilities_1.services.boolean;
exports.moduleName = 'rl.ui.components.cardContainer.selectionControl';
exports.componentName = 'rlSelectionControl';
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
        this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.selectAll = function () {
        _.each(this.dataSource.filteredDataSet, function (item) {
            item.viewData.selected = true;
        });
        this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.clearPage = function () {
        _.each(this.dataSource.dataSet, function (item) {
            item.viewData.selected = false;
        });
        this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.clearAll = function () {
        _.each(this.dataSource.filteredDataSet, function (item) {
            item.viewData.selected = false;
        });
        this.cardContainer.selectionChanged();
    };
    SelectionControlController.$inject = ['$scope', __boolean.serviceName];
    return SelectionControlController;
}());
exports.SelectionControlController = SelectionControlController;
var selectionControl = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./selectionControl.html'),
    controller: exports.controllerName,
    controllerAs: 'selection',
};
angular.module(exports.moduleName, [__boolean.moduleName])
    .component(exports.componentName, selectionControl)
    .controller(exports.controllerName, SelectionControlController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdGlvbkNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBRTdELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sU0FBUyxHQUFHLHVDQUFRLENBQUMsT0FBTyxDQUFDO0FBS3pCLGtCQUFVLEdBQVcsaURBQWlELENBQUM7QUFDdkUscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBRWpFO0lBT0Msb0NBQW9CLE1BQXNCLEVBQzlCLElBQStCO1FBRHZCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQzlCLFNBQUksR0FBSixJQUFJLENBQTJCO0lBQUcsQ0FBQztJQUUvQyw0Q0FBTyxHQUFQO1FBQUEsaUJBWUM7UUFYQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBRWhELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWdCLE1BQU0sQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWE7WUFDN0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsK0NBQVUsR0FBVjtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFTO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxVQUFVO0lBQ2xELENBQUM7SUFFRCw4Q0FBUyxHQUFUO1FBQ0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFDLElBQVM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFVBQVU7SUFDbEQsQ0FBQztJQUVELDhDQUFTLEdBQVQ7UUFDQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFVBQUMsSUFBUztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsVUFBVTtJQUNsRCxDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBQyxJQUFTO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxVQUFVO0lBQ2xELENBQUM7SUFoRE0sa0NBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFpRDlELGlDQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSxrQ0FBMEIsNkJBdUR0QyxDQUFBO0FBRUQsSUFBSSxnQkFBZ0IsR0FBOEI7SUFDakQsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFO0lBQ2hELFFBQVEsRUFBRSxPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDNUMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQsU0FBUyxDQUFDLHFCQUFhLEVBQUUsZ0JBQWdCLENBQUM7S0FDMUMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyJ9
