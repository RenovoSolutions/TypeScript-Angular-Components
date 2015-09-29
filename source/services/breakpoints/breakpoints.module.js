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
//# sourceMappingURL=breakpoints.module.js.map