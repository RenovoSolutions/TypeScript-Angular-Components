'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
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
            name = 'RadioGroup' + this.getNextId();
        }
        this.group = new RadioGroup(this.ngModel, name);
    };
    RadioGroupController.prototype.getNextId = function () {
        var nextId = RadioGroupController.nextId.toString();
        RadioGroupController.nextId++;
        return nextId;
    };
    RadioGroupController.nextId = 1;
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