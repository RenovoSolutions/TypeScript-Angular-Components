import { BreakpointService } from './breakpoints.service';
import { VisibleBreakpointService } from './visibleBreakpoint.service';

export const BREAKPOINT_PROVIDERS: any[] = [
	BreakpointService,
	VisibleBreakpointService
];

export * from  './breakpoint';
export * from  './breakpoints.service';
export * from './visibleBreakpoint.service';