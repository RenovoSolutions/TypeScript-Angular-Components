import { Provider } from '@angular/core';
import * as $ from 'jquery';

export abstract class JQueryProvider {}

export const JQUERY_PROVIDER: Provider = new Provider(JQueryProvider, {
	useValue: $,
});
