import { Component, AfterViewInit, OnInit, EventEmitter, AnimationEntryMetadata, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { FormComponent } from '../form/form';
import { slide } from '../../animations/index';

export const baseInputs: string[] = ['name', 'label', 'value', 'disabled','warning'];
export const baseOutputs: string[] = ['change', 'valueChange'];
export const baseAnimations = [slide.animation];

export class InputComponent<T> implements AfterViewInit, OnInit, OnDestroy {
	name: string;
	label: string = '';
	disabled: boolean;
	warning: boolean;
	value: T;
	labelState: string = slide.hide;
	hidePlaceholder: boolean = false;
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

		if (this.value) {
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

	ngOnDestroy() {
		if (this.rlForm) {
			this.rlForm.form.removeControl(this.name);
		}
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

	isLabelShowing(): boolean {
		return this.labelState == slide.show
			? this.hidePlaceholder = true
			: this.hidePlaceholder = false;
	}

	showLabel(): void {
		this.labelState = slide.show;
		this.isLabelShowing();
	}

	hideLabelIfEmpty(): void {
		this.value
			? this.showLabel()
			: this.labelState = slide.hide;
		this.isLabelShowing();
	}
}
