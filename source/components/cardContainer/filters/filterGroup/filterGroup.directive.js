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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyR3JvdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdFQUFnRTtBQUVoRSxZQUFZLENBQUM7QUFVRixxQkFBYSxHQUFXLGVBQWUsQ0FBQztBQUN4QyxzQkFBYyxHQUFXLHVCQUF1QixDQUFDO0FBUTVEO0lBVUMsK0JBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFDQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLE1BQXFCO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUMxRCxDQUFDO0lBQ0YsQ0FBQztJQW5CTSw2QkFBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFvQnZDLDRCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQTdCWSw2QkFBcUIsd0JBNkJqQyxDQUFBO0FBRVUsbUJBQVcsR0FBOEI7SUFDbkQsUUFBUSxFQUFFLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztJQUNqRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFlBQVk7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxXQUFXLEVBQUUsR0FBRztRQUNoQixNQUFNLEVBQUUsR0FBRztLQUNYO0NBQ0QsQ0FBQyJ9