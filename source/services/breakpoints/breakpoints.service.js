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
})();
exports.BreakpointService = BreakpointService;
//# sourceMappingURL=breakpoints.service.js.map