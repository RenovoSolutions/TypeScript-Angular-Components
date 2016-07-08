import { Component, Input } from '@angular/core';

import { DialogRootService, IDialogClosingHandler } from './dialogRoot.service';

@Component({
	selector: 'rlDialog',
	template: require('./dialog.html'),
})
export class DialogComponent {
	@Input() onClosing: IDialogClosingHandler;

	dialogRoot: DialogRootService;

	constructor(dialogRoot: DialogRootService) {
		this.dialogRoot = dialogRoot;
	}

	open(): void {
		this.dialogRoot.openDialog.next({
			onClosing: this.onClosing,
		});
	}

	close(): void {
		this.dialogRoot.closeDialog.next(null);
	}
}