import { Injectable, Inject, Provider } from '@angular/core';
import { jqueryToken } from '../jquery/jquery.provider';

/*
 * Implementation also requires the following elements to be inserted on the page:
 *   <div class="device-xs visible-xs"></div>
 *   <div class="device-sm visible-sm"></div>
 *   <div class="device-md visible-md"></div>
 *   <div class="device-lg visible-lg"></div>
 * They have been inserted into index.html for your convenience.
 */

export var visibleBreakpointServiceName: string = 'visibleBreakpoint';

export interface IVisibleBreakpointService {
	isVisible(breakpoint: string): boolean;
}

@Injectable()
export class VisibleBreakpointService implements IVisibleBreakpointService {
	jquery: JQueryStatic;

	constructor( @Inject(jqueryToken) jquery: JQueryStatic) {
		this.jquery = jquery;
	}

	isVisible(breakpoint: string): boolean {
		return this.jquery(`.device-${breakpoint}`).is(':visible');
	}
}
