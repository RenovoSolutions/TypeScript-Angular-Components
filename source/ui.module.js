'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLFFBQU8sc0JBQXNCLENBQUMsQ0FBQTtBQUM5QixRQUFPLGtCQUFrQixDQUFDLENBQUE7QUFFMUIsNkNBQTBCLDhCQUE4QixDQUFDLENBQUE7QUFFekQsUUFBTyw4Q0FBOEMsQ0FBQyxDQUFBO0FBRXRELFFBQU8sZUFBZSxDQUFDLENBQUE7QUFFdkIsSUFBWSxTQUFTLFdBQU0sOEJBQThCLENBQUMsQ0FBQTtBQU1qRCxpQkFBUztBQUxsQixJQUFZLFVBQVUsV0FBTSxnQ0FBZ0MsQ0FBQyxDQUFBO0FBS3pDLGtCQUFVO0FBSjlCLElBQVksT0FBTyxXQUFNLDBCQUEwQixDQUFDLENBQUE7QUFJcEIsZUFBTztBQUh2QyxJQUFZLFFBQVEsV0FBTSw0QkFBNEIsQ0FBQyxDQUFBO0FBR2QsZ0JBQVE7QUFGakQsSUFBWSxLQUFLLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUVLLGFBQUs7QUFFN0Msa0JBQVUsR0FBVyxPQUFPLENBQUM7QUFFeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsWUFBWTtJQUNaLHdDQUFTLENBQUMsVUFBVTtJQUVwQixTQUFTLENBQUMsVUFBVTtJQUNwQixVQUFVLENBQUMsVUFBVTtJQUNyQixPQUFPLENBQUMsVUFBVTtJQUNsQixRQUFRLENBQUMsVUFBVTtDQUNuQixDQUFDLENBQUMifQ==