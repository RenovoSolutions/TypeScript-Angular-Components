export declare var providerName: string;
export interface IRichTextEditorProvider {
    addCustomButton(name: string, component: string): void;
    addStandardButton(name: string, tooltip: string, command: string, icon: string): void;
    $get(): void;
}
export declare function richTextEditorProvider(ngWigToolbarProvider: any): IRichTextEditorProvider;
