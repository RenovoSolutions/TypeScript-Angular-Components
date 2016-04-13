'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var windowWrapper_service_1 = require('../windowWrapper/windowWrapper.service');
var visibleBreakpoint_service_1 = require('./visibleBreakpoint.service');
var breakpoint_1 = require('./breakpoint');
exports.breakpointServiceName = 'breakpoints';
var __observable = typescript_angular_utilities_1.services.observable;
var BreakpointService = (function () {
    function BreakpointService($rootScope, visibleBreakpoints, resizeDebounceMilliseconds, windowService, observableFactory) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.visibleBreakpoints = visibleBreakpoints;
        this.updateBreakpoint = function () {
            var newBreakPoint = _this.getBreakpoint();
            if (newBreakPoint !== _this.currentBreakpoint) {
                _this.$rootScope.$apply(function () {
                    _this.currentBreakpoint = newBreakPoint;
                    _this.observable.fire('window.breakpointChanged', _this.currentBreakpoint);
                });
            }
        };
        this.currentBreakpoint = this.getBreakpoint();
        this.observable = observableFactory.getInstance();
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
    BreakpointService.prototype.register = function (action) {
        return this.observable.register(action, 'window.breakpointChanged');
    };
    BreakpointService.$inject = ['$rootScope', visibleBreakpoint_service_1.visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapper_service_1.serviceName, __observable.factoryName];
    return BreakpointService;
}());
exports.BreakpointService = BreakpointService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyZWFrcG9pbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsc0NBQXdFLHdDQUF3QyxDQUFDLENBQUE7QUFDakgsMENBQXdFLDZCQUE2QixDQUFDLENBQUE7QUFFdEcsMkJBQStCLGNBQWMsQ0FBQyxDQUFBO0FBRW5DLDZCQUFxQixHQUFXLGFBQWEsQ0FBQztBQUV6RCxJQUFPLFlBQVksR0FBRyx1Q0FBUSxDQUFDLFVBQVUsQ0FBQztBQVExQztJQUVDLDJCQUFvQixVQUFnQyxFQUN4QyxrQkFBNkMsRUFDckQsMEJBQWtDLEVBQ2xDLGFBQTZCLEVBQzdCLGlCQUF5RDtRQU45RCxpQkFvREM7UUFsRG9CLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMkI7UUF1Q2pELHFCQUFnQixHQUFlO1lBQ3RDLElBQUksYUFBYSxHQUFXLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVqRCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDOUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRSxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUE7UUE1Q0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxELElBQUksZUFBZSxHQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLDBCQUEwQixFQUFFO1lBQy9GLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsMEJBQTBCO1NBQ25DLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUtPLHlDQUFhLEdBQXJCO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxlQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLGVBQUUsQ0FBQztRQUNYLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxlQUFFLENBQUM7UUFDWCxDQUFDO0lBQ0YsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBYSxVQUFrQjtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLFVBQVUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLE1BQXNDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBdkNNLHlCQUFPLEdBQWEsQ0FBQyxZQUFZLEVBQUUsd0RBQTRCLEVBQUUsNEJBQTRCLEVBQUUsbUNBQXdCLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBbUQxSix3QkFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFkseUJBQWlCLG9CQW9EN0IsQ0FBQSJ9