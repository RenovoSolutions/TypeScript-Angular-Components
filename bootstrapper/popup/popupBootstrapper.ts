import { Component } from '@angular/core';
import * as angular from 'angular';

import { serviceName as dialogService, bootstrapModalDialog } from '../../source/services/dialog/dialog.service.ng1';

export const moduleName: string = 'PopupTestModule';

class PopupTestController {
	popover: string;
	content: string;

	static $inject: string[] = [dialogService];
	constructor(private dialog: bootstrapModalDialog.IBootstrapModalDialogService) { }

	$onInit(): void {
		this.popover = '<div>{{popup.content}}</div>';
		this.content = 'Some content';
	}

	prompt(): void {
		this.dialog.prompt({
			acceptHandler: function() { alert('Yes'); },
			cancelHandler: function() { alert('No'); },
			okButton: 'Yes',
			cancelButton: 'No',
			message: 'Do you want to do this?',
		});
	}

	openDialog(): void {
		this.dialog.open({
			template: `<rl-dialog>
						<rl-dialog-header>Header</rl-dialog-header>
						<rl-dialog-content>Content</rl-dialog-content>
						<rl-dialog-footer>Footer</rl-dialog-footer>
					</rl-dialog >`,
		});
	}
}

@Component({
	selector: 'tsPopupNg1',
	template: '<ts-popup-ng1></ts-popup-ng1>'
})
export class PopupNg1BootstrapperComponent { }

angular.module(moduleName, [])
	.component('tsPopupNg1', {
		template: require('./popupNg1.html'),
		controller: 'PopupTestController',
		controllerAs: 'popup',
	})
	.controller('PopupTestController', PopupTestController);
