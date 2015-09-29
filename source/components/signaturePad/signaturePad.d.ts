import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export interface ISignaturePadScope extends angular.IScope {
    signature: SignaturePad;
    initial: string;
    height: number;
    width: number;
}
export declare function signaturePad(): angular.IDirective;
