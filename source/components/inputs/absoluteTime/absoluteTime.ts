import { Component, Input, Inject, Optional, OnInit } from '@angular/core';
import { dropRight, takeRight, range } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __string = services.string;
import __time = services.time;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';
import { OffClickDirective } from '../../../behaviors/offClick/offClick';

@Component({
	selector: 'rlAbsoluteTime',
	template: require('./absoluteTime.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
	directives: [OffClickDirective],
})
export class AbsoluteTimeComponent extends ValidatedInputComponent<string> implements OnInit {
	@Input() minuteInterval: number = 15;

	hour: number;
	minute: number;
	period: string;

	get time(): __time.ITime {
		if (!(this.hourSelected || this.minuteSelected)) {
			return null;
		}

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
		this.setSelections();
	}

	get displayTime(): string {
		return this.timeUtility.formatTime(this.time, false);
	}

	showTimes: boolean = false;
	hourSelected: boolean = false;
	minuteSelected: boolean = false;

	allHours: number[];
	allMinutes: number[];

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

	ngOnInit(): void {
		super.ngOnInit();

		this.allHours = range(1, 13);
		this.allMinutes = range(0, 60, this.minuteInterval);
	}

	toggleTimes(): void {
		if (this.showTimes) {
			this.closeTimes();
		} else {
			this.showTimes = true;
		}
	}

	closeTimes(): void {
		this.showTimes = false;
		this.setSelections();
	}

	togglePeriod(): void {
		this.period = this.timeUtility.inversePeriod(this.period);
		this.setValue(this.timeUtility.formatTime(this.time));
	}

	selectHour(hour: number): void {
		this.hour = hour;
		this.hourSelected = true;

		if (this.minuteSelected) {
			this.showTimes = false;
		}
	}

	deselectHour(): void {
		this.hourSelected = false;
	}

	selectMinute(minute: number): void {
		this.minute = minute;
		this.minuteSelected = true;

		if (this.hourSelected) {
			this.showTimes = false;
		}
	}

	deselectMinute(): void {
		this.minuteSelected = false;
	}

	private setSelections(): void {
		this.hourSelected = this.hour != null;
		this.minuteSelected = this.minute != null;
	}
}