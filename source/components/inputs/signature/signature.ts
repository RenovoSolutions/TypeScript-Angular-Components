import { Component, Optional, Input, AfterViewInit, AfterViewChecked, OnChanges, ViewChild, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import '../../../../libraries/jSignature/jSignature.min';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { ValidatedInputComponent, validationInputs, baseOutputs, IInputChanges } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';
import { ButtonComponent } from '../../buttons/index';
import { JQueryProvider } from '../../../services/jquery/jquery.provider';
import { emptySignature } from './emptySignature';

export interface ISignatureChanges extends IInputChanges {
	disabled: SimpleChange;
}

@Component({
	selector: 'rlSignature',
	template: require('./signature.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
})
export class SignatureComponent extends ValidatedInputComponent<string> implements AfterViewInit, AfterViewChecked, OnChanges {
	private _canvas: JQuery;

	@ViewChild('canvas')
	set canvas(value: JQuery) {
		if (value) {
			this._canvas = this.jquery((value as any).nativeElement);
		} else {
			this._canvas = null;
		}
	}

	get canvas(): JQuery {
		return this._canvas;
	}

	get image(): string {
		return this.value || this.getEmptyImage();
	}

	rendering: boolean;
	jquery: JQueryStatic;

	constructor( @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService
			, jquery: JQueryProvider) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'signature';
		this.jquery = <any>jquery;
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
		setTimeout(() => this.rendering = !this.disabled, 0);
	}

	ngOnChanges(changes: ISignatureChanges): void {
		super.ngOnChanges(changes);
		if (changes.disabled) {
			this.rendering = !changes.disabled.currentValue;
		}
	}

	ngAfterViewChecked(): void {
		if (this.rendering && this.canvas) {
			this.canvas.jSignature();

			if (this.value) {
				this.canvas.jSignature('setData', this.value);
			}

			Observable.fromEvent(this.canvas, 'change').subscribe(() => this.onChange());
			this.rendering = false;
		}
	}

	onChange(): void {
		const value: string = this.canvas.jSignature('getData', 'default');
		this.setValue(value);
	}

	reset(): void {
		this.canvas.jSignature('reset');
		this.setValue(null);
	}

	getEmptyImage(): string {
		return emptySignature;
	}

	private setDisabled(disabled: boolean): void {
		if (!disabled) {
			this.rendering = true;
		}
	}
}
