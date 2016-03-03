import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
import __object = services.object;
export declare class GenericContainerController {
    private object;
    selector: any;
    configuredTemplates: {
        [index: string]: string;
    };
    defaultTemplate: string;
    templates: {
        [index: string]: string;
    };
    default: string;
    swapTemplates: {
        (template: string): void;
    };
    static $inject: string[];
    constructor($scope: angular.IScope, object: __object.IObjectUtility);
    refresh(): void;
    resolveTemplate(type: string): string;
}
