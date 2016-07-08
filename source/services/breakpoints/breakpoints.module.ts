import * as angular from 'angular';

import { moduleName as windowWrapperModuleName } from '../windowWrapper/windowWrapper.service';
import { visibleBreakpointServiceName, VisibleBreakpointService } from './visibleBreakpoint.service';
import { breakpointServiceName, BreakpointService } from './breakpoints.service.ng1';

export * from './breakpoint';
export * from './visibleBreakpoint.service';
export * from './breakpoints.service.ng1';

export var moduleName: string = 'rl.ui.services.breakpoints';

angular.module(moduleName, [
	windowWrapperModuleName,
])
	.constant('resizeDebounceMilliseconds', 500)
	.service(visibleBreakpointServiceName, VisibleBreakpointService)
	.service(breakpointServiceName, BreakpointService);
