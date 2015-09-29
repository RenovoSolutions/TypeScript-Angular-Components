import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
import __object = services.object;
export interface IGenericTemplate {
    templateUrl?: string;
    template?: string;
}
export declare class GenericContainerController {
    private object;
    selector: any;
    configuredTemplates: any;
    defaultTemplate: IGenericTemplate | string;
    templates: any;
    default: IGenericTemplate | string;
    swapTemplates: {
        (template: string): void;
    };
    static $inject: string[];
    constructor($scope: angular.IScope, object: __object.IObjectUtility);
    refresh(): void;
    resolveTemplate(type: string): string;
}
