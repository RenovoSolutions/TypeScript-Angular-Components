import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import { IDataSource } from '../dataSources/dataSources.module';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export declare class SelectionControlController {
    private bool;
    selectedItems: number;
    pagingEnabled: boolean;
    dataSource: IDataSource<any>;
    private cardContainer;
    static $inject: string[];
    constructor(bool: __boolean.IBooleanUtility);
    $onInit(): void;
    selectPage(): void;
    selectAll(): void;
    clearPage(): void;
    clearAll(): void;
}
