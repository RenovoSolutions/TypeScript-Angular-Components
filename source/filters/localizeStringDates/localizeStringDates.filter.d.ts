export declare var moduleName: string;
export declare var filterName: string;
export interface ILocalizeStringDates {
    (input?: string): string;
}
/**
 *Filters a string and find all, datetimes that match the format M/D/YYYY H:M:S AM|PM that is used to store dates in message log body text.
* Assumes they are UTC  and parses them, converts to local browser time replaces them in the string.
 */
export declare function localizeStringDates(): ILocalizeStringDates;
