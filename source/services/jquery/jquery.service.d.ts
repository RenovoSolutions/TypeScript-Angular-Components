export declare var moduleName: string;
export declare var serviceName: string;
export interface IJQueryUtility {
    getHtml(jquery: JQuery): string;
    replaceContent(contentArea: JQuery, newContents: JQuery): JQuery;
}
