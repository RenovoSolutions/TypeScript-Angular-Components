import '../../../libraries/bootstrap-touchspin/index';
import * as angular from 'angular';
import { InputController, IInputAttributes } from '../input/input';
import { IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
import { IChangeObject } from '../../types/changes';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export declare const defaultMaxValue: number;
export interface ISpinnerBindings {
    min: number;
    max: number;
    step: number;
    decimals: number;
    prefix: string;
    postfix: string;
    roundToStep: boolean;
    ngDisabled: boolean;
    spinnerId: string;
    name: string;
}
export interface ISpinnerChanges {
    ngDisabled: IChangeObject<boolean>;
}
export declare class SpinnerController extends InputController {
    private $element;
    private $timeout;
    min: number;
    max: number;
    step: number;
    decimals: number;
    prefix: string;
    postfix: string;
    roundToStep: boolean;
    ngDisabled: boolean;
    spinnerId: string;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IInputAttributes, componentValidatorFactory: IComponentValidatorFactory, $element: angular.IAugmentedJQuery, $timeout: angular.ITimeoutService);
    $postLink(): void;
    $onChanges(changes: ISpinnerChanges): void;
    private round(num);
    private unbindWatches;
    private setDisabled(disabled);
}
