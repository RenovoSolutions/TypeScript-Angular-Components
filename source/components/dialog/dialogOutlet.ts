import * as $ from 'jquery';
import 'bootstrap';
import { Component } from '@angular/core';

import { DialogRootService } from './dialogRoot.service';

@Component({
	selector: 'rlDialogOutlet',
	template: require('./dialogOutlet.html'),
})
export class DialogOutletComponent {
	constructor(dialogRoot: DialogRootService) {
		dialogRoot.openDialog.subscribe((): void => {
			$('.rlModal').modal('show');
		});
		dialogRoot.closeDialog.subscribe((): void => {
			$('.rlModal').modal('hide');
		});
	}

}