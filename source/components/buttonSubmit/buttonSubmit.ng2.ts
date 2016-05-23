import { Component } from '@angular/core';

@Component({
	selector: 'rl-button-submit-ng',
	template: require('./buttonSubmit.ng2.html'),
})
export class ButtonSubmitComponent {
	constructor() {
		console.log('Component');
	}
}