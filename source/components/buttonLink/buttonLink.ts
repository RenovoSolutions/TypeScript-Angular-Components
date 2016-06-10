import { Component, Input } from '@angular/core';

import { BaseButtonComponent, baseInputs } from '../button/baseButton';

@Component({
	selector: 'rlButtonLink',
	template: require('./buttonLink.html'),
	inputs: baseInputs,
})
export class ButtonLinkComponent extends BaseButtonComponent {
	@Input() link: string;
	@Input() newTab: boolean;

	get target(): string {
		return this.newTab ? '_blank' : '_self';
	}
}