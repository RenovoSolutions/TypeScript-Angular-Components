import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, ContentChild, forwardRef, EventEmitter } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { DialogRootService, IDialogClosingHandler } from './dialogRoot.service';
import { DialogHeaderTemplate, DialogContentTemplate, DialogFooterTemplate } from './templates/index';
import { FormComponent, baseInputs } from '../form/form';
import { AsyncHelper } from '../../services/async/async.service';
import { FormService } from '../../services/form/form.service';

@Component({
	selector: 'rlDialog',
	template: '',
	inputs: [baseInputs.save],
	providers: [
		{
			provide: FormComponent,
			useExisting: forwardRef(() => DialogComponent),
		},
	],
})
export class DialogComponent extends FormComponent implements OnInit {
	@Input() onClosing: IDialogClosingHandler;
	@Input() autosave: boolean;
	@Input() size: string;
	@Output() dialogOpenStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	@ContentChild(DialogHeaderTemplate) header: DialogHeaderTemplate;
	@ContentChild(DialogContentTemplate) content: DialogContentTemplate;
	@ContentChild(DialogFooterTemplate) footer: DialogFooterTemplate;

	dialogRoot: DialogRootService;

	constructor(notification: __notification.NotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, dialogRoot: DialogRootService) {
		super(notification, asyncHelper, formService, null);
		this.dialogRoot = dialogRoot;
	}

	ngOnInit() {
		this.dialogOpenStatus.emit(false);
	}

	open(): void {
		this.dialogRoot.openDialog.next({
			onClosing: this.wrapOnClosing,
			header: this.header,
			content: this.content,
			footer: this.footer,
			autosave: this.autosave,
			submitAndClose: () => this.submitAndClose(),
			size: this.size,
		});
		this.dialogOpenStatus.emit(true);
	}

	close(): void {
		this.dialogRoot.closeDialog.next(null);
		this.dialogOpenStatus.emit(false);
	}

	dismiss(): void {
		this.dialogRoot.dismissing = true;
		this.dialogRoot.closeDialog.next(null);
		this.dialogOpenStatus.emit(false);
	}

	submitAndClose = (): Observable<any> => {
		const waitOn = this.submitAndWait();
		return this.asyncHelper.waitAsObservable(waitOn).do((result) => {
			if (result !== false) {
				this.close();
			}
		});
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
