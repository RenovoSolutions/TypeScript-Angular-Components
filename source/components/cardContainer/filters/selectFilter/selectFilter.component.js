// /// <reference path='../../../../../typings/commonjs.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdEZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0VBQWdFO0FBRWhFLFlBQVksQ0FBQztBQUtiLCtCQUE2Riw0Q0FBNEMsQ0FBQyxDQUFBO0FBRS9ILHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFDekMsc0JBQWMsR0FBVyx3QkFBd0IsQ0FBQztBQW9CN0Q7SUFhQyxnQ0FBb0IsTUFBc0IsRUFDdkMsV0FBd0MsRUFDeEMsYUFBNkI7UUFmakMsaUJBb0NDO1FBdkJvQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUd6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUVqRCxXQUFXLENBQUMsVUFBQyxLQUErQjtZQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQkFBVyxpREFBYTthQUF4QjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxDQUFDO2FBQ0QsVUFBeUIsS0FBVTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUM3RCxDQUFDO1FBQ1IsQ0FBQzs7O09BUkE7SUFmTSw4QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSw0QkFBaUIsQ0FBQyxDQUFDO0lBd0IvRCw2QkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksOEJBQXNCLHlCQW9DbEMsQ0FBQTtBQUVVLG9CQUFZLEdBQThCO0lBQ3BELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7SUFDeEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFFBQVEsRUFBRTtRQUNULE1BQU0sRUFBRSxHQUFHO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsR0FBRztRQUNmLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLEdBQUc7UUFDVixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxHQUFHO1FBQ2YsTUFBTSxFQUFFLEdBQUc7UUFFWCxhQUFhO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDZDtDQUNELENBQUMifQ==