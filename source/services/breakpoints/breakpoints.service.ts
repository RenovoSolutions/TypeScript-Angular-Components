'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import { IWindowService, serviceName as windowWrapperServiceName } from '../windowWrapper/windowWrapper.service';
import { IVisibleBreakpointService, visibleBreakpointServiceName } from './visibleBreakpoint.service';

import { xs, sm, md, lg } from './breakpoint';

export var breakpointServiceName: string = 'breakpoints';

import __observable = services.observable;

export interface IBreakpointService {
	currentBreakpoint: string;
	isBreakpoint(breakpoint: string): boolean;
	register(action: {(breakpoint: string): void}): __observable.IUnregisterFunction;
}

export class BreakpointService implements IBreakpointService {
	static $inject: string[] = ['$rootScope', visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapperServiceName, __observable.factoryName]
	constructor(private $rootScope: ng.IRootScopeService
			, private visibleBreakpoints: IVisibleBreakpointService
			, resizeDebounceMilliseconds: number
			, windowService: IWindowService
			, observableFactory: __observable.IObservableServiceFactory) {
		this.currentBreakpoint = this.getBreakpoint();

		this.observable = observableFactory.getInstance();

		var efficientResize: {(): void} = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
			leading: true,
			trailing: true,
			maxWait: resizeDebounceMilliseconds,
		});
		windowService.resize(efficientResize);
	}

	private observable: __observable.IObservableService;
	currentBreakpoint: string;

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

	register(action: { (breakpoint: string): void }): __observable.IUnregisterFunction {
		return this.observable.register(action, 'window.breakpointChanged');
	}

	private updateBreakpoint: {(): void} = (): void => {
		var newBreakPoint: string = this.getBreakpoint();

		if (newBreakPoint !== this.currentBreakpoint) {
			this.$rootScope.$apply((): void => {
				this.currentBreakpoint = newBreakPoint;
				this.observable.fire('window.breakpointChanged', this.currentBreakpoint);
			});
		}
	}
}
