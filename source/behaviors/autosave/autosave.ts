import { Directive, Input, Self, AfterViewInit, HostListener } from '@angular/core';

import { FormComponent } from '../../components/form/form';
import { AutosaveActionService } from '../../services/autosaveAction/autosaveAction.service';
import { IWaitValue } from '../../services/async/async.service';

export const DEFAULT_AUTOSAVE_DEBOUNCE: number = 3000;

@Directive({
	selector: '[rlAutosave]',
})
export class AutosaveDirective implements AfterViewInit {
	@Input() saveWhenInvalid: boolean;
	@HostListener('keyup') keyupListener = this.resetDebounce;

	timer: any;
	form: FormComponent;
	autosaveAction: AutosaveActionService;

	constructor( @Self() form: FormComponent
			, autosaveAction: AutosaveActionService) {
		this.form = form;
		this.autosaveAction = autosaveAction;
	}

	ngAfterViewInit(): void {
		this.form.form.statusChanges.subscribe(this.setDebounce);
	}

	ngOnDestroy(): void {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	setDebounce = (): void => {
		if (!this.timer && this.form.dirty && (this.saveWhenInvalid || this.form.validate())) {
			this.timer = setTimeout(this.autosave, DEFAULT_AUTOSAVE_DEBOUNCE)
		}
	}

	resetDebounce(): void {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
			this.setDebounce();
		}
	}

	autosave = (): void => {
		const waitOn = this.submitAndWait();
		if (waitOn) {
			this.autosaveAction.trigger(waitOn);
		}
		clearTimeout(this.timer);
	}

	submitAndWait(): IWaitValue<any> {
		if (this.saveWhenInvalid) {
			return this.form.saveForm();
		} else {
			return this.form.submitAndWait();
		}
	}
}