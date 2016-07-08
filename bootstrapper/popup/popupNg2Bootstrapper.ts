import { Component } from '@angular/core';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';

import { DialogOutletComponent } from '../../source/components/dialog/dialogOutlet';
import {} from '../../source/components/dialog/dialog';

@Component({
	selector: 'tsPopupBootstrapper',
	template: require('./popupNg2.html'),
	directives: [
		TOOLTIP_DIRECTIVES,
		DialogOutletComponent,
	],
})
export class PopupBootstrapper {
	content: string = 'Some content';
}