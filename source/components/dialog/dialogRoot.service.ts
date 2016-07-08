import { Subject } from 'rxjs';

export interface IDialogContent {

}

export class DialogRootService {
	openDialog: Subject<IDialogContent> = new Subject<IDialogContent>();
	closeDialog: Subject<void> = new Subject<void>();
}