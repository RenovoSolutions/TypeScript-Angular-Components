import { Component } from '@angular/core';

@Component({
	selector: 'rl-textbox-ng',
	template: require('./textbox.ng2.html'),
})
export class TextboxComponent {
	constructor() {
		console.log('Component');
	}
}