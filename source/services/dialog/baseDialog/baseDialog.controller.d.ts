import * as ng from 'angular';
import { BaseDialogService } from './baseDialog.service';
export declare var controllerName: string;
export interface IBaseDialogScope extends ng.IScope {
    modalController: string | Function;
    resolveData: any;
}
export declare class BaseDialogController {
    static $inject: string[];
    constructor($scope: IBaseDialogScope, $controller: ng.IControllerService, baseDialog: BaseDialogService);
}
