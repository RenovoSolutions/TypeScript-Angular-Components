import { Provider, OpaqueToken } from '@angular/core';
import * as $ from 'jquery';

export const jqueryToken: OpaqueToken = new OpaqueToken('Jquery');

export const JQUERY_PROVIDER: Provider = new Provider(jqueryToken, {
	useValue: $,
});
