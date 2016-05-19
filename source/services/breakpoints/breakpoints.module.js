"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnJlYWtwb2ludHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxzQ0FBc0Qsd0NBQXdDLENBQUMsQ0FBQTtBQUMvRiwwQ0FBdUUsNkJBQTZCLENBQUMsQ0FBQTtBQUNyRyxvQ0FBeUQsdUJBQXVCLENBQUMsQ0FBQTtBQUVqRixpQkFBYyxjQUFjLENBQUMsRUFBQTtBQUM3QixpQkFBYyw2QkFBNkIsQ0FBQyxFQUFBO0FBQzVDLGlCQUFjLHVCQUF1QixDQUFDLEVBQUE7QUFFM0Isa0JBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUU3RCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsa0NBQXVCO0NBQ3ZCLENBQUM7S0FDQSxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxDQUFDO0tBQzNDLE9BQU8sQ0FBQyx3REFBNEIsRUFBRSxvREFBd0IsQ0FBQztLQUMvRCxPQUFPLENBQUMsMkNBQXFCLEVBQUUsdUNBQWlCLENBQUMsQ0FBQyJ9