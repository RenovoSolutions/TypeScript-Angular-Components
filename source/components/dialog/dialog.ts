import { Component, Input, ContentChild, Provider, forwardRef, Inject, Optional, SkipSelf } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { DialogRootService, IDialogClosingHandler } from './dialogRoot.service';
import { DialogHeaderTemplate, DialogContentTemplate, DialogFooterTemplate } from './templates/index';
import { FormComponent, baseInputs } from '../form/form';
import { AsyncHelper, IWaitValue } from '../../services/async/async.service';
import { FormService } from '../../services/form/form.service';

@Component({
	selector: 'rlDialog',
	template: '',
	inputs: [baseInputs.save],
	providers: [
		new Provider(FormComponent, {
			useExisting: forwardRef(() => DialogComponent),
		}),
	],
})
export class DialogComponent extends FormComponent {
	@Input() onClosing: IDialogClosingHandler;
	@Input() autosave: boolean;

	@ContentChild(DialogHeaderTemplate) header: DialogHeaderTemplate;
	@ContentChild(DialogContentTemplate) content: DialogContentTemplate;
	@ContentChild(DialogFooterTemplate) footer: DialogFooterTemplate;

	dialogRoot: DialogRootService;

	constructor( @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, dialogRoot: DialogRootService) {
		super(notification, asyncHelper, formService, null);
		this.dialogRoot = dialogRoot;
	}

	open(): void {
		this.dialogRoot.openDialog.next({
			onClosing: this.wrapOnClosing,
			header: this.header,
			content: this.content,
			footer: this.footer,
			autosave: this.autosave,
			submitAndClose: () => this.submitAndClose(),
		});
	}

	close(): void {
		this.dialogRoot.closeDialog.next(null);
	}

	dismiss(): void {
		this.dialogRoot.dismissing = true;
		this.dialogRoot.closeDialog.next(null);
	}

	submitAndClose(): IWaitValue<any> {
		const waitOn = this.submitAndWait();
		this.asyncHelper.waitAsObservable(waitOn).subscribe((result) => {
			if (result !== false) {
				this.close();
			}
		});
		return waitOn;
	}

	wrapOnClosing: IDialogClosingHandler = () => {
		if (this.autosave) {
			if (this.dirty) {
				return this.submit();
			}
			return true;
		} else {
			return this.onClosing
				? this.onClosing()
				: true;
		}
	}
}