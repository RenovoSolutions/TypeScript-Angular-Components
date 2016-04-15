import './ratingBar.css';
import { IChangeObject } from '../../types/changes';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export interface IDimensions {
    width: number;
    height: number;
}
export interface IRatingBarScopeBindings {
    totalWidth: number;
    height: number;
    value: number;
    min: number;
    max: number;
    background: string;
}
export interface IRatingBarChanges {
    value?: IChangeObject<number>;
    totalWidth?: IChangeObject<number>;
}
export declare class RatingBarController implements IRatingBarScopeBindings {
    useDefaultTheme: boolean;
    totalWidth: number;
    height: number;
    value: number;
    min: number;
    max: number;
    background: string;
    backgroundClass: string;
    dimensions: IDimensions;
    width: number;
    barClass: string;
    private ratingBarClass;
    static $inject: string[];
    constructor(useDefaultTheme: boolean);
    $onChanges(changes: IRatingBarChanges): void;
    private updateValue(newValue);
    private updateDimensions(totalWidth);
}
