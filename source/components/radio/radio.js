'use strict';
var radioGroup_1 = require('./radioGroup');
exports.componentName = 'rlRadio';
exports.controllerName = 'RadioController';
var RadioController = (function () {
    function RadioController($scope) {
        this.$scope = $scope;
    }
    RadioController.prototype.$onInit = function () {
        if (this.groupController != null) {
            this.radioGroup = this.groupController.group;
        }
        else {
            this.radioGroup = new radioGroup_1.RadioGroup(this.ngModel);
        }
    };
    RadioController.$inject = ['$scope'];
    return RadioController;
}());
exports.RadioController = RadioController;
exports.radio = {
    require: {
        groupController: '?^^rlRadioGroup',
        ngModel: '?ngModel',
    },
    transclude: true,
    template: "\n\t\t<label>\n\t\t\t<input id=\"radio\" type=\"radio\" name=\"{{::radio.radioGroup.name}}\" ng-model=\"radio.radioGroup.selection\" ng-value=\"::radio.value\" />\n\t\t\t<span ng-transclude></div>\n\t\t</label>\n\t",
    controller: exports.controllerName,
    controllerAs: 'radio',
    bindings: {
        value: '<',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFJYiwyQkFBaUQsY0FBYyxDQUFDLENBQUE7QUFFckQscUJBQWEsR0FBVyxTQUFTLENBQUM7QUFDbEMsc0JBQWMsR0FBVyxpQkFBaUIsQ0FBQztBQUV0RDtJQU1DLHlCQUFvQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUksQ0FBQztJQUUxQyxpQ0FBTyxHQUFQO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDRixDQUFDO0lBVE0sdUJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBVXZDLHNCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSx1QkFBZSxrQkFlM0IsQ0FBQTtBQUVVLGFBQUssR0FBeUI7SUFDeEMsT0FBTyxFQUFFO1FBQ1IsZUFBZSxFQUFFLGlCQUFpQjtRQUNsQyxPQUFPLEVBQUUsVUFBVTtLQUNuQjtJQUNELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSx3TkFLVDtJQUNELFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsT0FBTztJQUNyQixRQUFRLEVBQUU7UUFDVCxLQUFLLEVBQUUsR0FBRztLQUNWO0NBQ0QsQ0FBQyJ9