"use strict";
var _ = require('lodash');
var rxjs_1 = require('rxjs');
var windowWrapper_service_1 = require('../windowWrapper/windowWrapper.service');
var visibleBreakpoint_service_1 = require('./visibleBreakpoint.service');
var breakpoint_1 = require('./breakpoint');
exports.breakpointServiceName = 'breakpoints';
var BreakpointService = (function () {
    function BreakpointService($rootScope, visibleBreakpoints, resizeDebounceMilliseconds, windowService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.visibleBreakpoints = visibleBreakpoints;
        this.updateBreakpoint = function () {
            var newBreakPoint = _this.getBreakpoint();
            if (newBreakPoint !== _this.currentBreakpoint) {
                _this.$rootScope.$apply(function () {
                    _this.currentBreakpoint = newBreakPoint;
                    _this.breakpointChanges.next(_this.currentBreakpoint);
                });
            }
        };
        this.breakpointChanges = new rxjs_1.Subject();
        this.currentBreakpoint = this.getBreakpoint();
        var efficientResize = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
            leading: true,
            trailing: true,
            maxWait: resizeDebounceMilliseconds,
        });
        windowService.resize(efficientResize);
    }
    BreakpointService.prototype.getBreakpoint = function () {
        if (this.visibleBreakpoints.isVisible(breakpoint_1.lg)) {
            return breakpoint_1.lg;
        }
        else if (this.visibleBreakpoints.isVisible(breakpoint_1.md)) {
            return breakpoint_1.md;
        }
        else if (this.visibleBreakpoints.isVisible(breakpoint_1.sm)) {
            return breakpoint_1.sm;
        }
        else {
            return breakpoint_1.xs;
        }
    };
    BreakpointService.prototype.isBreakpoint = function (breakpoint) {
        return this.currentBreakpoint === breakpoint;
    };
    BreakpointService.$inject = ['$rootScope', visibleBreakpoint_service_1.visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapper_service_1.serviceName];
    return BreakpointService;
}());
exports.BreakpointService = BreakpointService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLHFCQUF3QixNQUFNLENBQUMsQ0FBQTtBQUUvQixzQ0FBd0Usd0NBQXdDLENBQUMsQ0FBQTtBQUNqSCwwQ0FBd0UsNkJBQTZCLENBQUMsQ0FBQTtBQUV0RywyQkFBK0IsY0FBYyxDQUFDLENBQUE7QUFFbkMsNkJBQXFCLEdBQVcsYUFBYSxDQUFDO0FBUXpEO0lBRUMsMkJBQW9CLFVBQWdDLEVBQ3hDLGtCQUE2QyxFQUNyRCwwQkFBa0MsRUFDbEMsYUFBNkI7UUFMbEMsaUJBOENDO1FBNUNvQixlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUN4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTJCO1FBaUNqRCxxQkFBZ0IsR0FBZTtZQUN0QyxJQUFJLGFBQWEsR0FBVyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFakQsRUFBRSxDQUFDLENBQUMsYUFBYSxLQUFLLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO29CQUN0QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDO29CQUN2QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUE7UUF2Q0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksY0FBTyxFQUFVLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUU5QyxJQUFJLGVBQWUsR0FBZSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsRUFBRTtZQUMvRixPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLDBCQUEwQjtTQUNuQyxDQUFDLENBQUM7UUFDSCxhQUFhLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFLTyx5Q0FBYSxHQUFyQjtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsZUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxlQUFFLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsZUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxlQUFFLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsZUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxlQUFFLENBQUM7UUFDWCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsZUFBRSxDQUFDO1FBQ1gsQ0FBQztJQUNGLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsVUFBa0I7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLENBQUM7SUFDOUMsQ0FBQztJQWpDTSx5QkFBTyxHQUFhLENBQUMsWUFBWSxFQUFFLHdEQUE0QixFQUFFLDRCQUE0QixFQUFFLG1DQUF3QixDQUFDLENBQUE7SUE2Q2hJLHdCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQztBQTlDWSx5QkFBaUIsb0JBOEM3QixDQUFBIn0=