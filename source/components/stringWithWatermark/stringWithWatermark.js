'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.stringWithWatermark';
exports.componentName = 'rlStringWithWatermark';
var stringWithWatermark = {
    template: "\n\t\t<rl-generic-container selector=\"controller.string | isEmpty\">\n\t\t\t<template when-selector=\"true\"><span class=\"watermark\">{{controller.watermark}}</span></template>\n\t\t\t<template default><span>{{controller.string}}</span></template>\n\t\t</rl-generic-container>\n\t",
    controllerAs: 'controller',
    bindings: {
        string: '@',
        watermark: '@',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, stringWithWatermark);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nV2l0aFdhdGVybWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmluZ1dpdGhXYXRlcm1hcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyxzQ0FBc0MsQ0FBQztBQUM1RCxxQkFBYSxHQUFXLHVCQUF1QixDQUFDO0FBTzdELElBQU0sbUJBQW1CLEdBQThCO0lBQ3RELFFBQVEsRUFBRSw0UkFLVDtJQUNELFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULE1BQU0sRUFBRSxHQUFHO1FBQ1gsU0FBUyxFQUFFLEdBQUc7S0FDZDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==