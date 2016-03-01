export declare var visibleBreakpointServiceName: string;
export interface IVisibleBreakpointService {
    isVisible(breakpoint: string): boolean;
}
export declare class VisibleBreakpointService implements IVisibleBreakpointService {
    isVisible(breakpoint: string): boolean;
}
