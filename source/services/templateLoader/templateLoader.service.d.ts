import * as angular from 'angular';
export declare var moduleName: string;
export declare var serviceName: string;
export interface TemplateResult {
    templates: any;
    default: string;
    transclusionScope: angular.IScope;
}
export interface ITemplateLoader {
    loadTemplates(transclude: angular.ITranscludeFunction): TemplateResult;
}
