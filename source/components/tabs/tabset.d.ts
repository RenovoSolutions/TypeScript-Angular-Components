import * as ng from 'angular';
export declare let directiveName: string;
export declare let controllerName: string;
export interface ITabHeader {
    template: string;
    isVisible?: boolean;
    isValid?: boolean;
}
export declare class TabsetController {
    tabHeaders: ITabHeader[];
    findPosition: {
        (tabElement: ng.IAugmentedJQuery): number;
    };
    registerTab(element: ng.IAugmentedJQuery, header: ITabHeader): void;
    select(tab: ITabHeader): void;
}
export declare function tabset(): ng.IDirective;
