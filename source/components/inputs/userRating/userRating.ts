import { Component, Input, Optional, OnInit } from '@angular/core';
import { range, map, each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { DefaultTheme } from '../../componentsDefaultTheme';

import { InputComponent, baseInputs, baseOutputs } from '../input';
import { FormComponent } from '../../form/form';

export interface IStar {
	value: number;
	filled: boolean;
}

@Component({
	selector: 'rlUserRating',
	template: require('./userRating.html'),
	inputs: baseInputs,
	outputs: baseOutputs,
})
export class UserRatingComponent extends InputComponent<number> implements OnInit {
	@Input() range: number;

	stars: IStar[];

	useDefaultTheme: boolean;

	constructor(defaultTheme: DefaultTheme
			, @Optional() rlForm: FormComponent
			, object: __object.ObjectUtility
			, guid: __guid.GuidService) {
		super(rlForm, object, guid);
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
	}

	setRating(rating: number): void {
		this.setValue(rating);
		this.updateStarView(rating);
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