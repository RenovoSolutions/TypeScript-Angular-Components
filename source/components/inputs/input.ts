import { Component, AfterViewInit, OnInit, EventEmitter, AnimationEntryMetadata } from '@angular/core';
import { FormControl } from '@angular/forms';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { FormComponent } from '../form/form';
import { slide } from '../../animations/index';

export const baseInputs: string[] = ['name', 'label', 'value', 'disabled', 'labelState'];
export const baseOutputs: string[] = ['change', 'valueChange'];
export const baseAnimations = [slide.animation];

export class InputComponent<T> implements AfterViewInit, OnInit {
	name: string;
	label: string = '';
	disabled: boolean;
	value: T;
	labelState: string = slide.hide;
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

		if (!this.object.isNullOrEmpty(this.value)) {
			this.showLabel();
		}
	}

	ngAfterViewInit(): void {
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}

		this.control.valueChanges.subscribe(value => {
			this.value = value;
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
			this.control.setValue(this.value);
			this.change.emit(value);
		}
	}

	showLabel(): string {
		return this.labelState = slide.show;
	}

	hideLabel(): string {
		return this.object.isNullOrEmpty(this.value)
			? this.labelState = slide.hide
			: this.showLabel();
	}
}
