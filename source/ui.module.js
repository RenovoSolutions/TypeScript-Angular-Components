"use strict";
var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-sanitize');
require('angular-animate');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxRQUFPLHNCQUFzQixDQUFDLENBQUE7QUFDOUIsUUFBTyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzFCLFFBQU8saUJBQWlCLENBQUMsQ0FBQTtBQUV6Qiw2Q0FBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCxRQUFPLDhDQUE4QyxDQUFDLENBQUE7QUFFdEQsUUFBTyxlQUFlLENBQUMsQ0FBQTtBQUV2QixJQUFZLFNBQVMsV0FBTSw4QkFBOEIsQ0FBQyxDQUFBO0FBTWpELGlCQUFTO0FBTGxCLElBQVksVUFBVSxXQUFNLGdDQUFnQyxDQUFDLENBQUE7QUFLekMsa0JBQVU7QUFKOUIsSUFBWSxPQUFPLFdBQU0sMEJBQTBCLENBQUMsQ0FBQTtBQUlwQixlQUFPO0FBSHZDLElBQVksUUFBUSxXQUFNLDRCQUE0QixDQUFDLENBQUE7QUFHZCxnQkFBUTtBQUZqRCxJQUFZLEtBQUssV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRUssYUFBSztBQUU3QyxrQkFBVSxHQUFXLE9BQU8sQ0FBQztBQUV4QyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsY0FBYztJQUNkLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osd0NBQVMsQ0FBQyxVQUFVO0lBRXBCLFNBQVMsQ0FBQyxVQUFVO0lBQ3BCLFVBQVUsQ0FBQyxVQUFVO0lBQ3JCLE9BQU8sQ0FBQyxVQUFVO0lBQ2xCLFFBQVEsQ0FBQyxVQUFVO0NBQ25CLENBQUMsQ0FBQyJ9