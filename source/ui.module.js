"use strict";
var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-sanitize');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
require('../libraries/angular-bootstrap-slider/slider');
require('signature_pad');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var components = require('./components/components.module');
exports.components = components;
var filters = require('./filters/filters.module');
exports.filters = filters;
var services = require('./services/services.module');
exports.services = services;
var types = require('./types/types.module');
exports.types = types;
exports.moduleName = 'rl.ui';
angular.module(exports.moduleName, [
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'ngSanitize',
    typescript_angular_utilities_1.downgrade.moduleName,
    behaviors.moduleName,
    components.moduleName,
    filters.moduleName,
    services.moduleName,
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxRQUFPLHNCQUFzQixDQUFDLENBQUE7QUFDOUIsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBRTFCLDZDQUEwQiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXpELFFBQU8sOENBQThDLENBQUMsQ0FBQTtBQUV0RCxRQUFPLGVBQWUsQ0FBQyxDQUFBO0FBRXZCLElBQVksU0FBUyxXQUFNLDhCQUE4QixDQUFDLENBQUE7QUFNakQsaUJBQVM7QUFMbEIsSUFBWSxVQUFVLFdBQU0sZ0NBQWdDLENBQUMsQ0FBQTtBQUt6QyxrQkFBVTtBQUo5QixJQUFZLE9BQU8sV0FBTSwwQkFBMEIsQ0FBQyxDQUFBO0FBSXBCLGVBQU87QUFIdkMsSUFBWSxRQUFRLFdBQU0sNEJBQTRCLENBQUMsQ0FBQTtBQUdkLGdCQUFRO0FBRmpELElBQVksS0FBSyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFFSyxhQUFLO0FBRTdDLGtCQUFVLEdBQVcsT0FBTyxDQUFDO0FBRXhDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWix3Q0FBUyxDQUFDLFVBQVU7SUFFcEIsU0FBUyxDQUFDLFVBQVU7SUFDcEIsVUFBVSxDQUFDLFVBQVU7SUFDckIsT0FBTyxDQUFDLFVBQVU7SUFDbEIsUUFBUSxDQUFDLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDIn0=