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
	@Input() current: boolean;
	@Input() useMsiStyling: boolean = false;

	// Default classes
	@HostBinding('class.active') hasActive: boolean = true;

	// Conditional classes
	@HostBinding('class.rl-multi-step-item') useMsi: boolean = false;
	@HostBinding('class.rl-tab-item') useTab: boolean = false;
	@HostBinding('class.error') hasError: boolean = false;

	ngOnInit() {
		this.setStepType();
		this.checkIfValid();
	}

	ngOnChanges() {
		this.checkIfValid();
	}

	setStepType(): boolean {
		return this.useMsiStyling
			? this.useMsi = true
			: this.useTab = true;
	}

	checkIfValid() {
		this.valid
			? this.hasError = false
			: this.hasError = true;
	}
}
