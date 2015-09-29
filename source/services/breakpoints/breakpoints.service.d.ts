import { services } from 'typescript-angular-utilities';
import { IWindowService } from '../windowWrapper/windowWrapper.service';
import { IVisibleBreakpointService } from './visibleBreakpoint.service';
export declare var breakpointServiceName: string;
import __observable = services.observable;
export interface IBreakpointService {
    currentBreakpoint: string;
    isBreakpoint(breakpoint: string): boolean;
    register(action: {
        (breakpoint: string): void;
    }): __observable.IUnregisterFunction;
}
export declare class BreakpointService implements IBreakpointService {
    private visibleBreakpoints;
    static $inject: string[];
    constructor(visibleBreakpoints: IVisibleBreakpointService, resizeDebounceMilliseconds: number, windowService: IWindowService, observableFactory: __observable.IObservableServiceFactory);
    private observable;
    currentBreakpoint: string;
    private getBreakpoint();
    isBreakpoint(breakpoint: string): boolean;
    register(action: {
        (breakpoint: string): void;
    }): __observable.IUnregisterFunction;
    private updateBreakpoint;
}
