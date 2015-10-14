import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IRichTextEditorProvider } from './richTextEditor.config';
declare let externalProviderName: string;
export { externalProviderName as providerName, IRichTextEditorProvider };
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IRichTextEditorBindings {
    ngModel: string;
    customButtons: string[];
}
export declare class RichTextEditorController {
    ngModel: string;
    customButtons: string;
    toolbar: string;
    static $inject: string[];
    constructor(object: __object.IObjectUtility, provider: void);
}
export declare function richTextEditor(): angular.IDirective;
