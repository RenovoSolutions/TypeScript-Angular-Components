import { CheckboxComponent } from './checkbox/checkbox';
import { DateTimeComponent } from './dateTime/dateTime';
import { RADIO_DIRECTIVES } from './radio/index';
import { SelectComponent } from './select/select';
import { SpinnerComponent } from './spinner/spinner';
import { TextareaComponent } from './textarea/textarea';
import { TextboxComponent } from './textbox/textbox';
import { AbsoluteTimeComponent } from './absoluteTime/absoluteTime';
import { UserRatingComponent } from './userRating/userRating';

export const INPUT_DIRECTIVES: any[] = [
	CheckboxComponent,
	DateTimeComponent,
	RADIO_DIRECTIVES,
	SelectComponent,
	SpinnerComponent,
	TextareaComponent,
	TextboxComponent,
	AbsoluteTimeComponent,
	UserRatingComponent,
];

export * from './checkbox/checkbox';
export * from './dateTime/dateTime';
export * from './radio/index';
export * from './select/select';
export * from './spinner/spinner';
export * from './textarea/textarea';
export * from './textbox/textbox';
export * from './userRating/userRating';