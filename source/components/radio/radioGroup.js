"use strict";
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
    function RadioGroupController($attrs, object) {
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
    RadioGroupController.$inject = ['$attrs', typescript_angular_utilities_1.downgrade.objectServiceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRW5FLElBQU8sTUFBTSxHQUFHLHVDQUFRLENBQUMsSUFBSSxDQUFDO0FBRW5CLHFCQUFhLEdBQVcsY0FBYyxDQUFDO0FBQ3ZDLHNCQUFjLEdBQVcsc0JBQXNCLENBQUM7QUFPM0Q7SUFTQyxvQkFBb0IsT0FBOEIsRUFBUyxJQUFhO1FBQXBELFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUztJQUFHLENBQUM7SUFSNUUsc0JBQUksaUNBQVM7YUFBYjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBYyxLQUFVO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUpBO0lBT0YsaUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGtCQUFVLGFBVXRCLENBQUE7QUFFRDtJQUtDLDhCQUFvQixNQUE2QixFQUNyQyxNQUErQjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUNyQyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtJQUFHLENBQUM7SUFFL0Msc0NBQU8sR0FBUDtRQUNDLElBQUksSUFBWSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksR0FBRyxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFmTSw0QkFBTyxHQUFhLENBQUMsUUFBUSxFQUFFLHdDQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQWdCcEUsMkJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLDRCQUFvQix1QkFvQmhDLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUMvQixVQUFVLEVBQUUsc0JBQWM7UUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtLQUN0QixDQUFDO0FBQ0gsQ0FBQztBQVJlLGtCQUFVLGFBUXpCLENBQUEifQ==