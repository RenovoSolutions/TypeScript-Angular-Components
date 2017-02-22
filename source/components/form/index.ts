import { FormComponent } from './form';
import { INPUT_DIRECTIVES } from '../inputs/index';
import { AutosaveDirective } from '../../behaviors/autosave/autosave';
import { RecluseFormComponent } from './RecluseForm';

export const FORM_DIRECTIVES = [FormComponent, INPUT_DIRECTIVES, AutosaveDirective, RecluseFormComponent];

export * from './form';
