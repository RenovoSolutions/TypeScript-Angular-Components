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
//# sourceMappingURL=radio.js.map