import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IDialogClosingHandler } from '../../source/components/dialog/dialogRoot.service';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
})
export class PopupBootstrapper {
	content: string = 'Some content';
	onClosing: IDialogClosingHandler;
	options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	getOptions = () => Observable.of(this.options);

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
