import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';

import { IRatingBarBackgroundsService, RatingBarBackgroundService } from './ratingBarBackgrounds.service';
import { IRatingBarClassService, RatingBarClassService } from './ratingBarClass.service';
import { DefaultTheme } from '../componentsDefaultTheme';

export interface IDimensions {
	width: number;
	height: number;
}

export interface IRatingBarChanges {
	value?: SimpleChange;
	width?: SimpleChange;
	[key: string]: SimpleChange;
}

@Component({
	selector: 'rlRatingBar',
	template: require('./ratingBar.html'),
})
export class RatingBarComponent implements OnInit {
	@Input() value: number;
	@Input() min: number;
	@Input() max: number;
	@Input() width: number;
	@Input() height: number;
	@Input() background: string;

	backgroundClass: string;
	dimensions: IDimensions;
	calculatedWidth: number;
	barClass: string;

	private ratingBarClass: IRatingBarClassService;
	private ratingBarBackgrounds: IRatingBarBackgroundsService;
	private useDefaultTheme: boolean;

	constructor(defaultTheme: DefaultTheme) {
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
		this.ratingBarClass = new RatingBarClassService();
		this.ratingBarBackgrounds = new RatingBarBackgroundService();
	}

	ngOnInit(): void {
		this.backgroundClass = this.ratingBarBackgrounds.getBackground(this.background);

		if (!this.value) {
			this.value = 0;
		}

		this.updateValue(this.value);
		this.updateDimensions(this.width);
	}

	ngOnChanges(changes: IRatingBarChanges): void {
		if (changes.value) {
			this.updateValue(changes.value.currentValue);
		}

		if (changes.width) {
			this.updateDimensions(changes.width.currentValue);
		}
	}

	private updateValue(newValue: number): void {
		if (newValue > this.max) {
			newValue = this.max;
		} else if (newValue < this.min) {
			newValue = this.min;
		}

		const confidenceScore: number = (newValue - this.min) / (this.max - this.min);
		this.barClass = this.ratingBarClass.getClass(confidenceScore);
		this.calculatedWidth = Math.round(confidenceScore * this.width);
	}

	private updateDimensions(totalWidth: number): void {
		this.dimensions = {
			width: totalWidth + 2,
			height: this.height + 2,
		};
		this.updateValue(this.value);
	}
}
