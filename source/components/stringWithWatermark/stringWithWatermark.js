"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nV2l0aFdhdGVybWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmluZ1dpdGhXYXRlcm1hcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXRCLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFDNUQscUJBQWEsR0FBVyx1QkFBdUIsQ0FBQztBQU83RCxJQUFNLG1CQUFtQixHQUE4QjtJQUN0RCxRQUFRLEVBQUUsNFJBS1Q7SUFDRCxZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUU7UUFDVCxNQUFNLEVBQUUsR0FBRztRQUNYLFNBQVMsRUFBRSxHQUFHO0tBQ2Q7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIn0=