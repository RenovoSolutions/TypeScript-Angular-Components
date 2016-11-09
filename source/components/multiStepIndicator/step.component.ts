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
	@HostBinding('class.rl-step') stepStyle: boolean = true;
	@HostBinding('class.active') activeStyle: boolean = true;

	// Conditional classes
	@HostBinding('class.error') errorStyle: boolean = false;

	ngOnInit() {
		this.checkIfValid();
	}

	ngOnChanges() {
		this.checkIfValid();
	}

	checkIfValid() {
		this.valid
			? this.errorStyle = false
			: this.errorStyle = true;
	}
}
