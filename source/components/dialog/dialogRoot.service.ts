import { Subject } from 'rxjs';

import { DialogHeaderTemplate, DialogContentTemplate, DialogFooterTemplate } from './templates/index';

export interface IDialogContent {
	id?: string;
	onClosing?: IDialogClosingHandler;
	header?: DialogHeaderTemplate;
	content?: DialogContentTemplate;
	footer?: DialogFooterTemplate;
	autosave?: boolean;
	submitAndClose?: { (): void };
	size?: string;
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
		if (this.dialogContext) {
			return this.dialogContext.onClosing();
		} else {
			return true;
		}
	}
}
