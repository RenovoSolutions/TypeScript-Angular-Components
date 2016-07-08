import { Subject } from 'rxjs';

import { DialogHeaderTemplate, DialogContentTemplate, DialogFooterTemplate } from './templates/index';

export interface IDialogContent {
	onClosing?: IDialogClosingHandler;
	header?: DialogHeaderTemplate;
	content?: DialogContentTemplate;
	footer?: DialogFooterTemplate;
	autosave?: boolean;
	submitAndClose?: { (): void };
}

export interface IDialogClosingHandler {
	(): boolean;
}

export class DialogRootService {
	dialogContext: IDialogContent;
	dismissing: boolean = false;

	openDialog: Subject<IDialogContent> = new Subject<IDialogContent>();
	closeDialog: Subject<void> = new Subject<void>();

	constructor() {
		this.openDialog.subscribe(context => this.dialogContext = context);
	}

	onClosing(): boolean {
		if (this.dialogContext.onClosing) {
			return this.dialogContext.onClosing();
		} else {
			return true;
		}
	}
}