'use strict';
var $ = require('jquery');
/*
 * Implementation also requires the following elements to be inserted on the page:
 *   <div class="device-xs visible-xs"></div>
 *   <div class="device-sm visible-sm"></div>
 *   <div class="device-md visible-md"></div>
 *   <div class="device-lg visible-lg"></div>
 * They have been inserted into index.html for your convenience.
 */
exports.visibleBreakpointServiceName = 'visibleBreakpoint';
var VisibleBreakpointService = (function () {
    function VisibleBreakpointService() {
    }
    VisibleBreakpointService.prototype.isVisible = function (breakpoint) {
        // jquery gets the breakpoint trigger directives listed above on line 3
        return $('.device-' + breakpoint).is(':visible');
    };
    return VisibleBreakpointService;
})();
exports.VisibleBreakpointService = VisibleBreakpointService;
//# sourceMappingURL=visibleBreakpoint.service.js.map