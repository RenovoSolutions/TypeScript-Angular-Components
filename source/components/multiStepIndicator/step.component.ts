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
	@HostBinding('class.active') activeStyle: boolean = true;

	// Conditional classes
	@HostBinding('class.rl-multi-step-item') msiStyle: boolean = false;
	@HostBinding('class.rl-tab-item') tabStyle: boolean = false;
	@HostBinding('class.error') errorStyle: boolean = false;

	ngOnInit() {
		this.setStepStyle();
		this.checkIfValid();
	}

	ngOnChanges() {
		this.checkIfValid();
	}

	setStepStyle() {
		this.useMsiStyling
			? this.msiStyle = true
			: this.tabStyle = true;
	}

	checkIfValid() {
		this.valid
			? this.errorStyle = false
			: this.errorStyle = true;
	}
}
