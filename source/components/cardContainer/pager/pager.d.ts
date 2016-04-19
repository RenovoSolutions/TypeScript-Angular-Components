export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare let defaultVisiblePageCount: number;
export interface IPagerBindings {
    pageCount: number;
}
export declare class PagerController {
    pageCount: number;
    canGoBack: boolean;
    canGoForward: boolean;
    pages: number[];
    private cardContainer;
    private pager;
    private dataSource;
    private lastPage;
    private visiblePageCount;
    currentPage: number;
    $onInit(): void;
    private updatePageCount;
    private updatePaging();
    first(): void;
    previous(): void;
    goto(page: number): void;
    next(): void;
    last(): void;
}
