import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DialogComponent } from './dialog';
import { DialogRootService } from './dialogRoot.service';

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

	constructor(private dialogRoot: DialogRootService) { }

	open(): void {
		this.dialog.open();
	}

	accept(): void {
		this.onAccept.emit(null);
		if (this.dialog.isOpen()) {
			this.dialog.close();
		}
	}

	cancel(): void {
		this.onCancel.emit(null);
		if (this.dialog.isOpen()) {
			this.dialog.close();
		}
	}

	dismiss(): void {
		this.dialog.dismiss();
	}
}
