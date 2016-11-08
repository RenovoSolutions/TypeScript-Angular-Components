import { Directive, Input, Self, AfterViewInit, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

	form: FormComponent;
	autosaveAction: AutosaveActionService;

	autosaveStart$: Subject<void> = new Subject<void>();
	autosaveCancel$: Subject<void> = new Subject<void>();

	constructor( @Self() form: FormComponent
			, autosaveAction: AutosaveActionService) {
		this.form = form;
		this.autosaveAction = autosaveAction;
	}

	ngAfterViewInit(): void {
		this.form.form.statusChanges.subscribe(this.setDebounce);
	}

	ngOnDestroy(): void {
		this.autosaveCancel$.next();
	}

	setDebounce = (): void => {
		if (this.canAutosave()) {
			this.autosaveCancel$.next();
			this.autosaveStart$.debounceTime(DEFAULT_AUTOSAVE_DEBOUNCE).takeUntil(this.autosaveCancel$).subscribe(() => this.autosave());
			this.autosaveStart$.next();
		} else {
			this.autosaveCancel$.next();
		}
	}

	resetDebounce(): void {
		if (this.canAutosave()) {
			this.autosaveStart$.next();
		}
	}

	autosave = (): void => {
		if (!this.canAutosave()) {
			return;
		}

		const waitOn = this.submitAndWait();
		if (waitOn) {
			// subscribes to kick off the stream
			this.autosaveAction.waitOn(waitOn).subscribe();
		}
	}

	submitAndWait(): IWaitValue<any> {
		if (this.saveWhenInvalid) {
			return this.form.saveForm();
		} else {
			return this.form.submitAndWait();
		}
	}

	private canAutosave(): boolean {
		return this.form.dirty && (this.saveWhenInvalid || this.form.validate());
	}
}
