import { DialogComponent } from './dialog';
import { DialogOutletComponent } from './dialogOutlet';
import { PromptDialogComponent } from './promptDialog';
import { DialogRootService } from './dialogRoot.service';
import { DIALOG_TEMPLATE_DIRECTIVES } from './templates/index';

export const DIALOG_DIRECTIVES: any[] = [DialogComponent, DialogOutletComponent, PromptDialogComponent, DIALOG_TEMPLATE_DIRECTIVES];
export const DIALOG_PROVIDERS: any[] = [DialogRootService];

export * from './dialog';
export * from './dialogOutlet';
export * from './dialogRoot.service';
