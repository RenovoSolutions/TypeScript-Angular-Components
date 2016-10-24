import { Component, Input, Optional, OnInit } from '@angular/core';
import { range, map, each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { DefaultTheme } from '../../componentsDefaultTheme';

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';

export interface IStar {
	value: number;
	filled: boolean;
}

@Component({
	selector: 'rlUserRating',
	template: require('./userRating.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
})
export class UserRatingComponent extends ValidatedInputComponent<number> implements OnInit {
	@Input() range: number;

	stars: IStar[];

	useDefaultTheme: boolean;

	constructor(defaultTheme: DefaultTheme
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'userRating';
		this.initControl();
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
	}

	ngOnInit(): void {
		super.ngOnInit();
		const values: number[] = range(1, (this.range || 5) + 1).reverse();
		this.stars = map(values, (value: number): IStar => {
			return {
				value: value,
				filled: false,
			};
		});
		this.updateStarView(this.value);
		this.control.valueChanges.subscribe(value => this.updateStarView(value));
	}

	setRating(rating: number): void {
		this.setValue(rating);
	}

	private updateStarView(rating: number): void {
		each(this.stars, (star: IStar): void => {
			if (star.value <= rating) {
				star.filled = true;
			} else {
				star.filled = false;
			}
		});
	}
}
