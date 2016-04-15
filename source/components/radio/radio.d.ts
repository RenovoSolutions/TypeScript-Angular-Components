import * as ng from 'angular';
import { RadioGroup, RadioGroupController } from './radioGroup';
export declare let componentName: string;
export declare let controllerName: string;
export declare class RadioController {
    radioGroup: RadioGroup;
    groupController: RadioGroupController;
    ngModel: ng.INgModelController;
    $onInit(): void;
}
export declare let radio: ng.IComponentOptions;
