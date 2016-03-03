export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export interface IDialogBindings {
    autosave: boolean;
}
export declare class DialogController implements IDialogBindings {
    autosave: boolean;
    hasFooter: boolean;
}
