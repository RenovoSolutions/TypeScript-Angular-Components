// /// <reference path='../../../../../../typings/commonjs.d.ts' />
"use strict";
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
exports.componentName = 'rlFilterOption';
var filterOption = {
    template: require('./filterOption.html'),
    controllerAs: 'filter',
    bindings: {
        activate: '&',
        isActive: '=active',
        option: '=',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, filterOption);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyT3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyT3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1FQUFtRTs7QUFFbkUsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyxpRUFBaUUsQ0FBQztBQUN2RixxQkFBYSxHQUFXLGdCQUFnQixDQUFDO0FBRXBELElBQUksWUFBWSxHQUE4QjtJQUM3QyxRQUFRLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0lBQ3hDLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFFBQVEsRUFBRTtRQUNULFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLFNBQVM7UUFDbkIsTUFBTSxFQUFFLEdBQUc7S0FDWDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDIn0=