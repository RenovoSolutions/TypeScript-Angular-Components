'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __guid = typescript_angular_utilities_1.services.guid;
exports.directiveName = 'rlRadioGroup';
exports.controllerName = 'RadioGroupController';
var RadioGroup = (function () {
    function RadioGroup(ngModel, name) {
        this.ngModel = ngModel;
        this.name = name;
    }
    Object.defineProperty(RadioGroup.prototype, "selection", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    return RadioGroup;
}());
exports.RadioGroup = RadioGroup;
var RadioGroupController = (function () {
    function RadioGroupController($scope, $attrs, object) {
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.object = object;
    }
    RadioGroupController.prototype.$onInit = function () {
        var name;
        if (!this.object.isNullOrWhitespace(this.$attrs.rlRadioGroup)) {
            name = this.$attrs.rlRadioGroup;
        }
        else if (!this.object.isNullOrWhitespace(this.$attrs.name)) {
            name = this.$attrs.name;
        }
        else {
            name = 'RadioGroup-' + __guid.guid.random();
        }
        this.group = new RadioGroup(this.ngModel, name);
    };
    RadioGroupController.$inject = ['$scope', '$attrs', __object.serviceName];
    return RadioGroupController;
}());
exports.RadioGroupController = RadioGroupController;
function radioGroup() {
    'use strict';
    return {
        restrict: 'AE',
        require: { ngModel: 'ngModel' },
        controller: exports.controllerName,
        bindToController: true,
    };
}
exports.radioGroup = radioGroup;
//# sourceMappingURL=radioGroup.js.map