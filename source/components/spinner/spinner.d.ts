import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface ISpinnerScope extends angular.IScope {
    min: number;
    max: number;
    step: number;
    decimals: number;
    prefix: string;
    postfix: string;
    roundToStep: boolean;
    ngDisabled: boolean;
    ngModel: number;
    spinnerId: string;
    name: string;
}
