// /// <reference path='../../../../typings/commonjs.d.ts' />
"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.cardContainer.selectionControl';
exports.componentName = 'rlSelectionControl';
exports.controllerName = 'SelectionControlController';
var SelectionControlController = (function () {
    function SelectionControlController(bool) {
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
        this.cardContainer.numberSelectedChanges.subscribe(function (value) {
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
    SelectionControlController.$inject = [typescript_angular_utilities_1.downgrade.booleanServiceName];
    return SelectionControlController;
}());
exports.SelectionControlController = SelectionControlController;
var selectionControl = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./selectionControl.html'),
    controller: exports.controllerName,
    controllerAs: 'selection',
};
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .component(exports.componentName, selectionControl)
    .controller(exports.controllerName, SelectionControlController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdGlvbkNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEOztBQUU3RCxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQU14RCxrQkFBVSxHQUFXLGlEQUFpRCxDQUFDO0FBQ3ZFLHFCQUFhLEdBQVcsb0JBQW9CLENBQUM7QUFDN0Msc0JBQWMsR0FBVyw0QkFBNEIsQ0FBQztBQUVqRTtJQU9DLG9DQUFvQixJQUErQjtRQUEvQixTQUFJLEdBQUosSUFBSSxDQUEyQjtJQUFHLENBQUM7SUFFdkQsNENBQU8sR0FBUDtRQUFBLGlCQVlDO1FBWEEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUVoRCxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWE7WUFDaEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsK0NBQVUsR0FBVjtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFTO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsOENBQVMsR0FBVDtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBQyxJQUFTO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsOENBQVMsR0FBVDtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxJQUFTO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsNkNBQVEsR0FBUjtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBQyxJQUFTO1lBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBL0NNLGtDQUFPLEdBQWEsQ0FBQyx3Q0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFnRDNELGlDQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQztBQXREWSxrQ0FBMEIsNkJBc0R0QyxDQUFBO0FBRUQsSUFBSSxnQkFBZ0IsR0FBOEI7SUFDakQsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFO0lBQ2hELFFBQVEsRUFBRSxPQUFPLENBQUMseUJBQXlCLENBQUM7SUFDNUMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxXQUFXO0NBQ3pCLENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx3Q0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2hELFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGdCQUFnQixDQUFDO0tBQzFDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLDBCQUEwQixDQUFDLENBQUMifQ==