import { Component } from '@angular/core';

@Component({
	selector: 'rl-form-ng',
	template: require('./form.ng2.html'),
})
export class FormComponent {
	constructor() {
		console.log('Component');
	}
}