import { services } from 'typescript-angular-utilities';
import __object = services.object;
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export declare class CommaListController {
    inList: any[];
    list: any[];
    transform: {
        (item: any): string;
    } | string;
    max: number;
    remainingItems: number;
    static $inject: string[];
    constructor(object: __object.IObjectUtility);
    private getFirstItems(list);
}
