import { DialogComponent } from './dialog';
import { DialogOutletComponent } from './dialogOutlet';
import { DialogRootService } from './dialogRoot.service';

export const DIALOG_DIRECTIVES: any[] = [DialogComponent, DialogOutletComponent];
export const DIALOG_PROVIDERS: any[] = [DialogRootService];

export * from './dialog';
export * from './dialogOutlet';
export * from './dialogRoot.service';
