import { Component, Input } from '@angular/core';

import { BaseButtonComponent, baseInputs } from '../button/baseButton.ng2';

@Component({
	selector: 'rlButtonLink',
	template: require('./buttonLink.ng2.html'),
	inputs: baseInputs,
})
export class ButtonLinkComponent extends BaseButtonComponent {
	@Input() link: string;
	@Input() newTab: boolean;

	get target(): string {
		return this.newTab ? '_blank' : '_self';
	}
}