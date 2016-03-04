'use strict';
var radioGroup_1 = require('./radioGroup');
exports.directiveName = 'rlRadio';
exports.controllerName = 'RadioController';
var RadioController = (function () {
    function RadioController($scope, $element) {
        var radioGroupController = $element.controller('rlRadioGroup');
        if (radioGroupController != null) {
            this.radioGroup = radioGroupController.registerButton();
        }
        else {
            var ngModel = $element.controller('ngModel');
            this.radioGroup = new radioGroup_1.RadioGroup($scope, ngModel);
        }
    }
    RadioController.$inject = ['$scope', '$element'];
    return RadioController;
})();
exports.RadioController = RadioController;
function radio() {
    'use strict';
    return {
        restrict: 'E',
        require: ['?^^rlRadioGroup', '?ngModel'],
        transclude: true,
        template: "\n\t\t\t<label>\n\t\t\t\t<input id=\"radio\" type=\"radio\" name=\"{{radio.radioGroup.name}}\" ng-model=\"radio.radioGroup.selection\" ng-value=\"radio.value\" />\n\t\t\t\t<span ng-transclude></div>\n\t\t\t</label>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'radio',
        scope: true,
        bindToController: {
            value: '=',
        },
    };
}
exports.radio = radio;
//# sourceMappingURL=radio.js.map