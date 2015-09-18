// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../windowWrapper/windowWrapper.service.ts' />
/// <reference path='visibleBreakpoint.service.ts' />
/// <reference path='breakpoint.ts' />

module rl.ui.services.breakpoints {
	export var breakpointServiceName: string = 'breakpoints';
	
	import __observable = rl.utilities.services.observable;
	
	export interface IBreakpointService {
		currentBreakpoint: string;
		isBreakpoint(breakpoint: string): boolean;
		register(action: {(breakpoint: string): void}): __observable.IUnregisterFunction;
	}
	
	export class BreakpointService implements IBreakpointService {
		static $inject: string[] = [visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapper.serviceName, __observable.factoryName]
		constructor(private visibleBreakpoints: IVisibleBreakpointService
				, resizeDebounceMilliseconds: number
				, windowService: windowWrapper.IWindowService
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
				this.currentBreakpoint = newBreakPoint;
				this.observable.fire('window.breakpointChanged', this.currentBreakpoint);
			}
		}
	}
}
