import { Component } from '@angular/core';

import { IDialogClosingHandler } from '../../source/components/dialog/dialogRoot.service';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
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

	save = (data) => {
		console.log(data);
	}
}