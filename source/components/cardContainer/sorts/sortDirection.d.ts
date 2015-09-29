export interface ISortDirections {
    ascending: SortDirection;
    descending: SortDirection;
    none: SortDirection;
}
export declare class SortDirection {
    private value;
    static none: SortDirection;
    static ascending: SortDirection;
    static descending: SortDirection;
    constructor(value: number);
    static toggle(direction: SortDirection): SortDirection;
    static getFullName(direction: SortDirection): string;
}
