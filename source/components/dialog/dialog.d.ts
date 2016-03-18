import * as angular from 'angular';
import { DialogService } from '../../services/dialog/dialog.service';
import { IFormValidator } from '../../types/formValidators';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export interface IDialogScope extends angular.IScope {
    dialogForm: IFormValidator;
    $parent: IParentScope;
}
export interface IParentScope extends angular.IScope {
    $close: {
        (): void;
    };
    $dismiss: {
        (): void;
    };
}
export interface IDialogBindings {
    autosave: boolean;
}
export declare class DialogController implements IDialogBindings {
    private $scope;
    private dialogService;
    autosave: boolean;
    hasFooter: boolean;
    close: {
        (): void;
    };
    dismiss: {
        (): void;
    };
    static $inject: string[];
    constructor($scope: IDialogScope, dialogService: DialogService<any>);
    $onInit(): void;
}
