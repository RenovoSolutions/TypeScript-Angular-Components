import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DialogComponent } from './dialog';

@Component({
	selector: 'rlPromptDialog',
	template: require('./promptDialog.html'),
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
		this.dialog.dismiss();
	}
}
