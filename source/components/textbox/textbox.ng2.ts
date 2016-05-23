import { Component } from '@angular/core';

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.ng2.html'),
})
export class TextboxComponent {
	constructor() {
		console.log('Component');
	}
}