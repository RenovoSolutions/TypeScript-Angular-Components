// /// <reference path='../../../../../typings/commonjs.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyR3JvdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdFQUFnRTs7QUFRckQscUJBQWEsR0FBVyxlQUFlLENBQUM7QUFDeEMsc0JBQWMsR0FBVyx1QkFBdUIsQ0FBQztBQVE1RDtJQVVDLCtCQUFvQixNQUFzQjtRQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0MsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDeEMsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxNQUFxQjtRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDMUQsQ0FBQztJQUNGLENBQUM7SUFuQk0sNkJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBb0J2Qyw0QkFBQztBQUFELENBQUMsQUE3QkQsSUE2QkM7QUE3QlksNkJBQXFCLHdCQTZCakMsQ0FBQTtBQUVVLG1CQUFXLEdBQThCO0lBQ25ELFFBQVEsRUFBRSxPQUFPLENBQUMsOEJBQThCLENBQUM7SUFDakQsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxHQUFHO1FBQ1QsV0FBVyxFQUFFLEdBQUc7UUFDaEIsTUFBTSxFQUFFLEdBQUc7S0FDWDtDQUNELENBQUMifQ==