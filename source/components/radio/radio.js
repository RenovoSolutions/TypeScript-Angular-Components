'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFJYiwyQkFBaUQsY0FBYyxDQUFDLENBQUE7QUFFckQscUJBQWEsR0FBVyxTQUFTLENBQUM7QUFDbEMsc0JBQWMsR0FBVyxpQkFBaUIsQ0FBQztBQUV0RDtJQUFBO0lBWUEsQ0FBQztJQVBBLGlDQUFPLEdBQVA7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUM5QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNGLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksdUJBQWUsa0JBWTNCLENBQUE7QUFFVSxhQUFLLEdBQXlCO0lBQ3hDLE9BQU8sRUFBRTtRQUNSLGVBQWUsRUFBRSxpQkFBaUI7UUFDbEMsT0FBTyxFQUFFLFVBQVU7S0FDbkI7SUFDRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsd05BS1Q7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLE9BQU87SUFDckIsUUFBUSxFQUFFO1FBQ1QsS0FBSyxFQUFFLEdBQUc7S0FDVjtDQUNELENBQUMifQ==