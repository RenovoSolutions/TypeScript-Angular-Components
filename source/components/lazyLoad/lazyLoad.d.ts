import { IChangeObject } from '../../types/changes';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export interface ILazyLoadChanges {
    show: IChangeObject<boolean>;
}
export declare class LazyLoadController {
    show: boolean;
    init: boolean;
    $onChanges(changes: ILazyLoadChanges): void;
}
