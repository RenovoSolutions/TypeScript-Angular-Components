// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVTdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlVGltZVN0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5RUFBeUU7O0FBRXpFLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBSXhCLGtCQUFVLEdBQVcsaUNBQWlDLENBQUM7QUFDdkQscUJBQWEsR0FBVyxrQkFBa0IsQ0FBQztBQU90RCxJQUFJLHVCQUF1QixHQUE4QjtJQUN4RCxRQUFRLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0lBQzFDLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFFBQVEsRUFBRTtRQUNULFNBQVMsRUFBRSxHQUFHO1FBQ2QsV0FBVyxFQUFFLElBQUk7S0FDakI7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDIn0=