"use strict";
var radioGroup_1 = require('./radioGroup');
exports.componentName = 'rlRadio';
exports.controllerName = 'RadioController';
var RadioController = (function () {
    function RadioController() {
    }
    RadioController.prototype.$onInit = function () {
        if (this.groupController != null) {
            this.radioGroup = this.groupController.group;
        }
        else {
            this.radioGroup = new radioGroup_1.RadioGroup(this.ngModel);
        }
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsMkJBQWlELGNBQWMsQ0FBQyxDQUFBO0FBRXJELHFCQUFhLEdBQVcsU0FBUyxDQUFDO0FBQ2xDLHNCQUFjLEdBQVcsaUJBQWlCLENBQUM7QUFFdEQ7SUFBQTtJQVlBLENBQUM7SUFQQSxpQ0FBTyxHQUFQO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDRixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLHVCQUFlLGtCQVkzQixDQUFBO0FBRVUsYUFBSyxHQUF5QjtJQUN4QyxPQUFPLEVBQUU7UUFDUixlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ25CO0lBQ0QsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLHdOQUtUO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFFBQVEsRUFBRTtRQUNULEtBQUssRUFBRSxHQUFHO0tBQ1Y7Q0FDRCxDQUFDIn0=