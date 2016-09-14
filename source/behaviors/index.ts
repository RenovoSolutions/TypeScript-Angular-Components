import { AutosaveDirective } from './autosave/autosave';
import { OffClickDirective } from './offClick/offClick';
import { StopEventPropagationDirective } from './stopEventPropagation/stopEventPropagation';

export const BEHAVIOR_DIRECTIVES: any[] = [AutosaveDirective, OffClickDirective, StopEventPropagationDirective];

export * from './autosave/autosave';
export * from './offClick/offClick';
export * from './stopEventPropagation/stopEventPropagation';
