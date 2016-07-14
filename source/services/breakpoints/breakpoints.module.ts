import * as angular from 'angular';

import { visibleBreakpointServiceName, VisibleBreakpointService } from './visibleBreakpoint.service';
import { breakpointServiceName, BreakpointService } from './breakpoints.service.ng1';

export * from './breakpoint';
export * from './visibleBreakpoint.service';
export * from './breakpoints.service.ng1';

export var moduleName: string = 'rl.ui.services.breakpoints';

angular.module(moduleName, [])
	.constant('resizeDebounceMilliseconds', 500)
	.service(breakpointServiceName, BreakpointService);
