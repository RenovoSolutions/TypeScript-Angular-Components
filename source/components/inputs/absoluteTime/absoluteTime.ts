import { Component, Input, Inject, Optional } from '@angular/core';
import { dropRight, takeRight } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __string = services.string;
import __time = services.time;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';

@Component({
	selector: 'rlAbsoluteTime',
	template: require('./absoluteTime.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
})
export class AbsoluteTimeComponent extends ValidatedInputComponent<moment.Moment> {
	@Input() minuteInterval: number;

	hour: number;
	minute: number;
	period: string;

	get time(): __time.ITime {
		return {
			hour: this.hour,
			minute: this.minute,
			period: this.period,
		};
	}

	set time(value: __time.ITime) {
		if (value == null) {
			this.hour = null;
			this.minute = null;
			this.period = __time.timePeriods.AM;
		} else {
			this.hour = value.hour;
			this.minute = value.minute;
			this.period = value.period;
		}
	}

	get displayTime(): string {
		return this.timeUtility.formatTime(this.time, false);
	}

	timeUtility: __time.ITimeUtility;

	constructor(@Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService
			, timeUtility: __time.TimeUtility) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'time';
		this.timeUtility = timeUtility;
		this.control.valueChanges.subscribe(value => {
			this.time = timeUtility.parseTime(value);
		});
	}

	togglePeriod(): void {
		this.period = this.timeUtility.inversePeriod(this.period);
	}
}