import { Component } from '@angular/core';

@Component({
	selector: 'rlForm',
	template: require('./form.ng2.html'),
})
export class FormComponent {
	constructor() {
		console.log('Component');
	}
}