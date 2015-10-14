'use strict';

export var providerName: string = 'richTextEditor';

export interface IRichTextEditorProvider {
	addCustomButton(name: string, component: string): void;
	addStandardButton(name: string, tooltip: string, command: string, icon: string): void;
	$get(): void;
}

richTextEditorProvider.$inject = ['ngWigToolbarProvider'];
export function richTextEditorProvider(ngWigToolbarProvider: any): IRichTextEditorProvider {
	'use strict';

	return {
		addCustomButton(name: string, component: string): void {
			ngWigToolbarProvider.addCustomButton(name, component);
		},
		addStandardButton(name: string, tooltip: string, command: string, icon: string): void {
			ngWigToolbarProvider.addStandardButton(name, toolbar, command, 'fa-' + icon);
		},
		$get(): void {
			ngWigToolbarProvider.addCustomButton('paragraph', 'rl-paragraph-button');
			ngWigToolbarProvider.addCustomButton('h1', 'rl-header-button');
			ngWigToolbarProvider.addStandardButton('underline', 'Underline', 'underline', 'fa-underline');
			ngWigToolbarProvider.addStandardButton('indent', 'Indent', 'indent', 'fa-indent');
			ngWigToolbarProvider.addStandardButton('outdent', 'Outdent', 'outdent', 'fa-outdent');
		},
	};
}
