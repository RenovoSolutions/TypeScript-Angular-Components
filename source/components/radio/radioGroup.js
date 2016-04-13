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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBSWIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFFbkIscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztBQU8zRDtJQVNDLG9CQUFvQixPQUE4QixFQUFTLElBQWE7UUFBcEQsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO0lBQUcsQ0FBQztJQVI1RSxzQkFBSSxpQ0FBUzthQUFiO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFjLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7SUFPRixpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksa0JBQVUsYUFVdEIsQ0FBQTtBQUVEO0lBS0MsOEJBQW9CLE1BQWlCLEVBQ3pCLE1BQTZCLEVBQzdCLE1BQStCO1FBRnZCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7SUFBRyxDQUFDO0lBRS9DLHNDQUFPLEdBQVA7UUFDQyxJQUFJLElBQVksQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBaEJNLDRCQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQWlCdkUsMkJBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBckJZLDRCQUFvQix1QkFxQmhDLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUMvQixVQUFVLEVBQUUsc0JBQWM7UUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtLQUN0QixDQUFDO0FBQ0gsQ0FBQztBQVJlLGtCQUFVLGFBUXpCLENBQUEifQ==