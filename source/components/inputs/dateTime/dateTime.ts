import { Component, Optional, Input, Output, EventEmitter, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { isUndefined } from 'lodash';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import '../../../../libraries/bootstrap-datetimepicker/index';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __date = services.date;
import __dateFormats = __date.defaultFormats;
import __timezone = services.timezone;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';

import { baseAnimations } from '../input';

@Component({
	selector: 'rlDateTime',
	template: require('./dateTime.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
	animations: baseAnimations,
})
export class DateTimeComponent extends ValidatedInputComponent<moment.Moment> implements OnInit, AfterViewInit {
	@Input() useDate: boolean;
	@Input() useTime: boolean;
	@Input() min: string | Date | moment.Moment;
	@Input() max: string | Date | moment.Moment;
	@Input() minuteStepping: number;
	@Input() showClear: boolean;
	@Output() clear: EventEmitter<any> = new EventEmitter();

	@ViewChild('datepicker') datepicker: ElementRef;
	@ViewChild('dateinput') dateinput: ElementRef;

	valueAsString: string;
	validFormat: boolean;
	format: string;
	timezone: __timezone.ITimezone;
	private timezoneService: __timezone.ITimezoneService;
	private dateService: __date.IDateUtility;
	private rendering: boolean = false;
	private touchspin: JQuery;

	constructor(timezoneService: __timezone.TimezoneService
			, dateService: __date.DateUtility
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'dateTime';
		this.timezoneService = timezoneService;
		this.dateService = dateService;
		this.timezone = this.timezoneService.currentTimezone;
	}

	focus(): void {
		this.dateinput.nativeElement.focus();
	}

	ngOnInit(): void {
		if (this.validators == null) {
			this.validators = [];
		}

		this.validators.push({
				name: 'valiDate',
				validate: (value$: Observable<moment.Moment>): Observable<string> => {
					return value$.map(() => this.validFormat ? null : 'Date is not in a valid format');
				},
			});

		if (this.max != null) {
			this.validators.push({
				name: 'maxDate',
				validate: (value$: Observable<moment.Moment>): Observable<string> => {
					return value$.map(date => date > this.max ? null : 'Date is greater than the greatest allowed date: ' + this.max);
				},
			})
		}

		super.ngOnInit();

		this.useDate = isUndefined(this.useDate) ? true : this.useDate;
		this.useTime = isUndefined(this.useTime) ? true : this.useTime;

		this.valueAsString = this.formatDate(this.value);

		const defaults: bootstrapDateTimePicker.IConfiguration = $(this.datepicker).datetimepicker.defaults;
		this.min = this.min != null ? this.min : defaults.minDate;
		this.max = this.max != null ? this.max : defaults.maxDate;
		this.setValidity(this.value);

		this.control.valueChanges.subscribe(value => {
			this.valueAsString = this.formatDate(value);
		});
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();

		$(this.datepicker.nativeElement).datetimepicker({
			stepping: this.minuteStepping || 1,
			format: this.getFormatOrDefault(),
			direction: 'bottom',
			elementHeight: 2,
			pickDate: this.useDate,
			pickTime: this.useTime,
			minDate: this.min,
			maxDate: this.max,
		}).on('change.dp', (): void => {
			const newValue: string = $(this.dateinput.nativeElement).val();
			this.setValue(this.parseDate(newValue));
		});
	}

	onClear(): void {
		this.setValue(null);
		this.clear.emit(null);
	}

	private formatDate(value: moment.Moment): string {
		if (value == null) {
			this.timezone = this.timezoneService.currentTimezone;
			return '';
		}

		const date: moment.Moment = moment(value);

		this.setValidity(date);

		this.timezone = __timezone.timezones.get(date.tz());
		return date.format(this.getFormatOrDefault());
	}

	private parseDate(value: string): moment.Moment {
		if (this.object.isNullOrEmpty(value)) {
			return null;
		}

		const newMoment: moment.Moment = this.timezoneService.buildMomentWithTimezone(value, this.timezone, this.getFormatOrDefault());
		this.setValidity(newMoment);
		return newMoment;
	}

	private getFormatOrDefault(): string {
		return this.format || <string>this.defaultFormat(this.useDate, this.useTime);
	}

	private defaultFormat(hasDate: boolean, hasTime: boolean): string | boolean {
		if (hasDate && hasTime) {
			return __dateFormats.dateTimeFormat;
		} else if (hasDate) {
			return __dateFormats.dateFormat;
		} else if (hasTime) {
			return __dateFormats.timeFormat;
		} else {
			// revert to default format
			return false;
		}
	}

	private setValidity(date: moment.Moment): void {
		this.validFormat = __object.objectUtility.isNullOrEmpty(date)
			? true
			: moment(date).isValid();
	}
}
