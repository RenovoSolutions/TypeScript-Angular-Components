import * as ng from 'angular';
import { Observable } from 'rxjs';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IContentChanges {
    newContent: JQuery;
    scope?: ng.IScope;
}
export interface IContentProviderService {
    contentChanges: Observable<IContentChanges>;
    setContent(content: JQuery): void;
    setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
    getContent(selector?: string): JQuery;
}
export interface IContentProviderServiceFactory {
    getInstance(): IContentProviderService;
}
