'use strict';

configureNgWig.$inject = ['ngWigToolbarProvider'];
export function configureNgWig(ngWigToolbarProvider: any): void {
	ngWigToolbarProvider.addCustomButton('h1', 'rl-header-button');
	ngWigToolbarProvider.addStandartButton('underline', 'Underline', 'underline', 'fa-underline');
	ngWigToolbarProvider.addStandartButton('indent', 'Indent', 'indent', 'fa-indent');
	ngWigToolbarProvider.addStandartButton('outdent', 'Outdent', 'outdent', 'fa-outdent');
}
