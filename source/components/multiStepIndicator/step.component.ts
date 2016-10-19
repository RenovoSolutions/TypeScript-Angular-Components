import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'rlStep',
	template: require('./step.component.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
	@Input() title: string;
	@Input() link: any[] | string;
	@Input() valid: boolean;
	@Input() useMsiStyling: boolean;

	get stepClass(): string {
		return this.useMsiStyling
			? 'rl-multi-step-item'
			: 'rl-tab-item';
	}
}
