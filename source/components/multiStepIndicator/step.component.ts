import { Component, Input } from '@angular/core';

@Component({
	selector: 'rlStep',
	template: require('./step.component.html'),
})
export class StepComponent {
	@Input() title: string;
	@Input() link: any[] | string;
	@Input() activeClass: string = 'active';
}
