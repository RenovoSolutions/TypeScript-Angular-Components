import { Component } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

import { ButtonComponent } from '../../source/components/buttons/index';
import { INPUT_DIRECTIVES } from '../../source/components/inputs/index';
import { DialogOutletComponent } from '../../source/components/dialog/dialogOutlet';
import { DialogComponent } from '../../source/components/dialog/dialog';
import { PromptDialogComponent } from '../../source/components/dialog/promptDialog';
import { IDialogClosingHandler } from '../../source/components/dialog/dialogRoot.service';
import { DIALOG_TEMPLATE_DIRECTIVES } from '../../source/components/dialog/templates/index';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
	directives: [
		TOOLTIP_DIRECTIVES,
		ButtonComponent,
		INPUT_DIRECTIVES,
		DIALOG_TEMPLATE_DIRECTIVES,
		DialogOutletComponent,
		DialogComponent,
		PromptDialogComponent,
	],
})
export class PopupBootstrapper {
	content: string = 'Some content';
	onClosing: IDialogClosingHandler;

	constructor() {
		this.onClosing = () => {
			console.log('Trying to close...');
			return false;
		};
	}

	yes(): void {
		console.log('Yes');
	}

	no(): void {
		console.log('No');
	}
}