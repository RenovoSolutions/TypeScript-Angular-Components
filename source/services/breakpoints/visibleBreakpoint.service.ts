// uses typings/jquery

// /// <reference path='../../typings/jquery/jquery.d.ts' />

/*
 * Implementation also requires the following elements to be inserted on the page:
 *   <div class="device-xs visible-xs"></div>
 *   <div class="device-sm visible-sm"></div>
 *   <div class="device-md visible-md"></div>
 *   <div class="device-lg visible-lg"></div>
 * They have been inserted into index.html for your convenience.
 */

module rl.ui.services.breakpoints {
	'use strict';
	
	export var visibleBreakpointServiceName: string = 'visibleBreakpoint';
	
	export interface IVisibleBreakpointService {
		isVisible(breakpoint: string): boolean;
	}
	
	export class VisibleBreakpointService implements IVisibleBreakpointService {
		isVisible(breakpoint: string): boolean {
			// jquery gets the breakpoint trigger directives listed above on line 3
			return $('.device-' + breakpoint).is(':visible');
		}
	}
}
