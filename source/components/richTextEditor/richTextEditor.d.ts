import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IRichTextEditorBindings {
    ngModel: string;
    customButtons: string[];
}
export declare class RichTextEditorController {
    ngModel: string;
    customButtons: string[];
    toolbar: string[][];
    constructor();
}
export declare function richTextEditor(): angular.IDirective;
