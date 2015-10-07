import * as ng from 'angular';
import { RadioGroup } from './radioGroup';
export declare var directiveName: string;
export declare var controllerName: string;
export declare class RadioController {
    radioGroup: RadioGroup;
    static $inject: string[];
    constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery);
}
export declare function radio(): ng.IDirective;
