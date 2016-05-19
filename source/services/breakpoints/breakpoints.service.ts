import * as ng from 'angular';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { IWindowService, serviceName as windowWrapperServiceName } from '../windowWrapper/windowWrapper.service';
import { IVisibleBreakpointService, visibleBreakpointServiceName } from './visibleBreakpoint.service';

import { xs, sm, md, lg } from './breakpoint';

export var breakpointServiceName: string = 'breakpoints';

export interface IBreakpointService {
	currentBreakpoint: string;
	breakpointChanges: Subject<string>;
	isBreakpoint(breakpoint: string): boolean;
}

export class BreakpointService implements IBreakpointService {
	static $inject: string[] = ['$rootScope', visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapperServiceName]
	constructor(private $rootScope: ng.IRootScopeService
			, private visibleBreakpoints: IVisibleBreakpointService
			, resizeDebounceMilliseconds: number
			, windowService: IWindowService) {
		this.breakpointChanges = new Subject<string>();
		this.currentBreakpoint = this.getBreakpoint();

		var efficientResize: {(): void} = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
			leading: true,
			trailing: true,
			maxWait: resizeDebounceMilliseconds,
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

	private updateBreakpoint: {(): void} = (): void => {
		var newBreakPoint: string = this.getBreakpoint();

		if (newBreakPoint !== this.currentBreakpoint) {
			this.$rootScope.$apply((): void => {
				this.currentBreakpoint = newBreakPoint;
				this.breakpointChanges.next(this.currentBreakpoint);
			});
		}
	}
}
