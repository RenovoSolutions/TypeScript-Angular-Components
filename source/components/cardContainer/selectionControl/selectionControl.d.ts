import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import { IDataSource } from '../dataSources/dataSources.module';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class SelectionControlController {
    private $scope;
    selectedItems: number;
    pagingEnabled: boolean;
    dataSource: IDataSource<any>;
    private builder;
    static $inject: string[];
    constructor($scope: angular.IScope, bool: __boolean.IBooleanUtility);
    selectPage(): void;
    selectAll(): void;
    clearPage(): void;
    clearAll(): void;
}
export declare function selectionControl(): angular.IDirective;
