'use strict';
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
var angular = require('angular');
exports.moduleName = 'rl.ui.components.dateTimeStatic';
exports.componentName = 'rlDateTimeStatic';
var dateTimeStaticComponent = {
    template: require('./dateTimeStatic.html'),
    controllerAs: 'view',
    bindings: {
        dateValue: '<',
        includeTime: '<?',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, dateTimeStaticComponent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVTdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlVGltZVN0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYix5RUFBeUU7QUFFekUsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFJeEIsa0JBQVUsR0FBVyxpQ0FBaUMsQ0FBQztBQUN2RCxxQkFBYSxHQUFXLGtCQUFrQixDQUFDO0FBT3RELElBQUksdUJBQXVCLEdBQThCO0lBQ3hELFFBQVEsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUM7SUFDMUMsWUFBWSxFQUFFLE1BQU07SUFDcEIsUUFBUSxFQUFFO1FBQ1QsU0FBUyxFQUFFLEdBQUc7UUFDZCxXQUFXLEVBQUUsSUFBSTtLQUNqQjtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLHVCQUF1QixDQUFDLENBQUMifQ==