import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IJQueryUtility } from '../../services/jquery/jquery.service';
import { ITemplateLoader } from '../../services/templateLoader/templateLoader.service';
import { IChangeObject } from '../../types/changes';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface IGenericContainerChanges {
    selector: IChangeObject<any>;
}
export declare class GenericContainerController {
    private $element;
    private $transclude;
    private $compile;
    private object;
    private jquery;
    private templateLoader;
    selector: any;
    configuredTemplates: {
        [index: string]: string;
    };
    defaultTemplate: string;
    templateScope: angular.IScope;
    container: angular.IAugmentedJQuery;
    templates: {
        [index: string]: string;
    };
    default: string;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $transclude: angular.ITranscludeFunction, $compile: angular.ICompileService, object: __object.IObjectUtility, jquery: IJQueryUtility, templateLoader: ITemplateLoader);
    $onChanges(changes: IGenericContainerChanges): void;
    refresh(): void;
    resolveTemplate(type: string): string;
    $postLink(): void;
    private initDefaults();
    private swapTemplates(template);
}
