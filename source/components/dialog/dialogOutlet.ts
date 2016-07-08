import * as $ from 'jquery';
import 'bootstrap';
import { Component, AfterViewInit } from '@angular/core';

import { DialogRootService } from './dialogRoot.service';

@Component({
	selector: 'rlDialogOutlet',
	template: require('./dialogOutlet.html'),
})
export class DialogOutletComponent implements AfterViewInit {
	dialogRoot: DialogRootService;

	constructor(dialogRoot: DialogRootService) {
		this.dialogRoot = dialogRoot;
		dialogRoot.openDialog.subscribe((): void => {
			$('.rlModal').modal('show');
		});
		dialogRoot.closeDialog.subscribe((): void => {
			$('.rlModal').modal('hide');
		});
	}

	dismiss(): void {
		this.dialogRoot.closeDialog.next(null);
	}

	ngAfterViewInit(): void {
		$('.rlModal').on('hide.bs.modal', (event: JQueryEventObject) => {
			const canClose = this.dialogRoot.onClosing();
			if (!canClose) {
				event.preventDefault();
			}
		});
	}
}