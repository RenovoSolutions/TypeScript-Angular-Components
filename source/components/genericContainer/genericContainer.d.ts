import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import { IJQueryUtility } from '../../services/jquery/jquery.service';
import { ITemplateLoader } from '../../services/templateLoader/templateLoader.service';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
import __object = services.object;
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
    constructor($scope: angular.IScope, $element: angular.IAugmentedJQuery, $transclude: angular.ITranscludeFunction, $compile: angular.ICompileService, object: __object.IObjectUtility, jquery: IJQueryUtility, templateLoader: ITemplateLoader);
    refresh(): void;
    resolveTemplate(type: string): string;
    $postLink(): void;
    private initDefaults();
    private swapTemplates(template);
}
