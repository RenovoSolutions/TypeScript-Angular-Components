import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DialogComponent } from './dialog';
import { DIALOG_TEMPLATE_DIRECTIVES } from './templates/index';
import { ButtonComponent } from '../buttons/index';

@Component({
	selector: 'rlPromptDialog',
	template: require('./promptDialog.html'),
	directives: [DIALOG_TEMPLATE_DIRECTIVES, DialogComponent, ButtonComponent],
})
export class PromptDialogComponent {
	@Input() message: string;
	@Input() okButton: string = 'Ok';
	@Input() cancelButton: string = 'Cancel';
	@Output() onAccept: EventEmitter<void> = new EventEmitter<void>();
	@Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild(DialogComponent) dialog: DialogComponent;

	open(): void {
		this.dialog.open();
	}

	accept(): void {
		this.onAccept.emit(null);
		this.dialog.close();
	}

	cancel(): void {
		this.onCancel.emit(null);
		this.dialog.close();
	}

	dismiss(): void {
		this.dialog.close();
	}
}