'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var windowWrapper_service_1 = require('../windowWrapper/windowWrapper.service');
var visibleBreakpoint_service_1 = require('./visibleBreakpoint.service');
var breakpoints_service_1 = require('./breakpoints.service');
__export(require('./breakpoint'));
__export(require('./visibleBreakpoint.service'));
__export(require('./breakpoints.service'));
exports.moduleName = 'rl.ui.services.breakpoints';
angular.module(exports.moduleName, [
    windowWrapper_service_1.moduleName,
])
    .constant('resizeDebounceMilliseconds', 500)
    .service(visibleBreakpoint_service_1.visibleBreakpointServiceName, visibleBreakpoint_service_1.VisibleBreakpointService)
    .service(breakpoints_service_1.breakpointServiceName, breakpoints_service_1.BreakpointService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnJlYWtwb2ludHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLHNDQUFzRCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9GLDBDQUF1RSw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3JHLG9DQUF5RCx1QkFBdUIsQ0FBQyxDQUFBO0FBRWpGLGlCQUFjLGNBQWMsQ0FBQyxFQUFBO0FBQzdCLGlCQUFjLDZCQUE2QixDQUFDLEVBQUE7QUFDNUMsaUJBQWMsdUJBQXVCLENBQUMsRUFBQTtBQUUzQixrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQixrQ0FBdUI7Q0FDdkIsQ0FBQztLQUNBLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLENBQUM7S0FDM0MsT0FBTyxDQUFDLHdEQUE0QixFQUFFLG9EQUF3QixDQUFDO0tBQy9ELE9BQU8sQ0FBQywyQ0FBcUIsRUFBRSx1Q0FBaUIsQ0FBQyxDQUFDIn0=