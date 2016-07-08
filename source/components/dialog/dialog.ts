import { Component, Input, ContentChild } from '@angular/core';

import { DialogRootService, IDialogClosingHandler } from './dialogRoot.service';
import { DialogHeaderTemplate, DialogContentTemplate, DialogFooterTemplate } from './templates/index';

@Component({
	selector: 'rlDialog',
	template: require('./dialog.html'),
})
export class DialogComponent {
	@Input() onClosing: IDialogClosingHandler;

	@ContentChild(DialogHeaderTemplate) header: DialogHeaderTemplate;
	@ContentChild(DialogContentTemplate) content: DialogContentTemplate;
	@ContentChild(DialogFooterTemplate) footer: DialogFooterTemplate;

	dialogRoot: DialogRootService;

	constructor(dialogRoot: DialogRootService) {
		this.dialogRoot = dialogRoot;
	}

	open(): void {
		this.dialogRoot.openDialog.next({
			onClosing: this.onClosing,
			header: this.header,
			content: this.content,
			footer: this.footer,
		});
	}

	close(): void {
		this.dialogRoot.closeDialog.next(null);
	}
}