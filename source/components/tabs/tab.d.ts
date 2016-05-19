import * as ng from 'angular';
import { TabsetController, ITabHeader } from './tabset';
export declare let componentName: string;
export declare let controllerName: string;
export interface ITabScope extends ng.IScope {
    tabForm: ng.IFormController;
}
export declare class TabController {
    private $element;
    private $transclude;
    header: ITabHeader;
    tabset: TabsetController;
    static $inject: string[];
    constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery, $transclude: ng.ITranscludeFunction);
    $postLink(): void;
}
export declare let tab: ng.IComponentOptions;
