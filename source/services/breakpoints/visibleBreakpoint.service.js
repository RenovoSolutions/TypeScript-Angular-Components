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
}());
exports.VisibleBreakpointService = VisibleBreakpointService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZUJyZWFrcG9pbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpc2libGVCcmVha3BvaW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUI7Ozs7Ozs7R0FPRztBQUVRLG9DQUE0QixHQUFXLG1CQUFtQixDQUFDO0FBTXRFO0lBQUE7SUFLQSxDQUFDO0lBSkEsNENBQVMsR0FBVCxVQUFVLFVBQWtCO1FBQzNCLHVFQUF1RTtRQUN2RSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNGLCtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSxnQ0FBd0IsMkJBS3BDLENBQUEifQ==