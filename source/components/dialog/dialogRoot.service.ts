import { Subject } from 'rxjs';

export interface IDialogContent {
	onClosing?: IDialogClosingHandler;
}

export interface IDialogClosingHandler {
	(): boolean;
}

export class DialogRootService {
	dialogContext: IDialogContent;

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