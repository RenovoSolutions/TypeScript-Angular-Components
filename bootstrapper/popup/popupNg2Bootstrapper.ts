import { Component } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
	directives: [TOOLTIP_DIRECTIVES],
})
export class PopupBootstrapper {
	content: string = 'Some content';
}