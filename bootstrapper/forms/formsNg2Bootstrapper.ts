import { Component, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { FormComponent } from '../../source/components/form/form';
import { AutosaveActionService } from '../../source/services/autosaveAction/autosaveAction.service';

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
})
export class FormsBootstrapper {
	text: string;
	rating: number;
	validator: any;
	brokenValidator: any;
	rating$: BehaviorSubject<any>;

	@ViewChild('testForm') testForm: FormComponent;

	autosaveAction: AutosaveActionService;

	constructor(autosaveAction: AutosaveActionService) {
		this.autosaveAction = autosaveAction;

		this.rating$ = new BehaviorSubject(null);

		this.validator = {
			validate: () => this.rating$.map(rating => rating >= 3 ? null : 'You must give at least 3 stars'),
		};
		this.brokenValidator = {
			validate: () => Observable.of('error'),
		};
	}

	setRating(rating): void {
		this.rating = rating;
		this.rating$.next(rating);
	}

	waitCallback: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}

	saveTestForm = (data): any => {
		if (this.testForm.form.dirty) {
			return this.waitCallback(data);
		}
		return false;
	}
}
