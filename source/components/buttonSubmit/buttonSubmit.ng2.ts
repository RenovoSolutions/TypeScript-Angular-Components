import { Component } from '@angular/core';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.ng2.html'),
})
export class ButtonSubmitComponent {
	constructor() {
		console.log('Component');
	}
}