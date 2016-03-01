import * as ng from 'angular';
import { BootstrapModalDialogService } from './bootstrapModalDialog.service';
export declare var controllerName: string;
export interface IBootstrapModalDialogScope extends ng.IScope {
    modalController: string | Function;
    resolveData: any;
}
export declare class BootstrapModalDialogController {
    static $inject: string[];
    constructor($scope: IBootstrapModalDialogScope, $controller: ng.IControllerService, baseDialog: BootstrapModalDialogService);
}
