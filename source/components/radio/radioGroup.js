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
    RadioGroupController.$inject = ['$attrs', __object.serviceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9Hcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBSWIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFFbkIscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztBQU8zRDtJQVNDLG9CQUFvQixPQUE4QixFQUFTLElBQWE7UUFBcEQsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO0lBQUcsQ0FBQztJQVI1RSxzQkFBSSxpQ0FBUzthQUFiO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFjLEtBQVU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7SUFPRixpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksa0JBQVUsYUFVdEIsQ0FBQTtBQUVEO0lBS0MsOEJBQW9CLE1BQTZCLEVBQ3JDLE1BQStCO1FBRHZCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQ3JDLFdBQU0sR0FBTixNQUFNLENBQXlCO0lBQUcsQ0FBQztJQUUvQyxzQ0FBTyxHQUFQO1FBQ0MsSUFBSSxJQUFZLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxHQUFHLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdDLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQWZNLDRCQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBZ0I3RCwyQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksNEJBQW9CLHVCQW9CaEMsQ0FBQTtBQUVEO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO1FBQy9CLFVBQVUsRUFBRSxzQkFBYztRQUMxQixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3RCLENBQUM7QUFDSCxDQUFDO0FBUmUsa0JBQVUsYUFRekIsQ0FBQSJ9