import * as angular from 'angular';
import { DialogService } from '../../services/dialog/dialog.service';
import { IFormValidator } from '../../types/formValidators';
export declare let moduleName: string;
export declare let componentName: string;
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
    $saveAndClose: {
        (): void;
    };
}
export interface IDialogBindings {
    autosave: boolean;
}
export declare class DialogController implements IDialogBindings {
    private $scope;
    private $element;
    private $transclude;
    private $compile;
    private dialogService;
    autosave: boolean;
    hasFooter: boolean;
    close: {
        (): void;
    };
    dismiss: {
        (): void;
    };
    saveAndClose: {
        (): void;
    };
    form: IFormValidator;
    static $inject: string[];
    constructor($scope: IDialogScope, $element: angular.IAugmentedJQuery, $transclude: angular.ITranscludeFunction, $compile: angular.ICompileService, dialogService: DialogService<any>);
    $onInit(): void;
    $postLink(): void;
}
