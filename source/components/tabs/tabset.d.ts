import * as ng from 'angular';
export declare let componentName: string;
export declare let controllerName: string;
export interface ITabHeader {
    template: string;
    isVisible?: boolean;
    isValid?: boolean;
}
export declare class TabsetController {
    private $element;
    tabHeaders: ITabHeader[];
    registerTab(element: ng.IAugmentedJQuery, header: ITabHeader): void;
    select(tab: ITabHeader): void;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery);
    findPosition(tabElement: ng.IAugmentedJQuery): number;
}
export declare let tabset: ng.IComponentOptions;
