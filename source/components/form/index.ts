import { FormComponent } from './form';
import { INPUT_DIRECTIVES } from '../inputs/index';
import { AutosaveDirective } from '../../behaviors/autosave/autosave';

export const FORM_DIRECTIVES = [FormComponent, INPUT_DIRECTIVES, AutosaveDirective];

export * from './form';
