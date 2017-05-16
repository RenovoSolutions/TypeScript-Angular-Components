import { Component, Input } from '@angular/core';

import { BaseButtonComponent, baseInputs } from '../baseButton';

@Component({
	selector: 'rlButtonRoute',
	template: require('./buttonRoute.html'),
	inputs: baseInputs,
})
export class ButtonRouteComponent extends BaseButtonComponent {
	@Input() link: string;
	@Input() queryParams: any;
	@Input() activeClass: string = 'active';
	@Input() newTab: boolean;

	get target(): string {
		return this.newTab ? '_blank' : '_self';
	}
}
