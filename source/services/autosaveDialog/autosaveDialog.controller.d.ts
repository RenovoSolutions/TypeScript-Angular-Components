import * as ng from 'angular';
import { IAutosaveDialogScope } from './autosaveDialog.service';
export declare var controllerName: string;
export declare class AutosaveDialogController {
    private $scope;
    form: string;
    formGetter: {
        (scope: ng.IScope): ng.IFormController;
    };
    setForm: {
        (form: ng.IFormController): void;
    };
    data: any;
    static $inject: string[];
    constructor($scope: IAutosaveDialogScope);
}
