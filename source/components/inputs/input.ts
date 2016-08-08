import { AfterViewInit, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { FormComponent } from '../form/form';

export const baseInputs: string[] = ['name', 'label', 'value', 'disabled'];
export const baseOutputs: string[] = ['change', 'valueChange'];

export class InputComponent<T> implements AfterViewInit, OnInit {
	name: string;
	label: string = '';
	disabled: boolean;
	value: T;
	change: EventEmitter<T> = new EventEmitter<T>();
	valueChange: EventEmitter<T> = this.change;

	inputType: string = 'input';
	control: FormControl;
	rlForm: FormComponent;
	protected object: __object.IObjectUtility;
	protected guid: __guid.IGuidService;

	constructor(rlForm: FormComponent
			, object: __object.IObjectUtility
			, guid: __guid.IGuidService) {
		this.rlForm = rlForm;
		this.object = object;
		this.guid = guid;
	}

	ngOnInit(): void {
		if (this.object.isNullOrEmpty(this.name)) {
			this.name = this.inputType + '-' + this.guid.random();
		}
	}

	ngAfterViewInit(): void {
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}

		this.control.valueChanges.subscribe(value => {
			this.value = value;
			this.change.emit(value);
		});
	}

	initControl(): void {
		if (!this.control) {
			this.control = new FormControl('');
		}
	}

	setValue(value: T): void {
		if (!this.disabled) {
			this.value = value;
			this.control.markAsDirty();
			this.control.updateValue(this.value);
			this.change.emit(this.value);
		}
	}
}
