import * as angular from 'angular';
import * as SignaturePad from 'signature_pad';
export declare var moduleName: string;
export declare var directiveName: string;
export interface ISignaturePadScope extends angular.IScope {
    pad: SignaturePad;
    height: number;
    width: number;
    ngDisabled: boolean;
    style: any;
    ngModel: angular.INgModelController;
}
export declare function signaturePad(): angular.IDirective;
