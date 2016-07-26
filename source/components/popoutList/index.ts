import { PopoutItemComponent } from './popoutItem';
import { PopoutListComponent } from './popoutList';
import { PopoutTriggerDirective } from './popoutTrigger';
import { PopoutListService } from './popoutList.service';

export const POPOUT_LIST_DIRECTIVES: any[] = [PopoutItemComponent, PopoutListComponent, PopoutTriggerDirective];
export const POPOUT_LIST_PROVIDERS: any[] = [PopoutListService];

export * from './popoutItem';
export * from './popoutList';
export * from './popoutTrigger';
export * from './popoutList.service';
