import { Component, Optional, Inject, Input, AfterViewInit, OnChanges, AfterViewChecked, ElementRef, SimpleChange } from '@angular/core';
import * as $ from 'jquery';
import '../../../libraries/bootstrap-touchspin/index';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __number = services.number;
import __string = services.string;

import { ValidatedInputComponent, validationInputs, baseOutputs, IInputChanges } from '../input/validationInput';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service.ng2';
import { FormComponent } from '../form/form';

export const defaultMaxValue: number = 100000000000000000000;

export interface ISpinnerChanges extends IInputChanges {
	disabled: SimpleChange;
}

@Component({
	selector: 'rlSpinner',
	template: require('./spinner.ng2.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
})
export class SpinnerComponent extends ValidatedInputComponent<number> implements AfterViewInit, OnChanges, AfterViewChecked {
	@Input() min: number;
	@Input() max: number;
	@Input() step: number;
	@Input() decimals: number;
	@Input() prefix: string;
	@Input() postfix: string;
	@Input() roundToStep: boolean;
	@Input() spinnerId: string;

	private number: __number.INumberUtility;
	private string: __string.IStringUtility;
	private elementRef: ElementRef;
	private rendering: boolean = false;
	private touchspin: JQuery;

	constructor(elementRef: ElementRef
			, @Inject(__number.numberToken) number: __number.INumberUtility
			, @Inject(__string.stringToken) string: __string.IStringUtility
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'spinner';
		this.number = number;
		this.string = string;
		this.elementRef = elementRef;
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
		this.value = this.value || 0;
		this.setDisabled(this.disabled);
		this.control.valueChanges.subscribe(value => {
			const roundedValue: number = this.round(value);
			if (value !== roundedValue) {
				this.control.updateValue(roundedValue);
				this.value = roundedValue;
			}

			if (this.touchspin) {
				this.touchspin.val(roundedValue != null ? roundedValue.toString() : '');
			}
		});
	}

	ngOnChanges(changes: ISpinnerChanges): void {
		super.ngOnChanges(changes);
		if (changes.disabled) {
			this.setDisabled(changes.disabled.currentValue);
		}
	}

	ngAfterViewChecked(): void {
		const spinnerInput: JQuery = $(this.elementRef.nativeElement).find('input.spinner');
		if (this.rendering && spinnerInput.length > 0) {
			this.touchspin = spinnerInput.TouchSpin({
				min: (this.min != null ? this.min : 0),
				max: (this.max != null ? this.max : defaultMaxValue),
				step: this.step,
				prefix: this.prefix,
				postfix: this.postfix,
				decimals: this.decimals,
				initval: this.value,
				forcestepdivisibility: this.roundToStep ? 'round' : 'none',
			});

			this.touchspin.on('change', (): void => {
				const spinValue: string = this.touchspin.val();
				const valueAsNumber: number = this.string.toNumber(spinValue);
				this.setValue(this.round(valueAsNumber));
			});
			this.rendering = false;
		}
	}

	private round(num: number): number {
		if (num != null && this.roundToStep) {
			num = __number.numberUtility.roundToStep(num, this.step);
			num = __number.numberUtility.preciseRound(num, this.decimals);
		}

		return num;
	}

	private setDisabled(disabled: boolean): void {
		if (!disabled) {
			this.rendering = true;
		} else {
			this.touchspin = null;
		}
	}
}