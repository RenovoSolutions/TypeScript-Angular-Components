import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
export declare var moduleName: string;
export declare var serviceName: string;
export interface IContentProviderService {
    setContent(content: JQuery): void;
    setTranscludeContent(transcludeFunction: ng.ITranscludeFunction): void;
    getContent(selector?: string): JQuery;
    register(action: {
        (newText: JQuery): void;
    }, selector?: string): __observable.IUnregisterFunction;
}
export interface IContentProviderServiceFactory {
    getInstance(): IContentProviderService;
}
