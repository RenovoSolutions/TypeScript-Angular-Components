import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IStringWithWatermarkBindings {
    string: string;
    watermark: string;
}
export declare class StringWithWatermarkController implements IStringWithWatermarkBindings {
    string: string;
    watermark: string;
    hasString: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope, objectUtility: __object.IObjectUtility);
}
export declare function stringWithWatermark(): angular.IDirective;
