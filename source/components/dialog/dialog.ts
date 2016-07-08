import { Component } from '@angular/core';

import { DialogRootService } from './dialogRoot.service';

@Component({
	selector: 'rlDialog',
	template: require('./dialog.html'),
})
export class DialogComponent {
	dialogRoot: DialogRootService;

	constructor(dialogRoot: DialogRootService) {
		this.dialogRoot = dialogRoot;
	}

	open(): void {
		this.dialogRoot.openDialog.next({});
	}

	close(): void {
		this.dialogRoot.closeDialog.next(null);
	}
}