'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var windowWrapper_service_1 = require('../windowWrapper/windowWrapper.service');
var visibleBreakpoint_service_1 = require('./visibleBreakpoint.service');
var breakpoints_service_1 = require('./breakpoints.service');
__export(require('./breakpoint'));
__export(require('./visibleBreakpoint.service'));
__export(require('./breakpoints.service'));
exports.moduleName = 'rl.ui.services.breakpoints';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.services.observable.moduleName,
    windowWrapper_service_1.moduleName,
])
    .constant('resizeDebounceMilliseconds', 500)
    .service(visibleBreakpoint_service_1.visibleBreakpointServiceName, visibleBreakpoint_service_1.VisibleBreakpointService)
    .service(breakpoints_service_1.breakpointServiceName, breakpoints_service_1.BreakpointService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnJlYWtwb2ludHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELHNDQUFzRCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9GLDBDQUF1RSw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3JHLG9DQUF5RCx1QkFBdUIsQ0FBQyxDQUFBO0FBRWpGLGlCQUFjLGNBQWMsQ0FBQyxFQUFBO0FBQzdCLGlCQUFjLDZCQUE2QixDQUFDLEVBQUE7QUFDNUMsaUJBQWMsdUJBQXVCLENBQUMsRUFBQTtBQUUzQixrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQix1Q0FBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVO0lBQzlCLGtDQUF1QjtDQUN2QixDQUFDO0tBQ0EsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQztLQUMzQyxPQUFPLENBQUMsd0RBQTRCLEVBQUUsb0RBQXdCLENBQUM7S0FDL0QsT0FBTyxDQUFDLDJDQUFxQixFQUFFLHVDQUFpQixDQUFDLENBQUMifQ==