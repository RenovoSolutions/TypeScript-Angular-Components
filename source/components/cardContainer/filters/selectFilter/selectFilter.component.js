// /// <reference path='../../../../../typings/commonjs.d.ts' />
"use strict";
var jquery_service_1 = require('../../../../services/jquery/jquery.service');
exports.componentName = 'rlSelectFilter';
exports.controllerName = 'SelectFilterController';
var SelectFilterController = (function () {
    function SelectFilterController($scope, $transclude, jqueryUtility) {
        var _this = this;
        this.$scope = $scope;
        this.transform = this.transform || this.selector;
        $transclude(function (clone) {
            if (clone.length) {
                _this.template = jqueryUtility.getHtml(clone);
            }
        });
    }
    Object.defineProperty(SelectFilterController.prototype, "selectedValue", {
        get: function () {
            return this.filter.selectedValue;
        },
        set: function (value) {
            this.filter.selectedValue = value;
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
    SelectFilterController.$inject = ['$scope', '$transclude', jquery_service_1.serviceName];
    return SelectFilterController;
}());
exports.SelectFilterController = SelectFilterController;
exports.selectFilter = {
    transclude: true,
    template: require('./selectFilter.html'),
    controller: exports.controllerName,
    controllerAs: 'filter',
    bindings: {
        filter: '<',
        options: '<?',
        getOptions: '&',
        source: '<?',
        label: '@',
        transform: '<?',
        nullOption: '@',
        itemAs: '@',
        // deprecated
        selector: '<?',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdEZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0VBQWdFOztBQUtoRSwrQkFBNkYsNENBQTRDLENBQUMsQ0FBQTtBQUUvSCxxQkFBYSxHQUFXLGdCQUFnQixDQUFDO0FBQ3pDLHNCQUFjLEdBQVcsd0JBQXdCLENBQUM7QUFvQjdEO0lBYUMsZ0NBQW9CLE1BQXNCLEVBQ3ZDLFdBQXdDLEVBQ3hDLGFBQTZCO1FBZmpDLGlCQW9DQztRQXZCb0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFHekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFakQsV0FBVyxDQUFDLFVBQUMsS0FBK0I7WUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQVcsaURBQWE7YUFBeEI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDbEMsQ0FBQzthQUNELFVBQXlCLEtBQVU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDN0QsQ0FBQztRQUNSLENBQUM7OztPQVJBO0lBZk0sOEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsNEJBQWlCLENBQUMsQ0FBQztJQXdCL0QsNkJBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLDhCQUFzQix5QkFvQ2xDLENBQUE7QUFFVSxvQkFBWSxHQUE4QjtJQUNwRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0lBQ3hDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsUUFBUTtJQUN0QixRQUFRLEVBQUU7UUFDVCxNQUFNLEVBQUUsR0FBRztRQUNYLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLEdBQUc7UUFDZixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxHQUFHO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsR0FBRztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBRVgsYUFBYTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2Q7Q0FDRCxDQUFDIn0=