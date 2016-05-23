import { Component, Input } from '@angular/core';

import { ButtonComponent, baseInputs } from '../button/button.ng2';

@Component({
	selector: 'rlButtonLink',
	template: require('./buttonLink.ng2.html'),
	inputs: baseInputs,
})
export class ButtonLinkComponent extends ButtonComponent {
	@Input() link: string;
	@Input() newTab: boolean;

	get target(): string {
		return this.newTab ? '_blank' : '_self';
	}

	constructor() {
		super();
	}
}