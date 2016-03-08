import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface ITemplateObject {
    template: string;
    scope: angular.IScope;
}
export interface ITemplateRendererBindings {
    template: ITemplateObject;
}
export declare class TemplateRendererController implements ITemplateRendererBindings {
    template: ITemplateObject;
    static $inject: string[];
    constructor($compile: angular.ICompileService, $element: angular.IAugmentedJQuery);
}
