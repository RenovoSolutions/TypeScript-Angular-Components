export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
import { services } from 'typescript-angular-utilities';
import __date = services.date;
export declare class DateTimeStaticController {
    private dateUtility;
    dateValue: string;
    includeTime: boolean;
    displayValue: string;
    displayTimeZone: boolean;
    constructor(dateUtility: __date.IDateUtility);
}
