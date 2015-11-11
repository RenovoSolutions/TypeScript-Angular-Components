export declare var moduleName: string;
export declare var serviceName: string;
export interface IWindowService {
    resize(callback: {
        (event: JQueryEventObject): any;
    }): void;
    scrollTop(): number;
    scroll(handler: IScrollHandler): void;
    height(): number;
}
export interface IScrollHandler {
    (event: JQueryEventObject): any;
}
