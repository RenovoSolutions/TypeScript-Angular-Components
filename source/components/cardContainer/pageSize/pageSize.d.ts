export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export declare const availablePageSizes: number[];
export declare const defaultPageSize: number;
export declare class PageSizeController {
    pageSizes: number[];
    private cardContainer;
    private pager;
    selectedPageSize: number;
    $onInit(): void;
}
