import * as angular from 'angular';
export declare var moduleName: string;
export declare var serviceName: string;
export interface TemplateResult {
    templates: {
        [index: string]: JQuery;
    };
    default: JQuery;
    transclusionScope: angular.IScope;
}
export interface ITemplateLoader {
    loadTemplates(transclude: angular.ITranscludeFunction): TemplateResult;
}
