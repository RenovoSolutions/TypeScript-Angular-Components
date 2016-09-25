import { ValueProvider } from '@angular/core';
import * as $ from 'jquery';

export abstract class JQueryProvider {}

export const JQUERY_PROVIDER: ValueProvider = {
	provide: JQueryProvider,
	useValue: $,
};
