"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZUJyZWFrcG9pbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpc2libGVCcmVha3BvaW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCOzs7Ozs7O0dBT0c7QUFFUSxvQ0FBNEIsR0FBVyxtQkFBbUIsQ0FBQztBQU10RTtJQUFBO0lBS0EsQ0FBQztJQUpBLDRDQUFTLEdBQVQsVUFBVSxVQUFrQjtRQUMzQix1RUFBdUU7UUFDdkUsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRiwrQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksZ0NBQXdCLDJCQUtwQyxDQUFBIn0=