import * as ng from 'angular';
import { Subject, Subscription } from 'rxjs';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IContentChanges {
    newContent: JQuery;
    scope?: ng.IScope;
}
export interface IContentProviderService {
    contentChanges: Subject<IContentChanges>;
    setContent(content: JQuery): void;
    setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
    getContent(selector?: string): JQuery;
    subscribe(action: {
        (newText: JQuery): void;
    }, selector?: string): Subscription;
}
export interface IContentProviderServiceFactory {
    getInstance(): IContentProviderService;
}
