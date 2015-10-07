'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.directiveName = 'rlRadioGroup';
exports.controllerName = 'RadioGroupController';
var RadioGroup = (function () {
    function RadioGroup($scope, ngModel, name) {
        var _this = this;
        this.name = name;
        $scope.$watch(function () { return ngModel.$viewValue; }, function (value) {
            _this.selection = value;
        });
        $scope.$watch(function () { return _this.selection; }, function (value) {
            ngModel.$setViewValue(value);
        });
    }
    return RadioGroup;
})();
exports.RadioGroup = RadioGroup;
var RadioGroupController = (function () {
    function RadioGroupController($scope, $attrs, $element, object) {
        var name;
        if (!object.isNullOrWhitespace($attrs.rlRadioGroup)) {
            name = $attrs.rlRadioGroup;
        }
        else if (!object.isNullOrWhitespace($attrs.name)) {
            name = $attrs.name;
        }
        else {
            name = 'RadioGroup' + this.getNextId();
        }
        var ngModel = $element.controller('ngModel');
        this.group = new RadioGroup($scope, ngModel, name);
    }
    RadioGroupController.prototype.registerButton = function () {
        return this.group;
    };
    RadioGroupController.prototype.getNextId = function () {
        var nextId = RadioGroupController.nextId.toString();
        RadioGroupController.nextId++;
        return nextId;
    };
    RadioGroupController.nextId = 1;
    RadioGroupController.$inject = ['$scope', '$attrs', '$element', __object.serviceName];
    return RadioGroupController;
})();
exports.RadioGroupController = RadioGroupController;
function radioGroup() {
    'use strict';
    return {
        restrict: 'AE',
        require: 'ngModel',
        controller: exports.controllerName,
    };
}
exports.radioGroup = radioGroup;
//# sourceMappingURL=radioGroup.js.map