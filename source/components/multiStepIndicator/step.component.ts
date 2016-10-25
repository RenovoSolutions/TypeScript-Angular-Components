import { Component, Input, ChangeDetectionStrategy, HostBinding, OnInit, OnChanges } from '@angular/core';

@Component({
	selector: 'rlStep',
	template: require('./step.component.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepComponent {
	@Input() title: string;
	@Input() link: any[] | string;
	@Input() valid: boolean;
	@Input() useMsiStyling: boolean = false;

	@HostBinding('class.rl-multi-step-item') useMsi: boolean = false;
	@HostBinding('class.rl-tab-item') useTab: boolean = false;

	ngOnInit() {
		this.setStepType();
	}

	setStepType(): boolean {
		return this.useMsiStyling
			? this.useMsi = true
			: this.useTab = true;
	}
}
