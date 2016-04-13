// /// <reference path='../../../../../typings/commonjs.d.ts' />
'use strict';
exports.componentName = 'rlSelectFilter';
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
exports.selectFilter = {
    template: require('./selectFilter.html'),
    controller: exports.controllerName,
    controllerAs: 'filter',
    bindings: {
        filter: '<',
        options: '<?',
        getOptions: '&',
        source: '<?',
        label: '@',
        selector: '<?',
        nullOption: '@'
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdEZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0VBQWdFO0FBRWhFLFlBQVksQ0FBQztBQU1GLHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFDekMsc0JBQWMsR0FBVyx3QkFBd0IsQ0FBQztBQWtCN0Q7SUFVQyxnQ0FBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBSSxDQUFDO0lBRS9DLHNCQUFXLGlEQUFhO2FBQXhCO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ2xDLENBQUM7YUFDRCxVQUF5QixDQUFNO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsQ0FBQztZQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQzdELENBQUM7UUFDUixDQUFDOzs7T0FSQTtJQUxNLDhCQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQWM3Qiw2QkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksOEJBQXNCLHlCQXVCbEMsQ0FBQTtBQUVVLG9CQUFZLEdBQThCO0lBQ3BELFFBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7SUFDeEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFFBQVEsRUFBRTtRQUNULE1BQU0sRUFBRSxHQUFHO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsR0FBRztRQUNmLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLEdBQUc7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxHQUFHO0tBQ2Y7Q0FDRCxDQUFDIn0=