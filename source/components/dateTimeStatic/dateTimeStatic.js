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
//# sourceMappingURL=dateTimeStatic.js.map