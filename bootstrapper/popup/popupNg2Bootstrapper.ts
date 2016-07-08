import { Component } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

import { DialogOutletComponent } from '../../source/components/dialog/dialogOutlet';
import { DialogComponent } from '../../source/components/dialog/dialog';
import { IDialogClosingHandler } from '../../source/components/dialog/dialogRoot.service';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
	directives: [
		TOOLTIP_DIRECTIVES,
		DialogOutletComponent,
		DialogComponent,
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
}