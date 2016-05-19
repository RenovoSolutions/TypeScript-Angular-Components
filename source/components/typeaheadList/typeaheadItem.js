"use strict";
exports.componentName = 'rlTypeaheadListItem';
var TypeaheadItemController = (function () {
    function TypeaheadItemController($scope, $element, $compile) {
        this.$scope = $scope;
        this.$element = $element;
        this.$compile = $compile;
    }
    TypeaheadItemController.prototype.$onInit = function () {
        var itemScope = this.$scope.$parent.$new();
        var contentArea = this.$element.find('.content-target');
        if (this.transclude.isSlotFilled('listItemSlot')) {
            this.transclude(itemScope, function (template) {
                contentArea.append(template);
            }, null, 'listItemSlot');
        }
        else {
            var template = contentArea.append(require('./defaultListItem.html'));
            this.$compile(template)(itemScope);
        }
    };
    TypeaheadItemController.$inject = ['$scope', '$element', '$compile'];
    return TypeaheadItemController;
}());
exports.typeaheadItem = {
    bindings: {
        transclude: '<',
    },
    controller: TypeaheadItemController,
    template: "<div class=\"content-target\"></div>",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVhaGVhZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVXLHFCQUFhLEdBQVcscUJBQXFCLENBQUM7QUFFekQ7SUFJQyxpQ0FBb0IsTUFBc0IsRUFDL0IsUUFBa0MsRUFDbEMsUUFBaUM7UUFGeEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBSSxDQUFDO0lBRWpELHlDQUFPLEdBQVA7UUFDQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFDLFFBQWdCO2dCQUMzQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxRQUFRLEdBQVcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNGLENBQUM7SUFoQk0sK0JBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFpQi9ELDhCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUVVLHFCQUFhLEdBQThCO0lBQ3JELFFBQVEsRUFBRTtRQUNULFVBQVUsRUFBRSxHQUFHO0tBQ2Y7SUFDRCxVQUFVLEVBQUUsdUJBQXVCO0lBQ25DLFFBQVEsRUFBRSxzQ0FBb0M7Q0FDOUMsQ0FBQyJ9