import { Directive, Self, AfterViewInit, HostListener } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __timeout = services.timeout;

import { FormComponent } from '../../components/form/form';
import { AutosaveActionService } from '../../services/autosaveAction/autosaveAction.service';

const DEFAULT_AUTOSAVE_DEBOUNCE: number = 3000;

@Directive({
	selector: '[rlAutosave]',
})
export class AutosaveDirective implements AfterViewInit {
	@HostListener('keyup') keyupListener = this.resetDebounce;

	timer: __timeout.ITimeout;
	form: FormComponent;
	timeoutService: __timeout.TimeoutService;
	autosaveAction: AutosaveActionService;

	constructor( @Self() form: FormComponent
			, timeoutService: __timeout.TimeoutService
			, autosaveAction: AutosaveActionService) {
		this.form = form;
		this.timeoutService = timeoutService;
		this.autosaveAction = autosaveAction;
	}

	ngAfterViewInit(): void {
		this.form.form.statusChanges.subscribe(this.setDebounce);
	}

	setDebounce = (): void => {
		if (!this.timer && this.form.validate()) {
			this.timer = this.timeoutService.setTimeout(this.autosave, DEFAULT_AUTOSAVE_DEBOUNCE)
											.catch(() => null);
		}
	}

	resetDebounce(): void {
		if (this.timer) {
			this.timer.cancel();
			this.timer = null;
			this.setDebounce();
		}
	}

	autosave = (): void => {
		const waitOn = this.form.submitAndWait();
		this.autosaveAction.trigger(waitOn);
		this.timer = null;
	}
}
