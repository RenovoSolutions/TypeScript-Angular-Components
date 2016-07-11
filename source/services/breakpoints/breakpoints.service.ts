import { Injectable, Inject, Provider } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { IWindowService, WindowService } from '../windowWrapper/windowWrapper.service';
import { IVisibleBreakpointService, VisibleBreakpointService } from './visibleBreakpoint.service';

import { xs, sm, md, lg } from './breakpoint';

export const breakpointServiceName: string = 'breakpoints';

export const RESIZE_DEBOUNCE_MILLISECONDS: number = 500;

export interface IBreakpointService {
	currentBreakpoint: string;
	breakpointChanges: Subject<string>;
	isBreakpoint(breakpoint: string): boolean;
}

@Injectable()
export class BreakpointService implements IBreakpointService {

	constructor(private visibleBreakpoints: VisibleBreakpointService, windowService: WindowService) {
		this.breakpointChanges = new Subject<string>();
		this.currentBreakpoint = this.getBreakpoint();

		var efficientResize: { (): void } = _.debounce(this.updateBreakpoint, RESIZE_DEBOUNCE_MILLISECONDS, {
			leading: true,
			trailing: true,
			maxWait: RESIZE_DEBOUNCE_MILLISECONDS,
		});
		windowService.resize(efficientResize);
	}

	currentBreakpoint: string;
	breakpointChanges: Subject<string>;

	private getBreakpoint(): string {
		if (this.visibleBreakpoints.isVisible(lg)) {
			return lg;
		} else if (this.visibleBreakpoints.isVisible(md)) {
			return md;
		} else if (this.visibleBreakpoints.isVisible(sm)) {
			return sm;
		} else {
			return xs;
		}
	}

	isBreakpoint(breakpoint: string): boolean {
		return this.currentBreakpoint === breakpoint;
	}

	private updateBreakpoint: { (): void } = (): void => {
		var newBreakPoint: string = this.getBreakpoint();

		if (newBreakPoint !== this.currentBreakpoint) {
			this.currentBreakpoint = newBreakPoint;
			this.breakpointChanges.next(this.currentBreakpoint);
		}
	}
}
