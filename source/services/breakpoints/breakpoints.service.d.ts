import * as ng from 'angular';
import { Subject } from 'rxjs';
import { IWindowService } from '../windowWrapper/windowWrapper.service';
import { IVisibleBreakpointService } from './visibleBreakpoint.service';
export declare var breakpointServiceName: string;
export interface IBreakpointService {
    currentBreakpoint: string;
    breakpointChanges: Subject<string>;
    isBreakpoint(breakpoint: string): boolean;
}
export declare class BreakpointService implements IBreakpointService {
    private $rootScope;
    private visibleBreakpoints;
    static $inject: string[];
    constructor($rootScope: ng.IRootScopeService, visibleBreakpoints: IVisibleBreakpointService, resizeDebounceMilliseconds: number, windowService: IWindowService);
    currentBreakpoint: string;
    breakpointChanges: Subject<string>;
    private getBreakpoint();
    isBreakpoint(breakpoint: string): boolean;
    private updateBreakpoint;
}
