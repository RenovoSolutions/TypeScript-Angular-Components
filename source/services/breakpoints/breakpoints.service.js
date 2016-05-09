'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIscUJBQXdCLE1BQU0sQ0FBQyxDQUFBO0FBRS9CLHNDQUF3RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2pILDBDQUF3RSw2QkFBNkIsQ0FBQyxDQUFBO0FBRXRHLDJCQUErQixjQUFjLENBQUMsQ0FBQTtBQUVuQyw2QkFBcUIsR0FBVyxhQUFhLENBQUM7QUFRekQ7SUFFQywyQkFBb0IsVUFBZ0MsRUFDeEMsa0JBQTZDLEVBQ3JELDBCQUFrQyxFQUNsQyxhQUE2QjtRQUxsQyxpQkE4Q0M7UUE1Q29CLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUFpQ2pELHFCQUFnQixHQUFlO1lBQ3RDLElBQUksYUFBYSxHQUFXLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVqRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUMsQ0FBQTtRQXZDQSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxjQUFPLEVBQVUsQ0FBQztRQUMvQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRTlDLElBQUksZUFBZSxHQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFO1lBQy9GLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsMEJBQTBCO1NBQ25DLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUtPLHlDQUFhLEdBQXJCO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxlQUFFLENBQUM7UUFDWCxDQUFDO0lBQ0YsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBYSxVQUFrQjtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLFVBQVUsQ0FBQztJQUM5QyxDQUFDO0lBakNNLHlCQUFPLEdBQWEsQ0FBQyxZQUFZLEVBQUUsd0RBQTRCLEVBQUUsNEJBQTRCLEVBQUUsbUNBQXdCLENBQUMsQ0FBQTtJQTZDaEksd0JBQUM7QUFBRCxDQUFDLEFBOUNELElBOENDO0FBOUNZLHlCQUFpQixvQkE4QzdCLENBQUEifQ==